'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Flame, Star, Heart, MessageCircle, PartyPopper, Send } from "lucide-react";
import { mainUser, systemHabits, userHabitConfigs, activityFeed } from "@/lib/data";
import { Habit, Activity } from "@/lib/types";
import { formatDistanceToNow, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { habitIcons } from '@/lib/icons';
import { Input } from '@/components/ui/input';
import { useLoading } from '@/contexts/loading-context';


type PendingHabitCheckinProps = {
    habit: Habit;
    progress?: number;
    goal?: number;
}

function PendingHabitCheckin({ habit, progress = 0, goal = 0 }: PendingHabitCheckinProps) {
    const { setIsLoading } = useLoading();
    const Icon = habitIcons[habit.icon] || habitIcons['Sprout'];

    const isMetricWithGoal = habit.type === 'metric' && goal > 0;
    const progressPercentage = isMetricWithGoal ? Math.min((progress / goal) * 100, 100) : 0;
    
    if (!isMetricWithGoal) {
        return (
            <Link href={`/checkin/${habit.id}`} onClick={() => setIsLoading(true)} className="flex flex-col items-center gap-2 no-underline">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8" />
                </div>
                <p className="text-xs font-medium text-center text-muted-foreground truncate w-full">{habit.name}</p>
            </Link>
        );
    }
    
    return (
        <Link href={`/checkin/${habit.id}`} onClick={() => setIsLoading(true)} className="flex flex-col items-center gap-2 no-underline">
             <div 
                className="relative w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                    background: `conic-gradient(hsl(var(--primary)) ${progressPercentage}%, hsl(var(--muted)) ${progressPercentage}%)`
                }}
            >
                <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                </div>
            </div>
            <p className="text-xs font-medium text-center text-muted-foreground truncate w-full">{habit.name}</p>
            <p className="text-xs font-bold text-muted-foreground -mt-1">{`${progress.toLocaleString('pt-BR')} / ${goal.toLocaleString('pt-BR')}${habit.unit ? ` ${habit.unit}`: ''}`}</p>
        </Link>
    );
}

function ActivityPost({ activity }: { activity: Activity }) {
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [showAllComments, setShowAllComments] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 p-3">
                <Avatar className="w-9 h-9">
                    <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="font-bold text-sm">{activity.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                        {activity.habitName ? `${activity.habitName} • ` : ''}
                        {isClient ? formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: ptBR }) : null}
                    </p>
                </div>
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
            <CardFooter className="flex-col items-start p-3 gap-2">
                <div className="flex gap-1">
                     <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-red-500">
                        <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground" onClick={() => setShowCommentInput(!showCommentInput)}>
                        <MessageCircle className="w-5 h-5" />
                    </Button>
                </div>
                 <p className="text-xs font-bold px-1">{activity.likes.toLocaleString('pt-BR')} curtidas</p>
                 <div className="text-sm px-1 space-y-1">
                    <p>
                        <span className="font-bold">{activity.user.name}</span>{' '}
                        {activity.text}
                    </p>
                    {activity.comments && activity.comments.length > 0 && (
                     <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground" onClick={() => setShowAllComments(prev => !prev)}>
                        {showAllComments ? 'Ocultar comentários' : `Ver todos os ${activity.comments.length} comentários`}
                     </Button>
                    )}
                 </div>
                 {showAllComments && (
                    <div className="w-full space-y-3 pt-2 text-sm">
                        {activity.comments.map((comment) => (
                            <div key={comment.id} className="flex items-start gap-2 px-1">
                                <Avatar className="w-6 h-6 border">
                                    <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
                                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="leading-snug">
                                    <span className="font-bold">{comment.user.name}</span>{' '}
                                    {comment.text}
                                </p>
                            </div>
                        ))}
                    </div>
                 )}
                 {showCommentInput && (
                    <div className="w-full pt-2">
                      <div className="relative">
                          <Input placeholder="Adicione um comentário..." className="pr-10 text-sm" />
                          <Button size="icon" className="absolute top-1/2 right-1.5 -translate-y-1/2 h-7 w-7" variant="ghost">
                              <Send className="h-4 w-4" />
                          </Button>
                      </div>
                    </div>
                 )}
            </CardFooter>
        </Card>
    )
}

