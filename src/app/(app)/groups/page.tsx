import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
} from "@/components/ui/card";
import { Plus, Users, ChevronRight } from "lucide-react";
import { groups, mainUser } from "@/lib/data";

export default function GroupsPage() {
  const myGroups = groups.filter(g => mainUser.groups.includes(g.id));
  const availableGroups = groups.filter(g => !mainUser.groups.includes(g.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">Grupos</h1>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Criar
        </Button>
      </div>
      
      <p className="text-muted-foreground">
        Junte-se a amigos e participe de desafios saudáveis.
      </p>

      <div>
        <h2 className="text-lg font-bold font-headline mb-3">Meus Grupos</h2>
        {myGroups.length > 0 ? (
          <div className="space-y-3">
            {myGroups.map((group) => (
               <Link href={`/groups/${group.id}`} key={group.id} className="block no-underline">
                 <Card className="p-3 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                    <Image
                        src={group.iconUrl}
                        alt={group.name}
                        width={48}
                        height={48}
                        className="rounded-lg"
                        data-ai-hint="group logo"
                    />
                    <div className="flex-grow">
                        <p className="font-bold">{group.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Users className="h-3 w-3" /> {group.memberCount} membros</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                 </Card>
               </Link>
            ))}
          </div>
        ) : (
           <Card className="p-4 text-center">
             <p className="text-muted-foreground text-sm">Você ainda não faz parte de nenhum grupo.</p>
           </Card>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold font-headline mb-3">Descobrir Grupos</h2>
        <div className="space-y-3">
          {availableGroups.map((group) => (
            <Card key={group.id} className="p-3 flex items-center gap-4">
               <Image
                  src={group.iconUrl}
                  alt={group.name}
                  width={48}
                  height={48}
                  className="rounded-lg"
                  data-ai-hint="group logo"
                />
                <div className="flex-grow">
                    <p className="font-bold">{group.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Users className="h-3 w-3" /> {group.memberCount} membros</p>
                </div>
                <Button variant="secondary" size="sm">
                  Entrar
                </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
