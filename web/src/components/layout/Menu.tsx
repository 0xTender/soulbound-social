"use client";

import { DashboardIcon, GearIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

export default function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col gap-4 items-start justify-start space-x-0">
        <NavigationMenuItem className="flex gap-2 items-center cursor-pointer px-2 py-1 hover:ring duration-300 ring-slate-300 dark:ring-slate-700 text-slate-500 hover:text-slate-700 dark:text-slate-400 rounded">
          <DashboardIcon />
          Feed
        </NavigationMenuItem>
        <NavigationMenuItem className="flex gap-2 items-center cursor-pointer px-2 py-1 hover:ring duration-300 ring-slate-300 dark:ring-slate-700 text-slate-500 hover:text-slate-700 dark:text-slate-400 rounded">
          <PaperPlaneIcon />
          Messages
        </NavigationMenuItem>
        <NavigationMenuItem className="flex gap-2 items-center cursor-pointer px-2 py-1 hover:ring duration-300 ring-slate-300 dark:ring-slate-700 text-slate-500 hover:text-slate-700 dark:text-slate-400 rounded">
          <GearIcon />
          Settings
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
