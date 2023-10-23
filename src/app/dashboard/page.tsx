"use client";

import React from "react";
import { useRouter } from "next/navigation";
const checkUser = async () => {
  const res = await fetch("http://localhost:8080/api/v1/auth/check", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return res;
};

export default function DashboardPage() {
  const router = useRouter();
  React.useEffect(() => {
    checkUser().then((res) => {
      if (res.status === 200) {
        return;
      } else {
        router.push("/login");
      }
    });
  }, []);

  return (
    <>
      <h1>This is the dashboard page</h1>
    </>
  );
}
