"use client";

import type { FC } from "react";
import NewPost from "./NewPost";
import Posts from "./Posts";
import { gql, useLazyQuery } from "@apollo/client";

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
  const [counterQuery, { data, called: counterCalled, error: counterError }] =
    useLazyQuery<{
      data: {
        accounts: {
          firstName: string;
          lastName: string;
          image: string;
        };
      };
    }>(GET_ACCOUNT_VALUE, {
      fetchPolicy: "network-only",
      variables: {
        owner: `User:e4b76cd3773f325e6c67c9b29a09e19e4ef8a8490ae17eb9d0d9082566270152`,
      },
    });

  if (!counterCalled) {
    void counterQuery();
  }

  console.log(data, counterError, counterCalled);
  return (
    <main className="h-full w-full flex flex-col gap-4">
      <NewPost />
      <Posts />
    </main>
  );
};
