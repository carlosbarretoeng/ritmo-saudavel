import Image from "next/image";
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
import { groupLeaderboard } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Placar Global de Grupos</h1>
        <p className="text-muted-foreground">
          Veja a classificação dos grupos e motive sua equipe a chegar no topo.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead className="text-center">Membros</TableHead>
                <TableHead className="text-right">Pontos Totais</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupLeaderboard.map((entry) => (
                <TableRow key={entry.group.id}>
                  <TableCell>
                    <div className="text-xl font-bold">
                        {entry.rank === 1 && '🥇'}
                        {entry.rank === 2 && '🥈'}
                        {entry.rank === 3 && '🥉'}
                        {entry.rank > 3 && `#${entry.rank}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={entry.group.iconUrl}
                        alt={entry.group.name}
                        width={48}
                        height={48}
                        className="rounded-lg"
                        data-ai-hint="group logo"
                      />
                      <div>
                        <p className="font-bold">{entry.group.name}</p>
                        <p className="text-sm text-muted-foreground hidden md:block">{entry.group.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{entry.memberCount}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="text-base font-mono">
                      {entry.totalPoints.toLocaleString()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
