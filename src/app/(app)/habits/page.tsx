import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { habits as allHabits, mainUser } from "@/lib/data";
import { habitIcons } from "@/lib/icons";
import { Plus, Edit } from "lucide-react";

export default function HabitsPage() {
  const userHabits = allHabits.filter((h) => mainUser.habits.includes(h.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
             <h1 className="text-2xl font-bold font-headline">Meus Hábitos</h1>
             <p className="text-muted-foreground">Personalize sua rotina e crie novos hábitos.</p>
        </div>
        <Button asChild size="sm">
          <Link href="/habits/create">
            <Plus className="mr-2 h-4 w-4" />
            Criar Hábito
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-4 space-y-2">
          {userHabits.map((habit) => {
            const Icon = habitIcons[habit.icon] || habitIcons['Star'];
            return (
              <div key={habit.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                <Icon className="w-8 h-8 text-primary" />
                <div className="flex-grow">
                  <p className="font-bold">{habit.name}</p>
                  <p className="text-sm text-muted-foreground">{habit.frequency === 'daily' ? 'Diário' : 'Semanal'}</p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                   <Link href={`/habits/edit/${habit.id}`}>
                    <Edit className="h-5 w-5" />
                   </Link>
                </Button>
              </div>
            );
          })}
          {userHabits.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                <p>Você ainda não tem hábitos personalizados.</p>
                <Button variant="link" asChild className="mt-2">
                    <Link href="/habits/create">Crie seu primeiro hábito</Link>
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