export default function DashboardPage() {
  const [isFreeDay, setIsFreeDay] = useState(false);
  const { setIsLoading } = useLoading();
  const handleNavClick = () => setIsLoading(true);

  const enabledHabitConfigs = userHabitConfigs.filter(c => c.isEnabled);
  const enabledHabits = systemHabits.filter(h => enabledHabitConfigs.some(c => c.habitId === h.id));
  
  const todaysUserActivities = activityFeed.filter(
    (a) => a.user.id === mainUser.id && isToday(a.timestamp)
  );
  
  const hasAnyActivityToday = todaysUserActivities.length > 0;

  const pendingHabits = enabledHabits.filter(habit => {
    const config = enabledHabitConfigs.find(c => c.habitId === habit.id);
    if (!config) return false;

    const activitiesForHabit = todaysUserActivities.filter(a => a.habitId === habit.id);

    if (habit.type === 'boolean') {
      return activitiesForHabit.length === 0;
    }

    if (habit.type === 'metric') {
      const progress = activitiesForHabit.reduce((sum, act) => sum + (act.checkinValue || 0), 0);
      return progress < config.goal;
    }
    
    return false;
  });

  const hasCompletedAllHabits = pendingHabits.length === 0 && enabledHabits.length > 0;
  const hasEnabledHabits = enabledHabits.length > 0;


  if (isFreeDay) {
    return (
      <div className="flex flex-col items-center justify-center h-[70dvh] text-center bg-card rounded-lg p-8 space-y-4">
        <PartyPopper className="w-16 h-16 text-primary" />
        <h2 className="text-2xl font-bold font-headline">Dia Livre!</h2>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Vá aproveitar a vida, mas volte aqui amanhã para continuar sua jornada!
        </p>
         <Button onClick={() => setIsFreeDay(false)} variant="outline" className="mt-4">
            Voltar ao Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <Card>
            <CardContent className="p-3 flex items-center justify-around">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Star className="w-4 h-4" />
                        <span className="text-xs font-medium">Pontos</span>
                    </div>
                    <p className="text-lg font-bold">{mainUser.points.toLocaleString('pt-BR')}</p>
                </div>
                <div className="h-8 border-l border-border"></div>
                <Link href="/history" onClick={handleNavClick} className="block p-2 -m-2 text-center text-current no-underline transition-colors rounded-md hover:bg-muted/50">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Flame className="w-4 h-4" />
                        <span className="text-xs font-medium">Sequência</span>
                    </div>
                    <p className="text-lg font-bold">{mainUser.currentStreak} dias</p>
                </Link>
            </CardContent>
            {!hasCompletedAllHabits && hasEnabledHabits && !hasAnyActivityToday && (
                <CardFooter className="p-0 border-t">
                    <Button variant="ghost" className="w-full rounded-t-none text-muted-foreground" onClick={() => setIsFreeDay(true)}>
                        Tirar um dia livre
                    </Button>
                </CardFooter>
            )}
        </Card>

        {hasEnabledHabits ? (
          <>
            {pendingHabits.length > 0 ? (
              <div className="space-y-3">
                <h2 className="font-bold text-md px-1">Check-ins de hoje</h2>
                <div className="grid grid-cols-3 gap-4">
                  {pendingHabits.map(habit => {
                      const config = enabledHabitConfigs.find(c => c.habitId === habit.id);
                      const activitiesForHabit = todaysUserActivities.filter(a => a.habitId === habit.id);
                      const progress = activitiesForHabit.reduce((sum, act) => sum + (act.checkinValue || 0), 0);
                      
                      return (
                          <PendingHabitCheckin 
                              key={habit.id} 
                              habit={habit} 
                              progress={progress}
                              goal={config?.goal}
                          />
                      )
                  })}
                </div>
              </div>
            ) : (
              <Card className="bg-primary/5 border-2 border-dashed border-primary/20">
                  <CardContent className="p-4 flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                          <PartyPopper className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                          <h3 className="font-bold text-foreground">Parabéns!</h3>
                          <p className="text-sm text-muted-foreground">Você completou todos os seus hábitos de hoje. Continue assim!</p>
                      </div>
                  </CardContent>
              </Card>
            )}
          </>
        ) : (
           <Card>
                <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Você ainda não ativou nenhum hábito.</p>
                     <Button variant="link" asChild className="mt-2">
                        <Link href="/habits" onClick={handleNavClick}>Gerenciar meus hábitos</Link>
                    </Button>
                </CardContent>
            </Card>
        )}
        
        <div className="space-y-4">
            <h2 className="font-bold text-md px-1">Feed de Atividades</h2>
            {activityFeed.map(activity => (
                <ActivityPost key={activity.id} activity={activity} />
            ))}
        </div>
    </div>
  );
}
