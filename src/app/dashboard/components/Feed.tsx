import PostCard from "./PostCard";
import * as React from "react";
import dynamic from "next/dynamic";

export default function Feed({
  data,
  upload,
}: // user_id,s
{
  data: any;
  // user_id: number;
  upload?: boolean;
}) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {data?.allPublicPost?.map((post: any) => {
          //(post?.post?.user?.username);
          return (
            <PostCard
              key={Math.random()}
              media={post?.post?.media}
              likeCount={post?.post?.likes_count}
              commentCount={post?.post?.comments_count}
              about={post?.post?.about}
              username={post?.post?.user?.username}
              user_photo={post?.post?.user?.profile_photo}
              post_id={post?.post?.post_id}
              likeUser={post?.post?.like_user_id}
              // user_id={user_id}
            />
          );
        })}
      </div>
    </section>
  );
}
