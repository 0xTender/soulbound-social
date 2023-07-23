import { type PropsWithChildren } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { Card } from "../ui/card";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="grid grid-cols-10 h-full">
      <Card className="col-span-2 m-4 rounded-lg p-4">
        <LeftPanel />
      </Card>
      <div className="col-span-4 my-4 rounded-lg overflow-scroll">
        {children}
      </div>
      <Card className="col-span-4 m-4 rounded-lg p-4">
        <RightPanel />
      </Card>
    </div>
  );
}
