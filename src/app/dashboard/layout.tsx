import React from "react";
import Topbar from "./components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header className="">
      <Topbar />
      {children}
    </header>
  );
}
