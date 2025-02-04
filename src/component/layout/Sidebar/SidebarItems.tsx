import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";

// This is sample data.
const data = [
  {
    title: "Profile",
    url: "/dashboard",
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
  },
];

export function SidebarItems({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="text-2xl font-bold px-3">
        <Link to="/">BikeStore</Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              {data?.length ? (
                <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                  {data.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            `w-full bg-neutral-200 font-semibold ${
                              isActive
                                ? `bg-opacity-55`
                                : "bg-opacity-0 hover:bg-opacity-55"
                            }`
                          }
                        >
                          {item.title}
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Button>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
