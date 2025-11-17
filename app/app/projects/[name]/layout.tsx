"use client";

import { useUserStore } from "@/store/user";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams<{ name: string }>();
  useEffect(() => {
    const teamName = params.name;
    useUserStore.setState({ team: teamName });
  }, [params]);
  return <>{children}</>;
}
