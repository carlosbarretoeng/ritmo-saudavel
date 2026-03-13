'use client';

import { useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { habits as allHabits } from '@/lib/data';
import { Habit } from '@/lib/types';
import { Camera } from 'lucide-react';
import { habitIcons } from '@/lib/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CheckinPage() {
  const router = useRouter();
  const params = useParams();
  const habitId = params.habitId as string;

  const habit = allHabits.find((h) => h.id === habitId);

  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [checkinValue, setCheckinValue] = useState('');
  const [checkinUnit, setCheckinUnit] = useState('');


  if (!habit) {
    notFound();
  }

  const Icon = habitIcons[habit.icon] || habitIcons['Sprout'];

  const handlePublish = () => {
    // Here would be the logic to save the check-in and add it to the feed
    console.log({
      habitId,
      description,
      photo,
      value: checkinValue,
      unit: checkinUnit,
    });
    // For now, just mark as completed and navigate back to dashboard
    habit.completedToday = true;
    router.push('/dashboard');
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

          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-3 space-y-2">
                  <Label htmlFor="checkin-value">Valor</Label>
                  <Input 
                      id="checkin-value"
                      type="number" 
                      placeholder="Ex: 5"
                      value={checkinValue}
                      onChange={(e) => setCheckinValue(e.target.value)}
                      className="text-base"
                  />
              </div>
              <div className="col-span-2 space-y-2">
                  <Label htmlFor="checkin-unit">Unidade</Label>
                  <Input 
                      id="checkin-unit"
                      placeholder="Ex: km" 
                      value={checkinUnit}
                      onChange={(e) => setCheckinUnit(e.target.value)}
                      className="text-base"
                  />
              </div>
            </div>
            <p className="text-xs text-muted-foreground px-1">Opcional: adicione um valor para acompanhar o progresso em seus grupos.</p>
          </div>

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
