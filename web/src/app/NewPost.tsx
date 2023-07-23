"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@app/components/ui/avatar";
import { Button } from "@app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { Input } from "@app/components/ui/input";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

export default function NewPost() {
  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="ring ring-inset ring-slate-300">
            CN
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-1 pb-1">
          <CardTitle>What&apos;s on you mind?</CardTitle>
          <CardDescription>
            Post a new message for others to see on your feed.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="flex gap-4">
          <Input placeholder="Today I went out to meet my friends..." />
          <Button className="flex gap-2 items-center">
            <EnvelopeOpenIcon /> Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
