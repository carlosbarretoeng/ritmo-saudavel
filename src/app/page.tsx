import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Trophy, MessageCircle } from "lucide-react";
import { Logo } from "@/components/icons";
import { placeholderImages } from "@/lib/data";

export default function LandingPage() {
  const heroImage = placeholderImages.find(p => p.id === "hero-running");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold font-headline tracking-tighter">
            Ritmo Saudável
          </span>
        </Link>
        <Button asChild>
          <Link href="/login">Começar Agora</Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold font-headline tracking-tighter text-foreground">
                Construa Hábitos, Conquiste a Saúde
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Junte-se a amigos, complete desafios e transforme sua rotina com o Ritmo Saudável. Pequenos passos, grandes mudanças.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/login">Crie sua conta grátis</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {heroImage && (
          <section className="container mx-auto -mt-16 px-4 sm:px-6 lg:px-8">
              <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                    priority
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
          </section>
        )}

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold font-headline text-foreground">
                Tudo que você precisa para uma vida mais ativa
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Nossa plataforma gamificada torna a jornada pela saúde mais divertida e social.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <CardTitle className="pt-4 font-headline">Rastreamento de Hábitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Crie, personalize e acompanhe seus hábitos diários com uma interface simples e motivadora.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit">
                    <Users className="w-8 h-8" />
                  </div>
                  <CardTitle className="pt-4 font-headline">Grupos e Desafios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Junte-se ou crie grupos para competir em desafios saudáveis com amigos e colegas.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                   <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <CardTitle className="pt-4 font-headline">Gamificação e Recompensas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Ganhe pontos, suba no ranking e desbloqueie conquistas por manter suas sequências.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <CardTitle className="pt-4 font-headline">Chat Integrado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Comunique-se com seu grupo, troque dicas e incentive seus colegas diretamente no app.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ritmo Saudável. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
