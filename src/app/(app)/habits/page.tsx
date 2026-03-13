'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { systemHabits, userHabitConfigs as initialUserHabitConfigs } from '@/lib/data';
import { habitIcons } from '@/lib/icons';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { UserHabitConfig } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useLoading } from '@/contexts/loading-context';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from 'lucide-react';

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
  const [configs, setConfigs] = useState<UserHabitConfig[]>(initialUserHabitConfigs);
  const { toast } = useToast();
  const { setIsLoading } = useLoading();

  const handleToggle = (habitId: string, isEnabled: boolean) => {
    setConfigs((prev) =>
      prev.map((config) =>
        config.habitId === habitId ? { ...config, isEnabled } : config
      )
    );
  };

  const handleGoalChange = (habitId: string, goal: string) => {
    const newGoal = parseFloat(goal);
    if (!isNaN(newGoal) && newGoal >= 0) {
      setConfigs((prev) =>
        prev.map((config) =>
          config.habitId === habitId ? { ...config, goal: newGoal } : config
        )
      );
    }
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

  const groupedHabits = systemHabits.reduce((acc, habit) => {
    const category = habit.category || 'Outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(habit);
    return acc;
  }, {} as Record<string, typeof systemHabits>);


  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold font-headline">Gerenciar Hábitos</h1>
                <p className="text-muted-foreground">Ative os hábitos que deseja seguir e defina suas metas.</p>
            </div>
            <Button onClick={handleSaveChanges} className="w-full sm:w-auto">Salvar Alterações</Button>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
            {Object.entries(groupedHabits).map(([category, habits]) => {
                const totalHabits = habits.length;
                const activeHabits = habits.filter(habit => 
                    configs.find(c => c.habitId === habit.id)?.isEnabled
                ).length;

                return (
                    <AccordionItem key={category} value={category} className="rounded-lg border bg-card text-card-foreground shadow-sm">
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
                                const config = configs.find(c => c.habitId === habit.id);

                                if (!config) return null;

                                return (
                                    <div key={habit.id} className="p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <Icon className="w-8 h-8 text-primary shrink-0" />
                                            <div className="flex-grow">
                                            <p className="font-bold">{habit.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {habit.type === 'metric' 
                                                    ? `Meta: ${config.goal} ${habit.unit}` 
                                                    : 'Check-in diário'}
                                            </p>
                                            </div>
                                            <Switch
                                                checked={config.isEnabled}
                                                onCheckedChange={(checked) => handleToggle(habit.id, checked)}
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

                                        {config.isEnabled && habit.type === 'metric' && (
                                        <div className="mt-4 sm:pl-12">
                                            <Label htmlFor={`goal-${habit.id}`} className="text-xs font-medium text-muted-foreground">Definir nova meta diária</Label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Input
                                                    id={`goal-${habit.id}`}
                                                    type="number"
                                                    value={config.goal}
                                                    onChange={(e) => handleGoalChange(habit.id, e.target.value)}
                                                    className="h-9 max-w-[100px]"
                                                    min="0"
                                                />
                                                <span className="text-sm font-medium text-muted-foreground">{habit.unit}</span>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                );
                            })}
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    </div>
  );
}
