import Image from "next/image";
import { images } from "@/assets";
export default function StoryCard({ story }: { story: any }) {
  console.log(story);
  return (
    <div className="bg-white rounded-md w-[150px]">
      <div className="relative">
        <Image
          src={story.media_url}
          width={150}
          height={150}
          alt="avatar"
          className="rounded-md"
        />
        <div className="absolute bottom-2  flex items-center w-full justify-between px-4">
          <div className="">
            <Image
              src={story.story_user.profile_photo}
              width={20}
              height={20}
              alt="plus"
              className="rounded-full"
            />
          </div>
          <span className="text-black text-lg">
            {story.story_user.username}
          </span>
        </div>
      </div>
    </div>
  );
}
