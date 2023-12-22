"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { images } from "@/assets";
import Image from "next/image";
import { toast } from "sonner";
import { SignUpValues } from "./page";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { useRouter } from "next/navigation";
type props = {
  register: UseFormRegister<SignUpValues>;
  handleSubmit: UseFormHandleSubmit<SignUpValues, undefined>;
  reset: any;
};
export default function SignUpForm({ register, handleSubmit }: props) {
  const router = useRouter();
  const onSubmit = async (data: SignUpValues) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const resData = await res.json();
      localStorage.setItem("token", resData.token);

      if (resData?.error) {
        toast.error(resData.message);
        return;
      }

      if (resData?.token) {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("user", resData.user.id);
      }

      toast.success("Sign up successfully");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Sign up failed");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <Input
          {...register("username", {
            required: true,
          })}
          type="userName"
          placeholder="Account Name"
          className="bg-[#EAF0F7] py-6 text-black"
        />
        <Input
          {...register("email", {
            required: true,
          })}
          type="email"
          placeholder="Email"
          className="bg-[#EAF0F7] py-6 mt-6 text-black"
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
        <Input
          {...register("confirmPassword", {
            required: true,
            minLength: 8,
            maxLength: 16,
          })}
          type="password"
          placeholder="Confirm Password"
          className="mt-4 bg-[#EAF0F7] py-6 text-black"
        />
        <h6 className="text-right mt-4">Recover password ?</h6>
        <Button type="submit" className="mt-4 w-full py-6">
          Sign up
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
