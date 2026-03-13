import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  User as UserIcon,
  LogOut,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { mainUser } from "@/lib/data";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="w-7 h-7 text-sidebar-primary" />
            <span className="text-lg font-semibold font-headline tracking-tighter group-data-[collapsible=icon]:hidden">
              Ritmo Saudável
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
           <div className="p-2">
            <Link href="/profile" className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent">
              <Avatar className="w-9 h-9">
                <AvatarImage src={mainUser.avatarUrl} alt={mainUser.name} />
                <AvatarFallback>{mainUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-semibold text-sidebar-foreground">{mainUser.name}</span>
                  <span className="text-xs text-sidebar-foreground/70">{mainUser.email}</span>
              </div>
            </Link>
          </div>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Grupos">
                <Link href="/groups">
                  <Users />
                  <span>Grupos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Hábitos">
                <Link href="/habits">
                  <Sparkles />
                  <span>Hábitos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Histórico">
                <Link href="/history">
                  <CalendarDays />
                  <span>Histórico</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Perfil">
                <Link href="/profile">
                  <UserIcon />
                  <span>Perfil</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Sair">
                <Link href="/">
                  <LogOut />
                  <span>Sair</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
           <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-lg font-bold font-headline">Olá, {mainUser.name}!</h1>
              <p className="text-xs text-muted-foreground">Pronto para mais um dia?</p>
            </div>
           </div>
        </header>
        <main className="flex-1 p-4 bg-background/95">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
