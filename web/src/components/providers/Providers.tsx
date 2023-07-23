"use client";

import { type PropsWithChildren } from "react";
import GraphQLProvider from "./GraphQLProvider";
import Layout from "../layout";
import { ThemeProvider } from "./ThemeProvider";

export function Providers({ children }: PropsWithChildren<unknown>) {
  return (
    <GraphQLProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Layout>{children}</Layout>
      </ThemeProvider>
    </GraphQLProvider>
  );
}
