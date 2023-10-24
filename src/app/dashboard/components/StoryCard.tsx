import Image from "next/image";
import { images } from "@/assets";
export default function StoryCard() {
  return (
    <div className="bg-white rounded-md w-[150px]">
      <div className="relative">
        <Image
          src={images.person}
          width={150}
          height={150}
          alt="avatar"
          className="rounded-md"
        />
        <div className="absolute bottom-2  flex items-center w-full justify-between px-4">
          <div className="">
            <Image
              src={images.google}
              width={20}
              height={20}
              alt="plus"
              className="rounded-full"
            />
          </div>
          <span className="text-secondary text-lg">Ajay</span>
        </div>
      </div>
    </div>
  );
}
