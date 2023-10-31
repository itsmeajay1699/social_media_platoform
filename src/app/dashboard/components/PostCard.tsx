"use client";
import Image from "next/image";
import { images } from "@/assets";
import DropDownMenu from "./DropDownMenu";
import { Api } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function PostCard({
  key,
  media,
  likeCount,
  commentCount,
  username,
  user_photo,
  about,
  post_id,
  myContent = false,
  likeUser,
}: // user_id,
{
  key: number;
  media: string;
  likeCount: number;
  commentCount: number;
  username: string;
  about: string;
  user_photo: string;
  post_id: number;
  // user_id: number;
  likeUser?: number[];
  myContent?: boolean;
}) {
  const router = useRouter();
  const user_id = parseInt(localStorage.getItem("user") as string);
  const likeButton = async (id: number) => {
    try {
      const res = await Api(
        `http://localhost:8080/api/v1/post/like/${id}`,
        localStorage.getItem("token") as string,
        "POST"
      );

      if (res.error) return toast.error(res.message);
      toast.success(res.message);
      router.refresh();
    } catch (err) {
      //(err);
    }
  };

  return (
    <div className="p-2 mb-4" key={key}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg relative">
        <div className="w-full h-[250px]">
          <Image
            src={media}
            alt="Mountain"
            className="w-full h-full object-cover"
            width={300}
            height={300}
          />
        </div>

        <div className="mt-2 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Image
              src={user_photo}
              width={30}
              height={30}
              alt="avatar"
              className="rounded-[50%] object-cover"
            />
            <span className="text-primary">{username}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span>{likeCount}</span>
            {likeUser?.includes(user_id) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                // onClick={() => likeButton(post_id)}
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="mr-2 h-5 w-5 text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                onClick={() => likeButton(post_id)}
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="mr-2 h-5 w-5 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
            <span>{commentCount}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="mr-2 h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-sm line-clamp-3">{about}</span>
        </div>
        {myContent && (
          <div>
            <DropDownMenu
              post_id={post_id}
              className="absolute top-0 right-0 p-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}
