'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { habits as allHabits } from '@/lib/data';
import { habitIcons, habitIconNames } from '@/lib/icons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import type { Habit } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EditHabitPage() {
  const router = useRouter();
  const params = useParams();
  const habitId = params.habitId as string;

  const [habit, setHabit] = useState<Habit | null>(null);
  const [habitName, setHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

  useEffect(() => {
    const habitToEdit = allHabits.find((h) => h.id === habitId);
    if (habitToEdit) {
      setHabit(habitToEdit);
      setHabitName(habitToEdit.name);
      setSelectedIcon(habitToEdit.icon);
    } else {
      notFound();
    }
  }, [habitId]);
  
  const handleUpdateHabit = () => {
    // Logic to update the habit would go here
    console.log({
      id: habitId,
      name: habitName,
      icon: selectedIcon,
    });
    // For now, just navigate back
    router.push('/habits');
  };

  const handleDeleteHabit = () => {
    // Logic to delete the habit would go here
    console.log(`Deleting habit: ${habitId}`);
    router.push('/habits');
  };
  
  if (!habit) {
      return null; // Or a loading spinner
  }

  return (
    <AlertDialog>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/habits')}>
                <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold font-headline">Editar Hábito</h1>
          </div>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-5 w-5" />
            </Button>
          </AlertDialogTrigger>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
                <Label htmlFor="habit-name">Nome do Hábito</Label>
                <Input
                id="habit-name"
                placeholder="Ex: Ler por 20 minutos"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                />
            </div>
            
            <div className="space-y-3">
                <Label>Escolha um Ícone</Label>
                <RadioGroup
                    value={selectedIcon}
                    onValueChange={setSelectedIcon}
                    className="grid grid-cols-5 gap-4"
                >
                    {habitIconNames.map((iconName) => {
                        const Icon = habitIcons[iconName];
                        return (
                            <Label
                                key={iconName}
                                htmlFor={`icon-${iconName}`}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-3 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground",
                                    selectedIcon === iconName ? "border-primary bg-primary/10" : "border-muted"
                                )}
                            >
                                <Icon className="w-8 h-8" />
                                <RadioGroupItem value={iconName} id={`icon-${iconName}`} className="sr-only" />
                            </Label>
                        );
                    })}
                </RadioGroup>
            </div>

            <div className="flex flex-col gap-2 pt-4">
                <Button onClick={handleUpdateHabit} className="w-full" size="lg" disabled={!habitName || !selectedIcon}>
                  Salvar Alterações
                </Button>
                 <Button onClick={() => router.push('/habits')} className="w-full" variant="ghost">
                  Cancelar
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá excluir permanentemente o
            seu hábito.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeleteHabit} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
