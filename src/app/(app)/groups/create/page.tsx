'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, ArrowLeft } from 'lucide-react';

export default function CreateGroupPage() {
  const router = useRouter();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupIcon, setGroupIcon] = useState<string | null>(null);

  const handleCreateGroup = () => {
    // Logic to create the group would go here
    console.log({
      name: groupName,
      description: groupDescription,
      icon: groupIcon,
    });
    router.push('/groups');
  };
  
  const handleIconUpload = () => {
      // Simulate photo upload
      setGroupIcon('https://picsum.photos/seed/newgroup1/200/200');
  }


  return (
    <div className="space-y-4">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold font-headline">Criar Novo Grupo</h1>
        </div>
      <Card>
        <CardContent className="pt-6 space-y-6">
            <div className="flex flex-col items-center gap-4">
                <div 
                    className="w-24 h-24 rounded-xl border-2 border-dashed bg-card flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={handleIconUpload}
                >
                    {groupIcon ? (
                        <Image src={groupIcon} alt="Ícone do Grupo" width={96} height={96} className="object-cover rounded-lg" data-ai-hint="group logo" />
                    ) : (
                        <div className="text-center text-muted-foreground p-2">
                            <Camera className="w-8 h-8 mx-auto mb-1" />
                            <p className="text-xs font-semibold">Ícone</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="group-name">Nome do Grupo</Label>
                <Input
                id="group-name"
                placeholder="Ex: Foco na Trilha"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="group-description">Descrição</Label>
                <Textarea
                id="group-description"
                placeholder="Uma breve descrição sobre o objetivo do grupo."
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                rows={3}
                />
            </div>

            <div className="flex flex-col gap-2 pt-4">
                <Button onClick={handleCreateGroup} className="w-full" size="lg">
                Criar Grupo
                </Button>
                <Button onClick={() => router.back()} className="w-full" variant="ghost">
                Cancelar
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
