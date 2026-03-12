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
        <div className="flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors">
            <div className={cn("p-2 rounded-full", habit.completedToday ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-grow">
                <p className="font-medium">{habit.name}</p>
                <p className="text-sm text-muted-foreground">{habit.frequency === 'daily' ? 'Diário' : 'Semanal'}</p>
            </div>
            <Checkbox checked={habit.completedToday} className="w-6 h-6" />
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
    <div className="grid grid-cols-1 gap-8 items-start">
        {/* Coluna Principal */}
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Olá, {mainUser.name}!</h1>
                <p className="text-muted-foreground">Pronto para mais um dia de conquistas?</p>
            </div>

            <div className="grid gap-4 grid-cols-1">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Pontos Totais</CardTitle>
                    <Star className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mainUser.points.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+200 nas últimas 24h</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Sequência Atual</CardTitle>
                    <Flame className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mainUser.currentStreak} dias</div>
                    <p className="text-xs text-muted-foreground">Sua maior sequência: {mainUser.longestStreak} dias</p>
                </CardContent>
                </Card>
                <Card className="bg-primary text-primary-foreground">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-primary-foreground/80">Desafio do Grupo</CardTitle>
                    <Zap className="w-4 h-4 text-primary-foreground/80" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Corrida de 5km</div>
                    <p className="text-xs text-primary-foreground/80">Foco na Trilha</p>
                </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                    <CardTitle>Hábitos de Hoje</CardTitle>
                    <CardDescription>
                        Você completou {completedCount} de {userHabits.length} hábitos.
                    </CardDescription>
                    </div>
                    <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Hábito
                    </Button>
                </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Progress value={progressPercentage} className="w-full h-3" />
                    </div>
                    <div className="grid gap-4 grid-cols-1">
                        {userHabits.map(habit => (
                            <HabitItem key={habit.id} habit={habit} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Coluna Lateral */}
        <div className="space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                    <ActivityIcon className="w-6 h-6 text-primary" />
                    <CardTitle>Feed de Atividades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {activityFeed.map(activity => (
                        <ActivityItem key={activity.id} activity={activity} />
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-primary" />
                    <CardTitle>Ideias de Hábitos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {habitIdeas.map((idea, index) => (
                        <HabitIdeaItem key={index} idea={idea} />
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
