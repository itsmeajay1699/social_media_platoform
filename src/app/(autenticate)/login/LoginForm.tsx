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

import { useRouter } from "next/navigation";

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
  const onSubmit = async (data: LoginValues) => {
    try {
      const checkData = loginSchema.safeParse(data);

      if (!checkData.success) {
        toast.error("Invalid data");
        return;
      }

      const res = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const response = await res.json();

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", response.user.id);

      if (response?.error) {
        toast.error(response.message);
        return;
      }
      toast.success("Sign in successfully");
      router.push("/dashboard");
    } catch (err) {
      // //(err);
      toast.error("Sign in failed");
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
        <Input
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 16,
          })}
          type="password"
          placeholder="Password"
          className="mt-4 bg-[#EAF0F7] py-6 text-black"
        />
        <h6 className="text-right mt-4">Recover password ?</h6>
        <Button type="submit" className="mt-4 w-full py-6">
          Sign in
        </Button>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-black"></div>
          <span className="flex-shrink mx-4 text-black">or continue with</span>
          <div className="flex-grow border-t border-black"></div>
        </div>
      </form>
      <div className="text-center flex gap-4 justify-center">
        <Button className="bg-white">
          <Image src={images.google} width={20} height={20} alt="google" />
        </Button>
        <Button className="bg-white">
          <Image src={images.apple} width={20} height={20} alt="google" />
        </Button>
        <Button className="bg-white">
          <Image src={images.fb} width={20} height={20} alt="google" />
        </Button>
      </div>
    </section>
  );
}
