import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarItems } from "./SidebarItems";
import { Separator } from "@/components/ui/separator";

export default function MySidebar() {
  return (
    <SidebarProvider>
      <SidebarItems />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 md:hidden" />
          <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
          <h1 className="font-medium text-lg">
            <span className="text-xl font-semibold">Dashboard: </span>
            Customer
          </h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
