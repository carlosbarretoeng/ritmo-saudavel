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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { groupDetails, groupChatMessages, systemHabits as allHabits } from "@/lib/data";
import { Send, Users, Trophy, Target, HeartPulse, Share2, ArrowLeft, Copy } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from "@/components/ui/badge";
import type { Habit } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";


export default function GroupDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const group = groupDetails.find((g) => g.id === id);
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  if (!group) {
    notFound();
  }

  const handleCopyLink = () => {
    const joinUrl = `${window.location.origin}/groups/join/${group.id}`;
    navigator.clipboard.writeText(joinUrl).then(() => {
      toast({
        title: "Link Copiado!",
        description: "O link de convite para o grupo foi copiado para sua área de transferência.",
      });
    });
  };

  const commonHabits = group.commonHabits?.map(habitId => allHabits.find(h => h.id === habitId)).filter(Boolean) as Habit[];

  return (
    <div className="space-y-6">
       <div className="[perspective:1000px]">
        <div
          className={cn(
            "relative h-[230px] transition-transform duration-700 [transform-style:preserve-3d]",
            isFlipped && "[transform:rotateY(180deg)]"
          )}
        >
          {/* Front Face */}
          <Card className="absolute w-full h-full [backface-visibility:hidden]">
            <CardHeader className="flex flex-col items-center text-center p-4 relative h-full">
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
                <div className="flex justify-center gap-4 text-muted-foreground pt-1 text-sm">
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {group.memberCount} membros</span>
                    <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4" /> Rank: #3</span>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          {/* Back Face */}
          <Card className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
             <div className="flex flex-col items-center justify-center h-full p-4 text-center relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 left-2 z-10 text-muted-foreground"
                  onClick={() => setIsFlipped(false)}
                  aria-label="Voltar para informações do grupo"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                 <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 text-muted-foreground"
                  onClick={handleCopyLink}
                  aria-label="Copiar link de convite"
                >
                  <Copy className="w-5 h-5" />
                </Button>
                <h3 className="font-bold mb-2 text-lg">Entrar no Grupo</h3>
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(`group-id:${group.id}`)}`}
                  width={128}
                  height={128}
                  alt={`QR Code para o grupo ${group.name}`}
                  data-ai-hint="qr code"
                />
                <p className="mt-3 text-sm text-muted-foreground">
                  Escaneie para entrar no grupo <span className="font-bold">{group.name}</span>.
                </p>
            </div>
          </Card>
        </div>
      </div>
      
      {group.objective && (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg font-headline">
                    <Target className="w-6 h-6 text-primary" />
                    <span>{group.objective.title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Progress value={group.objective.target > 0 ? (group.objective.current / group.objective.target) * 100 : 0} />
                 <p className="text-sm text-muted-foreground text-right font-bold">
                    {group.objective.current} / {group.objective.target} {group.objective.unit}
                </p>
            </CardContent>
        </Card>
      )}

      {commonHabits && commonHabits.length > 0 && (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg font-headline">
                    <HeartPulse className="w-6 h-6 text-primary" />
                    <span>Hábitos em Comum</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {commonHabits.map(habit => (
                    <Badge key={habit.id} variant="secondary" className="text-sm py-1">
                        {habit.name}
                    </Badge>
                ))}
            </CardContent>
        </Card>
      )}

      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
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
        <TabsContent value="chat">
          <Card className="flex flex-col h-[60dvh]">
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4">
                     <div className="space-y-6">
                        {groupChatMessages.map(message => (
                             <div key={message.id} className="flex items-start gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={message.userAvatarUrl} />
                                    <AvatarFallback>{message.userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 bg-muted rounded-lg p-3">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="font-bold text-primary">{message.userName}</span>
                                        <span className="text-muted-foreground">
                                            {formatDistanceToNow(message.timestamp, { addSuffix: true, locale: ptBR })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-foreground/90">{message.text}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </ScrollArea>
            </CardContent>
            <div className="p-2 border-t bg-background">
                <div className="relative">
                    <Input placeholder="Escreva uma mensagem..." className="pr-10" />
                    <Button size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8" variant="ghost">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
