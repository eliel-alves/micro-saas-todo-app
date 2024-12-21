import { cn } from "@/lib/utils";

export type DashboardPageGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export const DashboardPage = ({
  children,
  className,
}: DashboardPageGenericProps) => {
  return <section className={cn(["h-screen", className])}>{children}</section>;
};

export const DashboardPageHeader = ({
  children,
  className,
}: DashboardPageGenericProps) => {
  return (
    <header
      className={cn([
        "flex items-center justify-between border-b border-border px-6 h-[73px]",
        className,
      ])}
    >
      {children}
    </header>
  );
};

export const DashboardPageHeaderTitle = ({
  children,
  className,
}: DashboardPageGenericProps) => {
  return (
    <span className={cn(["text-lg font-bold", className])}>{children}</span>
  );
};

export const DashboardPageHeaderNav = ({
  children,
  className,
}: DashboardPageGenericProps) => {
  return <nav className={cn(["", className])}>{children}</nav>;
};

export const DashboardPageMain = ({
  children,
  className,
}: DashboardPageGenericProps) => {
  return <main className={cn(["p-6", className])}>{children}</main>;
};
