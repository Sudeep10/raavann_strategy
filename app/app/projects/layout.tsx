"use client";

import AppNavbar from "@/components/app-navbar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "30rem",
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      <div className="flex flex-col mb-2 w-full min-h-dvh">
        <AppNavbar />
        <main className="flex-1">{children}</main>
      </div>
      <AppSidebar />
    </SidebarProvider>
  );
}
