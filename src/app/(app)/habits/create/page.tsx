'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { habitIcons, habitIconNames } from '@/lib/icons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useLoading } from '@/contexts/loading-context';

export default function CreateHabitPage() {
  const router = useRouter();
  const { setIsLoading } = useLoading();
  const [habitName, setHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(habitIconNames[0]);

  const handleCreateHabit = () => {
    setIsLoading(true);
    // Logic to create the habit would go here
    console.log({
      name: habitName,
      icon: selectedIcon,
    });
    
    // Simulate API call
    setTimeout(() => {
      // For now, just navigate back
      setIsLoading(false);
      router.push('/habits');
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/habits')}>
              <ArrowLeft />
          </Button>
          <h1 className="text-xl font-bold font-headline">Criar Novo Hábito</h1>
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
              <Button onClick={handleCreateHabit} className="w-full" size="lg" disabled={!habitName || !selectedIcon}>
                Salvar Hábito
              </Button>
              <Button onClick={() => router.push('/habits')} className="w-full" variant="ghost">
                Cancelar
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
