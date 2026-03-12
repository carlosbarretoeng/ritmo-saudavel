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
import { Flame, Star, Zap, Plus, GlassWater, Book, HeartPulse } from "lucide-react";
import { mainUser, habits as allHabits } from "@/lib/data";
import { Habit } from "@/lib/types";
import {cn} from "@/lib/utils";

const iconMap: { [key: string]: React.ElementType } = {
  Flame,
  Star,
  Zap,
  GlassWater,
  Book,
  HeartPulse,
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

export default function DashboardPage() {
  const userHabits = allHabits.filter((h) => mainUser.habits.includes(h.id));
  const completedCount = userHabits.filter(h => h.completedToday).length;
  const progressPercentage = (completedCount / userHabits.length) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Olá, {mainUser.name}!</h1>
        <p className="text-muted-foreground">Pronto para mais um dia de conquistas?</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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
            <div className="grid gap-4 sm:grid-cols-2">
                {userHabits.map(habit => (
                    <HabitItem key={habit.id} habit={habit} />
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
