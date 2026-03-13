import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Flame, Star, GlassWater, Book, HeartPulse, Sprout, Sunrise, Heart, MessageCircle, Send } from "lucide-react";
import { mainUser, habits as allHabits, activityFeed } from "@/lib/data";
import { Habit, Activity } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const iconMap: { [key: string]: React.ElementType } = {
  Flame,
  Star,
  GlassWater,
  Book,
  HeartPulse,
  Sprout,
  Sunrise,
};

function PendingHabitCheckin({ habit }: { habit: Habit }) {
    const Icon = iconMap[habit.icon] || Sprout;
    return (
        <div className="flex flex-col items-center gap-2 flex-shrink-0 w-20">
            <button className="w-16 h-16 rounded-full border-2 border-dashed border-primary bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                <Icon className="w-8 h-8" />
            </button>
            <p className="text-xs font-medium text-center text-muted-foreground truncate w-full">{habit.name}</p>
        </div>
    );
}

function ActivityPost({ activity }: { activity: Activity }) {
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
                        {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: ptBR })}
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
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
                        <MessageCircle className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground">
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
                 <p className="text-xs font-bold px-1">{activity.likes.toLocaleString()} curtidas</p>
                 <div className="text-sm px-1 space-y-1">
                    <p>
                        <span className="font-bold">{activity.user.name}</span>{' '}
                        {activity.text}
                    </p>
                     <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground">
                        Ver todos os {activity.comments} comentários
                     </Button>
                 </div>
            </CardFooter>
        </Card>
    )
}

export default function DashboardPage() {
  const userHabits = allHabits.filter((h) => mainUser.habits.includes(h.id));
  const pendingHabits = userHabits.filter(h => !h.completedToday);

  return (
    <div className="space-y-6">
        <Card>
            <CardContent className="p-3 flex items-center justify-around">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Star className="w-4 h-4" />
                        <span className="text-xs font-medium">Pontos</span>
                    </div>
                    <p className="text-lg font-bold">{mainUser.points.toLocaleString()}</p>
                </div>
                <div className="h-8 border-l border-border"></div>
                <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Flame className="w-4 h-4" />
                        <span className="text-xs font-medium">Sequência</span>
                    </div>
                    <p className="text-lg font-bold">{mainUser.currentStreak} dias</p>
                </div>
            </CardContent>
        </Card>

        {pendingHabits.length > 0 && (
          <div className="space-y-3">
             <h2 className="font-bold text-md px-1">Check-ins de hoje</h2>
             <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                {pendingHabits.map(habit => (
                    <PendingHabitCheckin key={habit.id} habit={habit} />
                ))}
            </div>
          </div>
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
