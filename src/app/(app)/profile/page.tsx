import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { mainUser } from "@/lib/data";
import { Flame, Star, Trophy } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Seu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações e veja seu progresso.</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={mainUser.avatarUrl} alt={mainUser.name} />
              <AvatarFallback>{mainUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="font-headline text-2xl">{mainUser.name}</CardTitle>
            <CardDescription>Membro desde {new Date().getFullYear()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">Alterar Avatar</Button>
              <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" /> Pontos</span>
                  <span className="font-bold">{mainUser.points.toLocaleString()}</span>
              </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500" /> Sequência Atual</span>
                  <span className="font-bold">{mainUser.currentStreak} dias</span>
              </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-600" /> Maior Sequência</span>
                  <span className="font-bold">{mainUser.longestStreak} dias</span>
              </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Atualize seu nome e e-mail.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" defaultValue={mainUser.name} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={mainUser.email} />
                </div>
                <Button>Salvar Alterações</Button>
            </CardContent>
        </Card>

          <Card>
            <CardHeader>
                <CardTitle>Conquistas</CardTitle>
                <CardDescription>Suas medalhas e troféus.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {mainUser.achievements.map((achievement, index) => (
                    <Badge key={index} variant="default" className="text-sm py-1 px-3 bg-accent text-accent-foreground hover:bg-accent/90">
                        <Trophy className="mr-2 h-4 w-4"/> {achievement}
                    </Badge>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
