import { ExitIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Menu from "./Menu";

export default function LeftPanel() {
  return (
    <menu className="flex flex-col gap-4 justify-between h-full p-4">
      <section>
        <div className="flex gap-4 items-center flex-wrap">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="ring ring-inset ring-slate-300">
              CN
            </AvatarFallback>
          </Avatar>
          <data>
            <h1>@shadcn</h1>
            <Badge className="mb-2">Shady Boi</Badge>
          </data>
        </div>
      </section>
      <section className="h-full my-8">
        <Menu />
      </section>
      <section>
        <Button className="flex gap-2">
          <ExitIcon />
          Logout
        </Button>
      </section>
    </menu>
  );
}
