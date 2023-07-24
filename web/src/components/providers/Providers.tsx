"use client";

import { useState, type PropsWithChildren, useEffect } from "react";
import GraphQLProvider from "./GraphQLProvider";
import Layout from "../layout";
import { ThemeProvider } from "./ThemeProvider";
import {
  type StateContextType,
  StateContextProvider,
} from "@app/components/providers/StateContext";

export function Providers({
  children,
  applicationId,
  port,
  accountId,
}: PropsWithChildren<StateContextType>) {
  const [state, setState] = useState<StateContextType>({
    applicationId: "",
    port: "",
    accountId: "",
  });

  useEffect(() => {
    setState({
      applicationId,
      port,
      accountId,
    });
  }, [applicationId, port, accountId]);

  return (
    <StateContextProvider value={{ ...state }}>
      <GraphQLProvider
        {...{
          applicationId,
          port,
          accountId,
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </GraphQLProvider>
    </StateContextProvider>
  );
}
