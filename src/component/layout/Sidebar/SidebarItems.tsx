import * as React from "react";
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
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useLocation } from "react-router-dom";

const customerItems = [
  {
    title: "",
    items: [
      {
        title: "Profile",
        url: "/dashboard",
      },
      {
        title: "Orders",
        url: "/dashboard/my-orders",
      },
    ],
  },
];

const adminItems = [
  {
    title: "User",
    items: [
      {
        title: "Profile",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        url: "/dashboard/users",
      },
      {
        title: "Bikes",
        url: "/dashboard/bikes",
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
      },
    ],
  },
];

export function SidebarItems({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { handleLogout, currentUser } = useAuth();
  const items = currentUser?.role === "admin" ? adminItems : customerItems;

  const { pathname } = useLocation();
  return (
    <Sidebar {...props} variant="floating">
      <SidebarHeader className="text-2xl font-extrabold px-3">
        <Link to="/">BikeStore</Link>
      </SidebarHeader>
      <SidebarContent>
        {items.map((sidebarItem) => (
          <SidebarGroup key={sidebarItem.title}>
            <SidebarGroupLabel>{sidebarItem.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItem.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={pathname === item.url} asChild>
                      <NavLink to={item.url}>{item.title}</NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
