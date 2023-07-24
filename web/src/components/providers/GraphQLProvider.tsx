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

function GraphQLProvider({
  children,
  applicationId,
  port,
}: React.PropsWithChildren<{
  applicationId: string;
  port: string;
}>) {
  const client = apolloClient(applicationId, port);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

function apolloClient(applicationId: string, port: string) {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: `ws://localhost:${port}/ws`,
    })
  );

  const httpLink = new HttpLink({
    uri: `http://localhost:${port}/applications/` + applicationId, // !fix link
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
