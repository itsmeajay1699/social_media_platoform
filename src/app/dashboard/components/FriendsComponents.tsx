"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import * as React from "react";
export default function FriendsComponentCard({
  children,
  data = [],
  setUser_id,
}: {
  children?: React.ReactNode;
  data?: any;
  setUser_id?: any;
}) {
  const [search, setSearch] = React.useState("");
  // const captialize = (str: string) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };
  return (
    <>
      <section className="mt-2">
        <h1 className="text-2xl mb-2">Friends</h1>
        <div className="mb-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Friends"
            className="bg-secondary"
          />
        </div>

        {data
          ?.filter((post: any) => {
            return (
              post?.receiver?.username
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
              post?.sender?.username
                ?.toLowerCase()
                .includes(search.toLowerCase())
            );
          })
          .map((post: any) => (
            <div
              key={post.id}
              onClick={() => {
                if (!setUser_id) {
                  return;
                }
                setUser_id({
                  _id: post?.receiver?.id || post?.sender?.id,
                  username: post?.receiver?.username || post?.sender?.username,
                  profile_photo:
                    post?.receiver?.profile_photo ||
                    post?.sender?.profile_photo,
                });
              }}
              className="bg-white rounded-md shadow-md flex items-center px-2 py-2 mb-2 cursor-pointer gap-4"
            >
              <Image
                src={
                  post?.receiver?.profile_photo || post?.sender?.profile_photo
                }
                width={35}
                height={35}
                alt="avatar"
                className="rounded-full h-[40px] w-[40px]"
              />
              <h6 className="text-black">
                {post?.receiver?.username || post?.sender?.username}
              </h6>
            </div>
          ))}
      </section>
    </>
  );
}
