"use client";

import { DashboardIcon, GearIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";

export default function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col gap-4 items-start">
        <NavigationMenuItem className="flex gap-2 items-center cursor-pointer px-2 py-1 -translate-x-2 hover:ring duration-300 ring-slate-300 text-slate-500 hover:text-slate-700 rounded">
          <DashboardIcon />
          Feed
        </NavigationMenuItem>
        <NavigationMenuItem className="flex gap-2 items-center cursor-pointer px-2 py-1 -translate-x-3 hover:ring duration-300 ring-slate-300 text-slate-500 hover:text-slate-700 rounded">
          <PaperPlaneIcon />
          Messages
        </NavigationMenuItem>
        <NavigationMenuItem className="flex gap-2 items-center cursor-pointer px-2 py-1 -translate-x-3 hover:ring duration-300 ring-slate-300 text-slate-500 hover:text-slate-700 rounded">
          <GearIcon />
          Settings
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
