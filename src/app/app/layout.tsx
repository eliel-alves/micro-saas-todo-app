import { PropsWithChildren } from "react";
import MainSidebar from "./_components/main-sidebar";
import { auth } from "@/services/auth";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  return (
    <div className="grid grid-cols-[16rem_1fr]">
      <MainSidebar user={session?.user} />

      <main className="flex flex-col">{children}</main>
    </div>
  );
};

export default Layout;
