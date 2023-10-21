import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { images } from "@/assets";
import Image from "next/image";

export default function SignUpForm() {
  return (
    <section>
      <form action="" className="w-96">
        <Input
          type="userName"
          placeholder="Account Name"
          className="bg-[#EAF0F7] py-6 text-black"
        />
        <Input
          type="email"
          placeholder="Email"
          className="bg-[#EAF0F7] py-6 mt-6 text-black"
        />
        <Input
          type="password"
          placeholder="Password"
          className="mt-4 bg-[#EAF0F7] py-6 text-black"
        />
        <h6 className="text-right mt-4">Recover password ?</h6>
        <Button className="mt-4 w-full py-6">Sign up</Button>
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
