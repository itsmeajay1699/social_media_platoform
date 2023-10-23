import React from "react";
import { redirect } from "next/navigation";

type userObj = {
  error: boolean;
  message: string;
};

export default async function HomePage() {
  redirect("/dashboard");
  return <></>;
}
