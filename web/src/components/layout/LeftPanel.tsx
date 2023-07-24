"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Menu from "./Menu";
import { gql, useQuery } from "@apollo/client";
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
export default function LeftPanel() {
  const { accountId } = useContext(StateContext);
  const { data } = useQuery<{
    accounts: {
      firstName: string;
      lastName: string;
      image: string;
      username: string;
    } | null;
  }>(GET_ACCOUNT_VALUE, {
    fetchPolicy: "network-only",
    variables: {
      owner: `User:${accountId}`,
    },
  });

  return (
    <menu className="flex flex-col gap-4 justify-between h-full">
      <section>
        {
          <div className="flex gap-4 items-center flex-wrap">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={data?.accounts?.image ?? ""}
                alt={data?.accounts?.username ?? "username"}
              />
              <AvatarFallback className="ring ring-inset ring-slate-300">
                {data?.accounts?.username ?? ""}{" "}
              </AvatarFallback>
            </Avatar>
            <data>
              <h1>{data?.accounts?.username ?? ""}</h1>
              <Badge className="mb-2">
                {data?.accounts?.firstName ?? ""}{" "}
                {data?.accounts?.lastName ?? ""}
              </Badge>
            </data>
          </div>
        }
      </section>
      <section className="h-full my-8">
        <Menu />
      </section>
      <section>
        <Button className="flex gap-2" variant={"secondary"}>
          <ExitIcon />
          Logout
        </Button>
      </section>
    </menu>
  );
}
