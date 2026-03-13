'use client';

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { groupDetails, systemHabits as allHabits } from "@/lib/data";
import { Users, Trophy, Target, Share2, ArrowLeft, Plus, MoreVertical, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Habit } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GroupGoalModal } from "@/components/group-goal-modal";
import { habitIcons } from "@/lib/icons";

export default function GroupDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const group = groupDetails.find((g) => g.id === id);
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

  if (!group) {
    notFound();
  }
  
  const activeGoals = group.objectives?.filter(o => o.status === 'active') || [];
  const archivedGoals = group.objectives?.filter(o => o.status === 'archived') || [];

  const handleCopyLink = () => {
    const joinUrl = `${window.location.origin}/groups/join/${group.id}`;
    navigator.clipboard.writeText(joinUrl).then(() => {
      toast({
        title: "Link Copiado!",
        description: "O link de convite para o grupo foi copiado para sua área de transferência.",
      });
    });
  };
  
  const handleSaveGoal = (newGoalData: any) => {
    console.log("Saving goal", newGoalData);
    // Here would be the logic to save the goal
    toast({
        title: "Meta Criada!",
        description: `A meta "${newGoalData.title}" foi adicionada ao grupo.`,
    });
    setIsGoalModalOpen(false);
  }

  const commonHabits = group.commonHabits?.map(habitId => allHabits.find(h => h.id === habitId)).filter(Boolean) as Habit[];

  return (
    <div className="space-y-6">
       <div className="[perspective:1000px]">
        <div
          className={cn(
            "relative h-[275px] transition-transform duration-700 [transform-style:preserve-3d]",
            isFlipped && "[transform:rotateY(180deg)]"
          )}
        >
          {/* Front Face */}
          <Card className="absolute w-full h-full [backface-visibility:hidden] flex flex-col">
            <CardHeader className="flex flex-col items-center text-center p-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 text-muted-foreground"
                onClick={() => setIsFlipped(true)}
                aria-label="Compartilhar grupo com QR Code"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Image
                src={group.iconUrl}
                alt={group.name}
                width={80}
                height={80}
                className="rounded-xl mb-3"
                data-ai-hint="group logo"
              />
              <div className="space-y-1">
                <CardTitle className="text-2xl font-headline">{group.name}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex flex-col flex-grow">
                <div className="flex justify-center gap-4 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {group.memberCount} membros</span>
                    <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4" /> Rank: #3</span>
                </div>
                {commonHabits && commonHabits.length > 0 && (
                    <div className="w-full mt-auto pt-3">
                        <Separator className="mb-3" />
                        <div className="flex flex-wrap justify-center gap-1.5">
                            {commonHabits.map(habit => (
                                <Badge key={habit.id} variant="secondary" className="font-normal">
                                    {habit.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
          </Card>
          
          {/* Back Face */}
          <Card className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
             <div className="flex flex-col items-center justify-center h-full p-4 text-center relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 text-muted-foreground"
                  onClick={() => setIsFlipped(false)}
                  aria-label="Voltar"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h3 className="font-bold mb-2 text-lg">Entrar no Grupo</h3>
                <Image
                  onClick={handleCopyLink}
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(`group-id:${group.id}`)}`}
                  width={128}
                  height={128}
                  alt={`QR Code para o grupo ${group.name}`}
                  data-ai-hint="qr code"
                />
                <p className="mt-3 text-sm text-muted-foreground">
                  Escaneie para entrar no grupo <span className="font-bold">{group.name}</span><br/>ou clique para copiar o link.
                </p>
            </div>
          </Card>
        </div>
      </div>
      
       <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-headline">Metas Ativas</h2>
                <Button size="sm" onClick={() => setIsGoalModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Nova Meta
                </Button>
            </div>
            {activeGoals.length > 0 ? (
                activeGoals.map((goal) => {
                    const habit = allHabits.find(h => h.id === goal.habitId);
                    const Icon = habit ? habitIcons[habit.icon] || Target : Target;
                    return (
                        <Card key={goal.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-3">
                                <CardTitle className="flex items-center gap-3 text-lg font-headline">
                                    <Icon className="w-6 h-6 text-primary" />
                                    <span>{goal.title}</span>
                                </CardTitle>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => alert('Arquivar meta ' + goal.id)}>
                                            <Archive className="mr-2 h-4 w-4" />
                                            <span>Arquivar</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Progress value={goal.target > 0 ? (goal.current / goal.target) * 100 : 0} />
                                <p className="text-sm text-muted-foreground text-right font-bold">
                                    {goal.current.toLocaleString('pt-BR')} / {goal.target.toLocaleString('pt-BR')} {goal.unit}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })
            ) : (
                <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                        Nenhuma meta ativa no momento.
                    </CardContent>
                </Card>
            )}
        </div>

      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
          <TabsTrigger value="goal-history">Histórico de Metas</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                  {group.members.map((member) => (
                    <div key={member.user.id} className="flex items-center gap-4">
                      <div className="font-bold text-lg w-6 text-center text-muted-foreground">{member.rank}</div>
                      <Avatar>
                        <AvatarImage src={member.user.avatarUrl} alt={member.user.name} />
                        <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <p className="font-medium">{member.user.name}</p>
                      </div>
                      <div className="text-sm font-mono text-right">
                        <span className="font-bold">{member.points.toLocaleString('pt-BR')}</span>
                        <span className="text-muted-foreground"> pts</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="goal-history">
           <Card>
            <CardHeader>
                <CardTitle>Histórico de Metas</CardTitle>
                <CardDescription>Acompanhe as metas concluídas e o progresso do grupo ao longo do tempo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {archivedGoals.length > 0 ? (
                    archivedGoals.map(goal => (
                        <div key={goal.id} className="text-muted-foreground p-2 rounded-md bg-muted/50">
                            <p className="font-medium text-foreground">{goal.title}</p>
                            {/* In a real app, you'd format the completion date */}
                            <p className="text-sm">Arquivada</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground p-8">
                        <p>Nenhuma meta anterior encontrada.</p>
                    </div>
                )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <GroupGoalModal
        group={group}
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSave={handleSaveGoal}
        existingGoals={activeGoals}
       />
    </div>
  );
}
