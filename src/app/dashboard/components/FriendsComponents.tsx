"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import * as React from "react";
export default function FriendsComponentCard({
  children,
  data = [],
  setUser_id,
  setCurrentSelectedUser,
  userId,
}: {
  children?: React.ReactNode;
  data?: any;
  setUser_id?: any;
  setCurrentSelectedUser?: any;
  userId?: any;
}) {
  const [search, setSearch] = React.useState("");
  // const captialize = (str: string) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  // console.log(userId);

  // console.log(data);

  console.log(data);

  return (
    <>
      {userId && (
        <section className="mt-2">
          <h1 className="text-2xl mb-2">Friends</h1>
          <div className="mb-4">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Friends"
              className="bg-secondary text-primary"
            />
          </div>

          {data
            ?.filter((chatRoom: any) => {
              if (search === "") {
                return chatRoom;
              } else if (userId != chatRoom?.user_1) {
                return chatRoom?.user_1?.username
                  .toLowerCase()
                  .includes(search.toLowerCase());
              } else if (userId != chatRoom?.user_2) {
                return chatRoom?.user_2?.username
                  .toLowerCase()
                  .includes(search.toLowerCase());
              }
            })
            .map((chatRoom: any) => (
              <div
                key={chatRoom.id}
                onClick={() => {
                  if (!setUser_id) {
                    return;
                  }
                  setUser_id(chatRoom?.id);

                  if (userId != chatRoom?.user_1.id) {
                    console.log(chatRoom?.user_1);
                    setCurrentSelectedUser(chatRoom?.user_1);
                  }
                  if (userId != chatRoom?.user_2.id) {
                    console.log(chatRoom?.user_2);
                    setCurrentSelectedUser(chatRoom?.user_2);
                  }
                }}
                className="bg-white rounded-md shadow-md flex items-center px-2 py-2 mb-2 cursor-pointer gap-4"
              >
                {userId && (
                  <>
                    {userId != chatRoom?.user_id_1 ? (
                      <>
                        <Image
                          src={chatRoom?.user_1?.profile_photo}
                          width={35}
                          height={35}
                          alt="avatar"
                          className="rounded-full h-[40px] w-[40px]"
                        />
                        <div>
                          <h6 className="text-black">
                            {chatRoom?.user_1?.username}
                          </h6>
                          <span className="text-gray-400 text-sm">
                            {chatRoom.last_message?.content}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Image
                          src={chatRoom?.user_2?.profile_photo}
                          width={35}
                          height={35}
                          alt="avatar"
                          className="rounded-full h-[40px] w-[40px]"
                        />

                        <div>
                          <h6 className="text-black">
                            {chatRoom?.user_2?.username}
                          </h6>
                          <span className="text-gray-400 text-sm">
                            {chatRoom.last_message?.content}
                          </span>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
        </section>
      )}
    </>
  );
}
