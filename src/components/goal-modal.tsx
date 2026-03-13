'use client';

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
import { Habit, UserHabitConfig } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Switch } from './ui/switch';

type GoalModalProps = {
  habit: Habit;
  config: UserHabitConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newGoal: number, useGoal: boolean) => void;
};

export function GoalModal({
  habit,
  config,
  isOpen,
  onClose,
  onSave,
}: GoalModalProps) {
  const [goal, setGoal] = useState(config.goal);
  const [useGoal, setUseGoal] = useState(config.goal > 0);

  useEffect(() => {
    setGoal(config.goal);
    setUseGoal(config.goal > 0);
  }, [config]);

  const handleSave = () => {
    onSave(goal, useGoal);
    onClose();
  };

  if (habit.type !== 'metric') {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Definir Meta para {habit.name}</DialogTitle>
          <DialogDescription>
            Você pode definir uma meta diária ou deixar o hábito livre.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="use-goal-switch" className="flex flex-col gap-1">
              <span className="font-semibold">Definir meta diária</span>
              <span className="font-normal text-muted-foreground">
                {useGoal
                  ? 'Acompanhe seu progresso em relação a um objetivo.'
                  : 'Marque como um hábito livre (quanto mais, melhor).'}
              </span>
            </Label>
            <Switch
              id="use-goal-switch"
              checked={useGoal}
              onCheckedChange={setUseGoal}
            />
          </div>

          {useGoal && (
            <div className="space-y-2">
              <Label htmlFor="goal-input">Sua meta diária</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="goal-input"
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(parseFloat(e.target.value) || 0)}
                  min="0"
                  className="text-base"
                />
                {habit.unit && (
                  <span className="font-medium text-muted-foreground">
                    {habit.unit}
                  </span>
                )}
              </div>
            </div>
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
