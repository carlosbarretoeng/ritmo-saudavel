'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Group, Habit, GroupGoal } from '@/lib/types';
import { systemHabits } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type GroupGoalModalProps = {
  group: Group;
  isOpen: boolean;
  onClose: () => void;
  onSave: (goalData: any) => void;
  existingGoals: GroupGoal[];
};

export function GroupGoalModal({ group, isOpen, onClose, onSave, existingGoals }: GroupGoalModalProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [habitId, setHabitId] = useState<string | undefined>(undefined);
  const [period, setPeriod] = useState('monthly');
  const [target, setTarget] = useState(0);

  const availableHabits = group.commonHabits
    ?.map(id => systemHabits.find(h => h.id === id))
    .filter((habit): habit is Habit => {
        if (!habit) return false;
        const hasActiveGoal = existingGoals.some(g => g.habitId === habit.id && g.status === 'active');
        return !hasActiveGoal;
    });
  
  const selectedHabit = systemHabits.find(h => h.id === habitId);

  useEffect(() => {
    if (selectedHabit) {
        setTitle(`Meta Mensal de ${selectedHabit.name}`);
    } else {
        setTitle('');
    }
  }, [selectedHabit]);

  const handleSave = () => {
    if (!title.trim() || !habitId || target <= 0) {
      toast({
        variant: 'destructive',
        title: 'Campos Incompletos',
        description: 'Por favor, preencha todos os campos para criar a meta.',
      });
      return;
    }

    onSave({
      title,
      habitId,
      period,
      target,
      unit: selectedHabit?.type === 'boolean' ? '%' : selectedHabit?.unit || '',
    });
    // Reset state for next time
    setTitle('');
    setHabitId(undefined);
    setPeriod('monthly');
    setTarget(0);
    onClose();
  };

  const periodOptions = {
    monthly: 'Mensal',
    bimonthly: 'Bimestral',
    semiannual: 'Semestral',
    annual: 'Anual',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Meta de Grupo</DialogTitle>
          <DialogDescription>
            Defina um objetivo para o grupo baseado nos hábitos em comum.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="habit-select">Hábito</Label>
            <Select value={habitId} onValueChange={setHabitId}>
              <SelectTrigger id="habit-select">
                <SelectValue placeholder="Selecione um hábito" />
              </SelectTrigger>
              <SelectContent>
                {availableHabits && availableHabits.length > 0 ? (
                  availableHabits.map(habit => (
                    <SelectItem key={habit.id} value={habit.id}>
                      {habit.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-sm text-muted-foreground text-center">Nenhum hábito disponível para novas metas.</div>
                )}
              </SelectContent>
            </Select>
          </div>
          
          {selectedHabit && (
            <>
              <div className="space-y-2">
                <Label htmlFor="goal-title">Título da Meta</Label>
                <Input
                  id="goal-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`Ex: Meta Mensal de ${selectedHabit.name}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="period-select">Período</Label>
                    <Select value={period} onValueChange={setPeriod}>
                      <SelectTrigger id="period-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(periodOptions).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal-target">
                        {selectedHabit.type === 'boolean' ? 'Atingimento (%)' : 'Meta'}
                    </Label>
                    <div className="relative">
                        <Input
                        id="goal-target"
                        type="number"
                        min="0"
                        value={target === 0 ? '' : target}
                        onChange={(e) => setTarget(Number(e.target.value))}
                        />
                        {selectedHabit.type === 'boolean' ? 
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span> :
                            selectedHabit.unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{selectedHabit.unit}</span>
                        }
                    </div>
                  </div>
              </div>
              {selectedHabit.type === 'boolean' && (
                <p className="text-xs text-muted-foreground px-1">
                    A meta será atingir a frequência de check-ins em % de dias do período.
                </p>
              )}
            </>
          )}

        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Meta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
