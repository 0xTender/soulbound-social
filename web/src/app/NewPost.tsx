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
import { Textarea } from "@app/components/ui/textarea";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { useQuery, gql } from "@apollo/client";
import { useContext } from "react";
import { StateContext } from "@app/components/providers/StateContext";

const GET_ACCOUNT_VALUE = gql`
  query Account($owner: AccountOwner) {
    accounts(accountId: $owner) {
      firstName
      lastName
      username
      image
    }
  }
`;

export default function NewPost() {
  const { accountId } = useContext(StateContext);
  const { data } = useQuery<{
    accounts: {
      firstName: string;
      lastName: string;
      image: string;
      username: string;
    };
  }>(GET_ACCOUNT_VALUE, {
    fetchPolicy: "network-only",
    variables: {
      owner: `User:${accountId}`,
    },
  });

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src={data?.accounts.image ?? "https://github.com/shadcn.png"}
            alt={data?.accounts.username ?? "username"}
          />
          <AvatarFallback className="ring ring-inset ring-slate-300">
            {data?.accounts.username ?? ""}{" "}
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
          <Textarea placeholder="Today I went out to meet my friends..." />
          <Button className="flex gap-2 items-center" variant={"outline"}>
            <EnvelopeOpenIcon /> Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
