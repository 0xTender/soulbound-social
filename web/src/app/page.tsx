"use client";

import { useEffect, useState } from "react";
import NewPost from "./NewPost";
import Posts from "./Posts";
import { useSearchParams } from "next/navigation";
import { Providers } from "@app/components/providers/Providers";

export default function Home() {
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    if (hydrated !== true) {
      setHydrated(true);
    }
  }, [hydrated]);

  const searchParams = useSearchParams();

  const [state, setState] = useState<{
    applicationId: string;
    accountId: string;
    port: string;
  }>();

  useEffect(() => {
    setState({
      applicationId: searchParams.get("applicationId") ?? "",
      accountId: searchParams.get("accountId") ?? "",
      port: searchParams.get("port") ?? "8080",
    });
  }, [searchParams]);

  return hydrated && state ? (
    <Providers {...state}>
      <main className="h-full w-full flex flex-col gap-4">
        <NewPost />
        <Posts />
      </main>
    </Providers>
  ) : (
    <></>
  );
}
