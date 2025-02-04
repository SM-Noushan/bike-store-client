import { ReactNode } from "react";

export type TNavbar = {
  label: ReactNode;
  navItems: { name: string; to: string }[];
  button?: boolean | "hybrid";
};
