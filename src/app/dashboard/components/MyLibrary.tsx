import { Api } from "@/lib/utils";
import UploadPostComponent from "./UploadPostComponent";
import { cookies } from "next/headers";
import PostCard from "./PostCard";

const myPost = async () => {
  try {
    if (!cookies()?.get("token")?.value) return new Error("Unauthorized");
    const token = cookies()?.get("token")?.value;
    const res = Api(
      "http://localhost:8080/api/v1/post/my-post",
      token as string,
      "GET",
      null,
      {
        revalidating: 30,
      }
    );
    return res;
  } catch (err) {
    //(err);
  }
};

export default async function MyLibrary({ user_id }: { user_id: number }) {
  const my_post = await myPost();

  return (
    <section>
      <div>
        <UploadPostComponent />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {my_post?.myPost?.map((post: any) => {
          //(post?.post?.user?.username);
          return (
            <PostCard
              user_id={user_id}
              key={Math.random()}
              post_id={post?.post_id}
              media={post?.media}
              likeCount={post?.likes_count}
              commentCount={post?.comments_count}
              about={post?.about}
              username={post?.user?.username}
              user_photo={post?.user?.profile_photo}
              myContent={true}
              likeUser={post?.like_user_id}
            />
          );
        })}
      </div>
    </section>
  );
}
