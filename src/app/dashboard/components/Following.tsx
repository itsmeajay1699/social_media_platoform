import PostCard from "./PostCard";
import * as React from "react";
import dynamic from "next/dynamic";

const UploadPostComponent = dynamic(
  () => import("../components/UploadPostComponent"),
  { ssr: false }
);

export default function Following({
  data,
  // user_id,
}: {
  data: any;
  // user_id: number;
  upload?: boolean;
}) {
  return (
    <section>
      <div
      // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {data?.friendPost?.map((friendPost: any) => {
          return (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              key={friendPost.id}
            >
              {friendPost.sender
                ? friendPost.sender.posts.map((post: any) => (
                    <PostCard
                      key={post.post_id}
                      // user_id={user_id}
                      post_id={post.post_id}
                      media={post.media}
                      likeCount={post.likes_count}
                      commentCount={post.comments_count}
                      about={post.about}
                      username={friendPost.sender.username}
                      user_photo={friendPost.sender.profile_photo}
                      likeUser={post?.like_user_id}
                    />
                  ))
                : friendPost.receiver.posts.map((post: any) => (
                    <PostCard
                      // user_id={user_id}
                      post_id={post.post_id}
                      key={post.post_id}
                      media={post.media}
                      likeCount={post.likes_count}
                      commentCount={post.comments_count}
                      about={post.about}
                      username={friendPost.receiver.username}
                      user_photo={friendPost.receiver.profile_photo}
                      likeUser={post?.like_user_id}
                    />
                  ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
