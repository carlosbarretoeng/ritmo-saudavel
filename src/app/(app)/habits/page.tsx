'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  systemHabits,
  userHabitConfigs as initialUserHabitConfigs,
} from '@/lib/data';
import { habitIcons } from '@/lib/icons';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { UserHabitConfig, Habit } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useLoading } from '@/contexts/loading-context';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Info, Pencil } from 'lucide-react';
import { GoalModal } from '@/components/goal-modal';

const InformationText = ({ text }: { text: string }) => {
  const urlRegex = /(\(fonte: https?:\/\/[^\s)]+\))/g;
  const urlExtractRegex = /\(fonte: (https?:\/\/[^\s)]+)\)/;

  const parts = text.split(urlRegex);

  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(urlExtractRegex);
        if (match) {
          const url = match[1];
          return (
            <React.Fragment key={i}>
              (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80"
                onClick={(e) => e.stopPropagation()}
              >
                fonte
              </a>
              )
            </React.Fragment>
          );
        }
        return part;
      })}
    </>
  );
};

export default function HabitsPage() {
  const [configs, setConfigs] =
    useState<UserHabitConfig[]>(initialUserHabitConfigs);
  const [modalHabit, setModalHabit] = useState<Habit | null>(null);
  const { toast } = useToast();
  const { setIsLoading } = useLoading();

  const handleToggle = (habitId: string, isEnabled: boolean) => {
    setConfigs((prev) =>
      prev.map((config) =>
        config.habitId === habitId ? { ...config, isEnabled } : config
      )
    );
  };

  const handleSaveGoal = (
    habitId: string,
    newGoal: number,
    useGoal: boolean
  ) => {
    setConfigs((prev) =>
      prev.map((config) =>
        config.habitId === habitId
          ? { ...config, goal: useGoal ? newGoal : 0 }
          : config
      )
    );
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    // Logic to save habit configurations would go here.
    console.log('Saving new configurations:', configs);
    setTimeout(() => {
      toast({
        title: 'Configurações Salvas!',
        description: 'Suas preferências de hábitos foram atualizadas.',
      });
      setIsLoading(false);
    }, 1000);
  };

  const openModal = (habit: Habit) => {
    if (habit.type === 'metric') {
      setModalHabit(habit);
    }
  };

  const groupedHabits = systemHabits.reduce((acc, habit) => {
    const category = habit.category || 'Outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(habit);
    return acc;
  }, {} as Record<string, typeof systemHabits>);

  const currentConfig = configs.find(
    (c) => c.habitId === modalHabit?.id
  ) || { habitId: '', isEnabled: false, goal: 0 };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Gerenciar Hábitos
          </h1>
          <p className="text-muted-foreground">
            Ative os hábitos que deseja seguir e defina suas metas.
          </p>
        </div>
        <Button onClick={handleSaveChanges} className="w-full sm:w-auto">
          Salvar Alterações
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {Object.entries(groupedHabits).map(([category, habits]) => {
          const totalHabits = habits.length;
          const activeHabits = habits.filter((habit) =>
            configs.find((c) => c.habitId === habit.id)?.isEnabled
          ).length;

          return (
            <AccordionItem
              key={category}
              value={category}
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <AccordionTrigger className="p-4 text-lg font-bold font-headline hover:no-underline data-[state=open]:border-b">
                <div className="flex justify-between w-full items-center">
                  <span className="pr-2">{category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {activeHabits} / {totalHabits} ativos
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-4">
                {habits.map((habit) => {
                  const Icon = habitIcons[habit.icon] || habitIcons['Star'];
                  const config = configs.find((c) => c.habitId === habit.id);

                  if (!config) return null;

                  const isMetric = habit.type === 'metric';
                  const hasGoal = isMetric && config.goal > 0;

                  return (
                    <div
                      key={habit.id}
                      className="p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-8 h-8 text-primary shrink-0" />
                        <div className="flex-grow">
                          <p className="font-bold">{habit.name}</p>
                          <div
                            className="text-sm text-muted-foreground"
                            onClick={() => openModal(habit)}
                          >
                            {isMetric ? (
                              <div className="flex items-center gap-1 cursor-pointer w-fit">
                                <span>
                                  {hasGoal
                                    ? `Meta: ${config.goal} ${habit.unit}`
                                    : 'Sem meta (livre)'}
                                </span>
                                <Pencil className="w-3 h-3" />
                              </div>
                            ) : (
                              'Check-in diário'
                            )}
                          </div>
                        </div>
                        <Switch
                          checked={config.isEnabled}
                          onCheckedChange={(checked) =>
                            handleToggle(habit.id, checked)
                          }
                          aria-label={`Ativar ${habit.name}`}
                        />
                      </div>

                      {habit.information && (
                        <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                          <Info className="w-4 h-4 shrink-0 mt-0.5" />
                          <p className="flex-1 leading-relaxed">
                            <InformationText text={habit.information} />
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {modalHabit && (
        <GoalModal
          habit={modalHabit}
          config={currentConfig}
          isOpen={!!modalHabit}
          onClose={() => setModalHabit(null)}
          onSave={(newGoal, useGoal) =>
            handleSaveGoal(modalHabit.id, newGoal, useGoal)
          }
        />
      )}
    </div>
  );
}
