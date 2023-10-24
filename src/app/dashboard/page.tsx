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

const checkUser = async () => {
  const myCookie = cookies()?.get("token")?.value;
  const res = await fetch("http://localhost:8080/api/v1/auth/check", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myCookie}`,
    },
    credentials: "include",
  });
  return res;
};

export default async function DashboardPage() {
  const res = await checkUser();
  if (res.status === 401) {
    redirect("/login");
  } else {
    const data = await res.json();
  }

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
            <TabComponent />
          </section>
        </div>
        <div className="p-4 h-[700px] overflow-x-auto hidden xl:block">
          <FriendsComponentCard>
            <section className="mt-4 flex flex-col gap-4">
              <h1 className="text-2xl">Friends</h1>
              {Array.from({ length: 20 - 1 }).map(() => (
                <div
                  key={Math.random()}
                  className="bg-white rounded-md shadow-md flex justify-between items-center px-4 py-2"
                >
                  <Image
                    src={images.fb}
                    width={30}
                    height={30}
                    alt="avatar"
                    className="rounded-[50%] object-cover"
                  />
                  <h6 className="text-secondary">Ajay kumar</h6>
                </div>
              ))}
            </section>
          </FriendsComponentCard>
        </div>
      </main>
    </>
  );
}
