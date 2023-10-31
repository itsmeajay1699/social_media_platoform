"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import * as React from "react";
export default function FriendsComponentCard({
  children,
  data = [],
}: {
  children?: React.ReactNode;
  data?: any;
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
              className="bg-white rounded-md shadow-md flex justify-between items-center px-2 py-2"
            >
              <Image
                src={
                  post?.receiver?.profile_photo || post?.sender?.profile_photo
                }
                width={35}
                height={35}
                alt="avatar"
                className="rounded-[50%] object-cover"
              />
              <h6 className="text-secondary">
                {post?.receiver?.username || post?.sender?.username}
              </h6>
            </div>
          ))}
      </section>
    </>
  );
}
