import Link from "next/link";

import { cn } from "@/lib/utils";

export type DashboardSidebarGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export const DashboardSidebar = ({
  children,
  className,
}: DashboardSidebarGenericProps) => {
  return (
    <aside
      className={cn([
        "border-r border-border flex flex-col h-screen",
        className,
      ])}
    >
      {children}
    </aside>
  );
};

export const DashboardSidebarHeader = ({
  children,
  className,
}: DashboardSidebarGenericProps) => {
  return (
    <header className={cn(["p-4 border-b border-border", className])}>
      {children}
    </header>
  );
};

export const DashboardSidebarHeaderTitle = ({
  children,
  className,
}: DashboardSidebarGenericProps) => {
  return <h2 className={cn(["", className])}>{children}</h2>;
};

export const DashboardSidebarMain = ({
  children,
  className,
}: DashboardSidebarGenericProps) => {
  return <main className={cn(["p-4", className])}>{children}</main>;
};

export const DashboardSidebarNav = ({
  children,
  className,
}: DashboardSidebarGenericProps) => {
  return (
    <nav className={cn(["flex flex-col gap-2", className])}>{children}</nav>
  );
};

export const DashboardSidebarNavHeader = ({
  children,
  className,
}: DashboardSidebarGenericProps) => {
  return <header className={cn(["", className])}>{children}</header>;
};

export const DashboardSidebarNavHeaderTitle = ({
  children,
  className,
}: DashboardSidebarGenericProps) => {
  return (
    <div
      className={cn([
        "text-xs uppercase text-muted-foreground ml-3",
        className,
      ])}
    >
      {children}
    </div>
  );
};

export const DashboardSidebarNavMain = ({
  children,
  className,
}: DashboardSidebarGenericProps) => {
  return <main className={cn(["flex flex-col", className])}>{children}</main>;
};

interface DashboardSidebarNavLinkProps {
  href: string;
  active?: boolean;
}

export const DashboardSidebarNavLink = ({
  children,
  className,
  href,
  active,
}: DashboardSidebarGenericProps<DashboardSidebarNavLinkProps>) => {
  return (
    <Link
      href={href}
      className={cn([
        "flex items-center gap-2 text-sm px-3.5 py-2.5 rounded-md border border-transparent",
        active && "bg-secondary",
        className,
      ])}
    >
      {children}
    </Link>
  );
};

export const DashboardSidebarFooter = ({
  children,
  className,
}: DashboardSidebarGenericProps) => {
  return (
    <footer
      className={cn(["p-2 mt-auto border-t border-border shrink-0", className])}
    >
      {children}
    </footer>
  );
};
