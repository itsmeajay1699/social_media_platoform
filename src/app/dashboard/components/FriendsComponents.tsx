"use client";

import { Input } from "@/components/ui/input";
import * as React from "react";
export default function FriendsComponentCard({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <section className="mt-2">
        {/* input bar */}
        <div className="px-6">
          <Input placeholder="Search Friends" className="bg-secondary" />
        </div>
        {/* friends bar */}
        <div>{children}</div>
      </section>
    </>
  );
}
