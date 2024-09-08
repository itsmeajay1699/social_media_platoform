"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { images } from "@/assets";
import Image from "next/image";
import { toast } from "sonner";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { LoginValues } from "./page";
import { redirect } from "next/navigation";
import React from "react";

import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

type props = {
  register: UseFormRegister<LoginValues>;
  handleSubmit: UseFormHandleSubmit<LoginValues, undefined>;
  reset: any;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export default function LoginForm({ register, handleSubmit }: props) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit = async (data: LoginValues) => {
    try {
      setLoading(true);
      const checkData = loginSchema.safeParse(data);

      if (data.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }

      if (!checkData.success) {
        toast.error("Invalid data");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const response = await res.json();

      if (response?.error) {
        toast.error(response.message);
        return;
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", response.user.id);

      if (response?.error) {
        toast.error(response.message);
        return;
      }

      // set the token in the cookie
      document.cookie = `token=${response.token}; expires=${new Date(
        Date.now() + 86400 * 1000
      ).toUTCString()}; secure; samesite=strict; path=/`;

      toast.success("Sign in successfully");
      router.push("/dashboard");
    } catch (err) {
      // //(err);
      console.log(err);
      toast.error("Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-96">
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <Input
          type="email"
          placeholder="Email"
          className="bg-[#EAF0F7] py-6 text-black"
          {...register("email", {
            required: true,
          })}
        />
        <div className="relative w-full border-none">
          <Input
            {...register("password", {
              required: true,
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="mt-4 bg-[#EAF0F7] py-6 text-black"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3 right-2 w-[25px] h-[25px] cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-full w-full text-black" />
            ) : (
              <Eye className="text-black h-full w-full" />
            )}
          </div>
        </div>
        <h6 className="text-right mt-4">Recover password ?</h6>
        {!loading ? (
          <Button type="submit" className="mt-4 w-full py-6">
            Sign in
          </Button>
        ) : (
          <Button className="mt-4 w-full py-6 cursor-not-allowed">
            <div role="status">
              <div className="flex items-center justify-between w-full gap-2">
                <h1 className="text-bold text-md">Loading</h1>
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-red-60 fill-green-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          </Button>
        )}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-black"></div>
          <span className="flex-shrink mx-4 text-black">or continue with</span>
          <div className="flex-grow border-t border-black"></div>
        </div>
      </form>
      {/* <div className="text-center flex gap-4 justify-center">
        <Button className="bg-white">
          <Image src={images.google} width={20} height={20} alt="google" />
        </Button>
        <Button className="bg-white">
          <Image src={images.apple} width={20} height={20} alt="google" />
        </Button>
        <Button className="bg-white">
          <Image src={images.fb} width={20} height={20} alt="google" />
        </Button>
      </div> */}
    </section>
  );
}
