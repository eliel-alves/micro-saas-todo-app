"use client";

import {
  DashboardSidebarNav,
  DashboardSidebarMain,
  DashboardSidebarNavLink,
} from "@/components/dashboard/sidebar";
import { CreditCard, SunMoon, User } from "lucide-react";
import { usePathname } from "next/navigation";

const SettingsSidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside>
      <DashboardSidebarNav>
        <DashboardSidebarMain className="p-0">
          <DashboardSidebarNavLink
            href="/app/settings"
            active={isActive("/app/settings")}
          >
            <User size={16} />
            Meu perfil
          </DashboardSidebarNavLink>

          <DashboardSidebarNavLink
            href="/app/settings/theme"
            active={isActive("/app/settings/theme")}
          >
            <SunMoon size={16} />
            Aparência
          </DashboardSidebarNavLink>

          <DashboardSidebarNavLink
            href="/app/settings/billing"
            active={isActive("/app/settings/billing")}
          >
            <CreditCard size={16} />
            Assinatura
          </DashboardSidebarNavLink>
        </DashboardSidebarMain>
      </DashboardSidebarNav>
    </aside>
  );
};

export default SettingsSidebar;
