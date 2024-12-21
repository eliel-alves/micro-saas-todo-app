import { Metadata } from "next";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { PropsWithChildren } from "react";
import SettingsSidebar from "./_components/settings-sidebar";

export const metadata: Metadata = {
  title: "Configurações",
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Configurações</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div className="container max-w-screen-lg">
          <div className="grid grid-cols-[16rem_1fr] gap-8">
            <SettingsSidebar />
            <div>{children}</div>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
};

export default Layout;
