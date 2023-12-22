import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Feed from "./Feed";
import dynamic from "next/dynamic";
// import Following from "./Following";

const Following = dynamic(() => import("./Following"), { ssr: false });

const MyLibrary = dynamic(() => import("./MyLibrary"), { ssr: false });

import { Api } from "@/lib/utils";
import { cookies } from "next/headers";
// import { toast } from "sonner";

const publicPostForFeedTabOne = async () => {
  try {
    if (!cookies()?.get("token")?.value) return new Error("Unauthorized");
    const token = cookies()?.get("token")?.value;

    const data = await Api(
      `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/publicPost/`,
      token as string,
      "GET",
      null,
      {
        revalidating: 30,
      }
    );

    return data;
  } catch (err) {
    //(err);
  }
};

const friendsPostPost = async () => {
  try {
    if (!cookies()?.get("token")?.value) return new Error("Unauthorized");
    const token = cookies()?.get("token")?.value;
    const data = await Api(
      `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/post/friend-post`,
      token as string,
      "GET",
      null,
      {
        revalidating: 30,
      }
    );

    return data;
  } catch (err) {
    //(err);
  }
};

export default async function TabComponent({ user_id }: { user_id: number }) {
  const dataForFeedTabOne = await publicPostForFeedTabOne();
  const dataForFeedTabTwo = await friendsPostPost();
  // //(dataForFeedTabTwo);
  // //(dataForFeedTabOne);
  return (
    <Tabs defaultValue="feed" className="w-full">
      <div className="text-right">
        <TabsList className="w-fit">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="friends">Following</TabsTrigger>
          <TabsTrigger value="my-library">My library</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="feed">
        <Feed
          // user_id={user_id}
          data={dataForFeedTabOne}
        />
      </TabsContent>
      <TabsContent value="friends">
        <Following
          // user_id={user_id}
          data={dataForFeedTabTwo}
        />
      </TabsContent>
      <TabsContent value="my-library">
        <MyLibrary
        // user_id={user_id}
        />
      </TabsContent>
    </Tabs>
  );
}
