import { type PropsWithChildren } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

export default function SidebarLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="grid grid-cols-10 h-full">
      <div className="col-span-2 bg-slate-100 m-4 rounded-lg p-4">
        <LeftPanel />
      </div>
      <div className="col-span-6">{children}</div>
      <div className="col-span-2 ring-2 ring-slate-200 m-4 rounded-lg p-4">
        <RightPanel />
      </div>
    </div>
  );
}
