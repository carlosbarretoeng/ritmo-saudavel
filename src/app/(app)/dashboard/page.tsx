import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Flame, Star, Zap, Plus, GlassWater, Book, HeartPulse, Activity as ActivityIcon, Lightbulb, PlusCircle, Sunrise, Sprout, Guitar, BrainCircuit } from "lucide-react";
import { mainUser, habits as allHabits, activityFeed, habitIdeas } from "@/lib/data";
import { Habit, Activity, HabitIdea } from "@/lib/types";
import {cn} from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const iconMap: { [key: string]: React.ElementType } = {
  Flame,
  Star,
  Zap,
  GlassWater,
  Book,
  HeartPulse,
  Sunrise,
  Sprout,
  Guitar,
  BrainCircuit,
};

function HabitItem({ habit }: { habit: Habit }) {
    const Icon = iconMap[habit.icon] || Zap;
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
            <div className={cn("p-1.5 rounded-full", habit.completedToday ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")}>
                <Icon className="w-5 h-5" />
            </div>
            <p className="flex-grow font-medium text-sm">{habit.name}</p>
            <Checkbox checked={habit.completedToday} className="w-5 h-5" />
        </div>
    )
}

function ActivityItem({ activity }: { activity: Activity }) {
    return (
        <div className="flex items-start gap-3">
            <Avatar className="w-8 h-8 border-2 border-background">
                <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
                <p className="text-muted-foreground">
                    <span className="font-bold text-foreground">{activity.user.name}</span>
                    {' '}
                    {activity.text}
                </p>
                <time className="text-xs text-muted-foreground/80">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: ptBR })}
                </time>
            </div>
        </div>
    )
}

function HabitIdeaItem({ idea }: { idea: HabitIdea }) {
    const Icon = iconMap[idea.icon] || Lightbulb;
    return (
        <div className="flex items-center gap-3">
             <div className="p-2 rounded-full bg-muted text-muted-foreground">
                <Icon className="w-5 h-5" />
            </div>
            <p className="flex-1 font-medium text-sm">{idea.name}</p>
            <Button variant="ghost" size="icon" className="w-8 h-8">
                <PlusCircle className="w-5 h-5 text-primary" />
                <span className="sr-only">Adicionar hábito</span>
            </Button>
        </div>
    )
}


export default function DashboardPage() {
  const userHabits = allHabits.filter((h) => mainUser.habits.includes(h.id));
  const completedCount = userHabits.filter(h => h.completedToday).length;
  const progressPercentage = userHabits.length > 0 ? (completedCount / userHabits.length) * 100 : 0;

  return (
    <div className="space-y-4">
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
            <div className="bg-primary text-primary-foreground p-2 rounded-b-lg">
                <p className="text-center font-semibold text-xs">🔥 Desafio: Corrida de 5km</p>
            </div>
        </Card>

        <Card>
            <CardHeader className="flex-row items-center justify-between p-4">
                <CardTitle className="text-base font-bold">Hábitos de Hoje</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Novo Hábito</span>
                </Button>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
                <div className="space-y-1 mb-3">
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Progresso</span>
                        <span>{completedCount}/{userHabits.length}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                </div>
                <div className="space-y-2">
                    {userHabits.map(habit => (
                        <HabitItem key={habit.id} habit={habit} />
                    ))}
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center gap-3 p-4">
                <ActivityIcon className="w-6 h-6 text-primary" />
                <CardTitle className="text-lg">Feed de Atividades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-0">
                {activityFeed.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center gap-3 p-4">
                <Lightbulb className="w-6 h-6 text-primary" />
                <CardTitle className="text-lg">Ideias de Hábitos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-0">
                    {habitIdeas.map((idea, index) => (
                    <HabitIdeaItem key={index} idea={idea} />
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
