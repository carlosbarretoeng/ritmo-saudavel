import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-background">
      <h1 className="text-9xl font-bold text-primary font-headline">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-foreground">Página Não Encontrada</h2>
      <p className="mt-2 text-muted-foreground">Desculpe, não conseguimos encontrar a página que você está procurando.</p>
      <Button asChild className="mt-6">
        <Link href="/dashboard">Voltar para o Início</Link>
      </Button>
    </div>
  )
}
