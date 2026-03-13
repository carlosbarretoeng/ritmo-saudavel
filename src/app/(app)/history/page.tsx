'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { mainUser, activityFeed, habits } from '@/lib/data';
import { isSameDay, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { habitIcons } from '@/lib/icons';

export default function HistoryPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setDate(new Date());
    setIsClient(true);
  }, []);

  const userActivities = activityFeed.filter(a => {
    // Include activities from the user and where the user commented
    return a.user.id === mainUser.id;
  });

  const completedDays = [
  ...new Set(
    userActivities.map(a => new Date(a.timestamp).setHours(0, 0, 0, 0))
  ),
].map(d => new Date(d));

  const selectedActivities = userActivities.filter(activity => 
    date && isSameDay(activity.timestamp, date)
  );

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Histórico de Atividades</h1>
        <p className="text-muted-foreground">Veja seu progresso e seus check-ins diários.</p>
      </div>
      
      <Card>
          <CardContent className="p-0 md:p-4 text-center">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                modifiers={{ completed: completedDays }}
                modifiersClassNames={{
                    completed: 'bg-primary/20 text-primary-foreground rounded-full',
                }}
                className="rounded-md inline-block"
            />
          </CardContent>
      </Card>

       <div className="space-y-4">
            <h2 className="font-bold text-md px-1">
                Atividades de {date && isClient ? format(date, "dd 'de' MMMM", { locale: ptBR }) : 'Hoje'}
            </h2>
            {selectedActivities.length > 0 ? (
                 selectedActivities.map(activity => {
                    const habit = habits.find(h => h.name === activity.habitName);
                    const HabitIcon = habit ? habitIcons[habit.icon] : null;
                    return (
                        <Card key={activity.id} className="overflow-hidden">
                            <CardHeader className="flex flex-row items-center gap-3 p-3">
                                <Avatar className="w-9 h-9">
                                    <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
                                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{activity.user.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {activity.habitName && `${activity.habitName} • `}
                                        {isClient ? format(activity.timestamp, "dd/MM/yy 'às' HH:mm", { locale: ptBR }) : null}
                                    </p>
                                </div>
                                {HabitIcon && <HabitIcon className="w-6 h-6 text-muted-foreground" />}
                            </CardHeader>
                            {activity.imageUrl && (
                                <CardContent className="p-0">
                                    <div className="aspect-[4/5] relative">
                                        <Image
                                            src={activity.imageUrl}
                                            alt={activity.text}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={activity.imageHint}
                                        />
                                    </div>
                                </CardContent>
                            )}
                            <CardContent className="p-3">
                                 <p className="text-sm">
                                    {activity.text}
                                </p>
                            </CardContent>
                        </Card>
                    )
                 })
            ) : (
                <Card className="text-center">
                    <CardContent className="p-8">
                        <p className="text-muted-foreground">Nenhuma atividade registrada neste dia.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    </div>
  );
}
