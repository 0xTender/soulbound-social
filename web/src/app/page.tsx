"use client";

import { useEffect, useState } from "react";
import NewPost from "./NewPost";
import Posts from "./Posts";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  const [state, setState] = useState<{
    applicationId: string;
    accountId: string;
  }>();

  useEffect(() => {
    setState({
      applicationId: searchParams.get("applicationId") ?? "",
      accountId: searchParams.get("accountId") ?? "",
    });
  }, [searchParams]);

  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    if (hydrated !== true) {
      setHydrated(true);
    }
  }, [hydrated]);

  console.log(state);

  return hydrated ? (
    <main className="h-full w-full flex flex-col gap-4">
      <NewPost />
      <Posts />
    </main>
  ) : (
    <></>
  );
}
