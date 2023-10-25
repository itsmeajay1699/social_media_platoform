import React from "react";
import Topbar from "../dashboard/components/Topbar";
import Sidebar from "../dashboard/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header className="">
      <Topbar />
      <main className="flex">
        <div className="max-w-[250px]">
          <Sidebar />
        </div>
        <div className="max-w-[800px] pr-6">{children}</div>
      </main>
    </header>
  );
}
