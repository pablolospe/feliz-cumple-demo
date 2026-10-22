"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SaludosRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/home/sections/saludo1");
  }, [router]);
  return null;
}
