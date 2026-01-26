"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const buildStorageKey = (email: string) => `visit-tracked:${email}`;

export default function VisitTracker() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const email = session?.user?.email ?? null;

  useEffect(() => {
    if (status !== "authenticated" || !email) {
      return;
    }

    const storageKey = buildStorageKey(email);
    if (sessionStorage.getItem(storageKey)) {
      return;
    }

    sessionStorage.setItem(storageKey, new Date().toISOString());

    const controller = new AbortController();
    fetch("/api/visits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: pathname ?? "/" }),
      signal: controller.signal,
    }).catch(() => undefined);

    return () => controller.abort();
  }, [email, pathname, status]);

  return null;
}
