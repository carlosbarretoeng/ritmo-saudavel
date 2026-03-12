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
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Trophy,
  User as UserIcon,
  LogOut,
  Settings,
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
            <Logo className="w-7 h-7 text-primary" />
            <span className="text-lg font-semibold font-headline tracking-tighter group-data-[collapsible=icon]:hidden">
              Ritmo Saudável
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
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
              <SidebarMenuButton asChild tooltip="Placar">
                <Link href="/leaderboard">
                  <Trophy />
                  <span>Placar</span>
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
              <SidebarMenuButton asChild tooltip="Configurações">
                <Link href="#">
                  <Settings />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
           <SidebarTrigger />
           <Link href="/profile">
            <Avatar>
              <AvatarImage src={mainUser.avatarUrl} alt={mainUser.name} />
              <AvatarFallback>{mainUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
           </Link>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background/95">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
