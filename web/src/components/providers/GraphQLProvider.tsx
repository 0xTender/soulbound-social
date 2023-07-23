"use client";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import React from "react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Kind, OperationTypeNode } from "graphql";

function GraphQLProvider({ children }: React.PropsWithChildren<unknown>) {
  const client = apolloClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

function apolloClient() {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:8080/ws",
    })
  );

  const httpLink = new HttpLink({
    uri: "http://localhost:8080/applications/", // !fix link
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === Kind.OPERATION_DEFINITION &&
        definition.operation === OperationTypeNode.SUBSCRIPTION
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
}

export default GraphQLProvider;
