"use client";
import { useQuery, gql } from "@apollo/client";
import Post from "./Post";
import { useContext } from "react";
import { StateContext } from "@app/components/providers/StateContext";

const GET_POST_KEYS = gql`
  query PostsKeys {
    postsKeys
  }
`;

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

export default function Posts() {
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
  const { data: posts } = useQuery<{ postsKeys: Array<number> }>(GET_POST_KEYS);

  return (
    <div className="flex flex-col-reverse gap-4">
      {posts?.postsKeys.map((e, idx) => {
        return (
          <Post
            key={idx}
            id={e}
            name={data?.accounts?.username ?? ""}
            time="2h ago"
            logo={data?.accounts?.image ?? ""}
            logoAlt={data?.accounts?.username ?? ""}
            likes={0}
          />
        );
      })}
    </div>
  );
}
