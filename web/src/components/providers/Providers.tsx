"use client";

import { type PropsWithChildren } from "react";
import GraphQLProvider from "./GraphQLProvider";
import Layout from "../layout";
import { ThemeProvider } from "./ThemeProvider";

export function Providers({
  children,
  applicationId,
  port,
}: PropsWithChildren<{
  applicationId: string;
  port: string;
}>) {
  return (
    <GraphQLProvider
      {...{
        applicationId,
        port,
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Layout>{children}</Layout>
      </ThemeProvider>
    </GraphQLProvider>
  );
}
