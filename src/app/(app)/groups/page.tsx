import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Users } from "lucide-react";
import { groups, mainUser } from "@/lib/data";

export default function GroupsPage() {
  const myGroups = groups.filter(g => mainUser.groups.includes(g.id));
  const availableGroups = groups.filter(g => !mainUser.groups.includes(g.id));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Grupos</h1>
          <p className="text-muted-foreground">
            Junte-se a amigos e participe de desafios saudáveis.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Criar Grupo
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Meus Grupos</h2>
        {myGroups.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myGroups.map((group) => (
              <Card key={group.id} className="flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <Image
                    src={group.iconUrl}
                    alt={group.name}
                    width={64}
                    height={64}
                    className="rounded-lg"
                    data-ai-hint="group logo"
                  />
                  <div>
                    <CardTitle className="font-headline">{group.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {group.memberCount} membros
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">{group.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/groups/${group.id}`}>Ver Grupo</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Você ainda não faz parte de nenhum grupo.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Descobrir Grupos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableGroups.map((group) => (
            <Card key={group.id} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <Image
                  src={group.iconUrl}
                  alt={group.name}
                  width={64}
                  height={64}
                  className="rounded-lg"
                  data-ai-hint="group logo"
                />
                <div>
                  <CardTitle className="font-headline">{group.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {group.memberCount} membros
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                 <p className="text-muted-foreground text-sm">{group.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  Entrar no Grupo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
