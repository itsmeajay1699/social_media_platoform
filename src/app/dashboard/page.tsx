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

const getFriends = async () => {
  try {
    const res = await fetch(
      "http://localhost:8080/api/v1/relation//friend-request/accepted",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies()?.get("token")?.value}`,
        },
        cache: "no-store",
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

export default async function DashboardPage() {
  // const res = await checkUser();
  // //(res.user.id);
  // if (res.status === 401) {
  //   redirect("/login");
  // } else {
  //   //(res.user.id);
  // }

  const friends = await getFriends();
  console.log(friends.friends)

  return (
    <>
      <Toaster richColors position="top-right" />
      <main className="grid grid-cols-6">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="w-full col-span-6 md:col-span-5 xl:col-span-4 px-3 xl:px-0">
          <div className="flex overflow-x-auto  gap-4 p-4">
            {Array.from({ length: 30 - 1 }).map(() => (
              <div
                key={Math.random()}
                className="bg-white rounded-md shadow-md flex"
              >
                <StoryCard />
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
