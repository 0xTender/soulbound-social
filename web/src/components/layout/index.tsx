import { type PropsWithChildren } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="grid grid-cols-10 h-full">
      <div className="col-span-2 bg-slate-100 m-4 rounded-lg p-4">
        <LeftPanel />
      </div>
      <div className="col-span-6 my-4 rounded-lg">{children}</div>
      <div className="col-span-2 bg-slate-100 m-4 rounded-lg p-4">
        <RightPanel />
      </div>
    </div>
  );
}
