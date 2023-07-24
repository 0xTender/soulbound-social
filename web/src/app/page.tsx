"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Providers } from "@app/components/providers/Providers";
import { Base } from "./Base";

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
      <Base />
    </Providers>
  ) : (
    <></>
  );
}
