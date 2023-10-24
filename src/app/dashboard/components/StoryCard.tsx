import Image from "next/image";
import { images } from "@/assets";
export default function StoryCard() {
  return (
    <div className="bg-white rounded-md w-[120px]">
      <div className="">
        <Image
          src={images.person}
          width={120}
          height={150}
          alt="avatar"
          className="rounded-md"
        />
      </div>
    </div>
  );
}
