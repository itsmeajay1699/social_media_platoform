import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import StoryCard from "./components/StoryCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FriendsComponentCard from "./components/FriendsComponents";
import Image from "next/image";
import { images } from "@/assets";
import TabComponent from "./components/TabComponent";
import { Toaster } from "sonner";
import { Api } from "@/lib/utils";

const getFriends = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/relation//friend-request/accepted`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies()?.get("token")?.value}`,
        },
        next: {
          revalidate: 30, // In seconds
        },
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      if (data.error) {
        // toast.error(data.message);
      } else {
        // toast.success(data.message);
        return data;
      }
    }
  } catch (err) {
    //(err);
  }
};

const friendsStory = async () => {
  try {
    const res = await Api(
      `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/story`,
      cookies()?.get("token")?.value as string
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default async function DashboardPage() {
  // const res = await checkUser();
  // //(res.user.id);
  // if (res.status === 401) {
  //   redirect("/login");
  // } else {
  //   //(res.user.id);
  // }

  const friends = await getFriends();

  const friendStory = await friendsStory();

  // console.log(friendStory?.friendStory);

  return (
    <>
      <Toaster richColors position="top-right" />
      <main className="grid grid-cols-6">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="w-full col-span-6 md:col-span-5 xl:col-span-4 px-3 xl:px-0">
          <div className="flex overflow-x-auto  gap-4 p-4">
            {/* {Array.from({ length: 30 - 1 }).map(() => (
              <div
                key={Math.random()}
                className="bg-white rounded-md shadow-md flex"
              >
                <StoryCard />
              </div>
            ))} */}

            {friendStory?.friendStory?.map((story: any) => (
              <div
                key={story.id}
                className="bg-white rounded-md shadow-md flex"
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>
          <section className="mt-4">
            <TabComponent user_id={2} />
          </section>
        </div>
        <div className="p-4 h-[700px] overflow-x-auto hidden xl:block">
          <FriendsComponentCard data={friends?.friends} />
        </div>
      </main>
    </>
  );
}
