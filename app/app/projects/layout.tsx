"use client";

import AppNavbar from "@/components/app-navbar";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
