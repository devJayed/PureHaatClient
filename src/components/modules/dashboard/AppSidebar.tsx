"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Logo from "@/assets/svgs/Logo";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { sidebarMenuByRole } from "./sidebar.config";
import { NavMain } from "./sidebar/nav-main";
import { NavUser } from "./sidebar/nav-user";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  if (!user) return null;

  const navMain = sidebarMenuByRole[user.role];

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center gap-2">
                  <Logo />
                  <h2 className="font-bold text-xl">PureHaat</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
