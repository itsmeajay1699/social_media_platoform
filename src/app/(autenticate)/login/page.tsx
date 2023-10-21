"use client";

import React from "react";
import Header from "../Header";
import { images } from "@/assets";
import Image from "next/image";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
export type PageState = "Login" | "SignUp";

export default function SignUpPage() {
  const [pageState, setPageState] = React.useState<PageState>("Login");

  return (
    <main className="bg-login_bg">
      <div className="py-20 min-h-screen ">
        <div className="flex m-auto  justify-end max-w-5xl">
          <Header pageState={pageState} setPageState={setPageState} />
        </div>
        <section className="grid lg:grid-cols-3 md:grid-cols-2 mt-32 gap-6  max-w-screen-xl m-auto ">
          <div className="self-start flex flex-col items-center md:items-start px-6">
            <div className="text-5xl">
              {pageState === "Login" ? (
                <div>
                  Sign in to <span className="text-blue-500">your account</span>
                </div>
              ) : (
                <div>
                  Sign up to{" "}
                  <span className="text-blue-500">create account</span>
                </div>
              )}
            </div>
            <h6 className="mt-12 max-w-fit text-right">
              {pageState === "Login"
                ? "if you don't have an account"
                : "if you have an account"}{" "}
              <br />
              <span
                onClick={() => {
                  setPageState(pageState === "Login" ? "SignUp" : "Login");
                }}
                className="text-blue-500 cursor-pointer  hover:text-white"
              >
                {pageState === "Login" ? "Sign up" : "Sign in"}
              </span>
            </h6>
          </div>

          <div className="relative bottom-28 self-start hidden lg:block">
            <Image
              src={images.login}
              width={600}
              height={600}
              alt="Picture of the author"
            />
          </div>
          <div className="m-auto">
            {pageState === "Login" ? <LoginForm /> : <SignUpForm />}
          </div>
        </section>
      </div>
    </main>
  );
}
