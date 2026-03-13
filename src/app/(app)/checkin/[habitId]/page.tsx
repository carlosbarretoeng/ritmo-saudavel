'use client';

import { useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { systemHabits, userHabitConfigs } from '@/lib/data';
import { Habit } from '@/lib/types';
import { Camera } from 'lucide-react';
import { habitIcons } from '@/lib/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoading } from '@/contexts/loading-context';

export default function CheckinPage() {
  const router = useRouter();
  const params = useParams();
  const habitId = params.habitId as string;
  const { setIsLoading } = useLoading();

  const habit = systemHabits.find((h) => h.id === habitId);
  const userConfig = userHabitConfigs.find(c => c.habitId === habitId);

  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [checkinValue, setCheckinValue] = useState('');

  if (!habit || !userConfig) {
    notFound();
  }

  const Icon = habitIcons[habit.icon] || habitIcons['Sprout'];

  const handlePublish = () => {
    setIsLoading(true);
    // Here would be the logic to save the check-in and add it to the feed
    console.log({
      habitId,
      description,
      photo,
      value: habit.type === 'metric' ? parseFloat(checkinValue) : 1, // Save value for metric, or just 1 for boolean
      unit: habit.unit,
    });
    
    // Simulate API call
    setTimeout(() => {
      // For now, just navigate back to dashboard
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  const handlePhotoUpload = () => {
      // Simulate photo upload
      setPhoto('https://picsum.photos/seed/newpost1/600/800');
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-headline">
            <Icon className="w-8 h-8 text-primary" />
            <span>{habit.name}</span>
          </CardTitle>
          <CardDescription>Faça o check-in do seu hábito para hoje.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className="aspect-[4/5] w-full rounded-lg border-2 border-dashed bg-card flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
            onClick={handlePhotoUpload}
          >
            {photo ? (
              <div className="relative w-full h-full">
                  <Image src={photo} alt="Foto do Check-in" fill className="object-cover rounded-lg" data-ai-hint="habit activity" />
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-4">
                <Camera className="w-12 h-12 mx-auto mb-2" />
                <p className="font-semibold">Adicionar foto</p>
                <p className="text-xs">Toque para carregar uma imagem</p>
              </div>
            )}
          </div>
          
          <div>
            <Textarea
              placeholder="Como foi o seu progresso? Escreva uma legenda..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="text-base"
            />
          </div>

          {habit.type === 'metric' && (
             <div className="space-y-2">
                <Label htmlFor="checkin-value">Quanto você progrediu hoje?</Label>
                <div className="flex items-center gap-2">
                    <Input 
                        id="checkin-value"
                        type="number" 
                        placeholder={`Ex: ${userConfig.goal / 2}`}
                        value={checkinValue}
                        onChange={(e) => setCheckinValue(e.target.value)}
                        className="text-base"
                    />
                    {habit.unit && <span className="font-medium text-muted-foreground">{habit.unit}</span>}
                </div>
                <p className="text-xs text-muted-foreground px-1">Sua meta diária é {userConfig.goal} {habit.unit}.</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button onClick={handlePublish} className="w-full" size="lg">
              Publicar Check-in
            </Button>
            <Button onClick={() => router.back()} className="w-full" variant="ghost">
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
