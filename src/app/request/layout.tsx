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
      <Topbar input={false} />
      <main className="flex">
        <div className="max-w-[250px]">
          <Sidebar />
        </div>
        <div className=" w-full  pr-6 mt-4">{children}</div>
      </main>
    </header>
  );
}
