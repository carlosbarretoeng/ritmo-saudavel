import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { groupDetails, groupChatMessages } from "@/lib/data";
import { Send, Users, Trophy } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const group = groupDetails.find((g) => g.id === params.id);

  if (!group) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-col items-start gap-6">
          <Image
            src={group.iconUrl}
            alt={group.name}
            width={128}
            height={128}
            className="rounded-xl"
            data-ai-hint="group logo"
          />
          <div className="space-y-2">
            <CardTitle className="text-4xl font-headline">{group.name}</CardTitle>
            <CardDescription className="text-lg">{group.description}</CardDescription>
            <div className="flex gap-4 text-muted-foreground">
                <span className="flex items-center gap-2"><Users className="w-5 h-5" /> {group.memberCount} membros</span>
                <span className="flex items-center gap-2"><Trophy className="w-5 h-5" /> Ranking: 3º Global</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leaderboard">Placar do Grupo</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Ranking dos Membros</CardTitle>
              <CardDescription>
                Veja quem está na liderança esta semana.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Membro</TableHead>
                    <TableHead className="text-right">Pontos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.members.map((member) => (
                    <TableRow key={member.user.id}>
                      <TableCell className="font-medium text-lg">{member.rank}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.user.avatarUrl} alt={member.user.name} />
                            <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{member.user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">{member.points.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chat">
          <Card className="flex flex-col h-[600px]">
            <CardHeader>
              <CardTitle>Chat do Grupo</CardTitle>
              <CardDescription>Converse com os membros do grupo.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                     <div className="space-y-6">
                        {groupChatMessages.map(message => (
                             <div key={message.id} className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={message.userAvatarUrl} />
                                    <AvatarFallback>{message.userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">{message.userName}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(message.timestamp, { addSuffix: true, locale: ptBR })}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground">{message.text}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </ScrollArea>
            </CardContent>
            <div className="p-4 border-t">
                <div className="relative">
                    <Input placeholder="Digite sua mensagem..." className="pr-12" />
                    <Button size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8">
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
