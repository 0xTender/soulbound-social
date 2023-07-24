"use client";

import { useContext, type FC, useEffect } from "react";
import NewPost from "./NewPost";
import Posts from "./Posts";
import { gql, useLazyQuery } from "@apollo/client";
import { StateContext } from "@app/components/providers/StateContext";
import { CreateAccount } from "./CreateAccount";

// const GET_COUNTER_VALUE = gql`
//   query {
//     value
//   }
// `;

const GET_ACCOUNT_VALUE = gql`
  query Account($owner: AccountOwner) {
    accounts(accountId: $owner) {
      firstName
      lastName
    }
  }
`;

export const Base: FC = () => {
  const { accountId } = useContext(StateContext);

  const [counterQuery, { data, called: accountCalled, error: accountError }] =
    useLazyQuery<{
      accounts: {
        firstName: string;
        lastName: string;
        image: string;
      } | null;
    }>(GET_ACCOUNT_VALUE, {
      fetchPolicy: "network-only",
      variables: {
        owner: `User:${accountId}`,
      },
    });

  useEffect(() => {
    if (!accountCalled && accountId !== undefined) {
      void counterQuery();
    }
  }, [accountCalled, counterQuery, accountId]);

  console.log(data, accountError, accountCalled);
  return (
    <main className="h-full w-full flex flex-col gap-4">
      {accountCalled && data?.accounts !== null && (
        <>
          <NewPost />
          <Posts />
        </>
      )}
      {accountCalled && data?.accounts === null && (
        <>
          <CreateAccount />
        </>
      )}
    </main>
  );
};
