import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import StoryCard from "./components/StoryCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // const checkUser = async () => {
  //   "use server";

  //   const myCookie = cookies()?.get("token")?.value;
  //   const res = await fetch("http://localhost:8080/api/v1/auth/check", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${myCookie}`,
  //     },
  //     credentials: "include",
  //   });
  //   return res;
  // };

  // const res = await checkUser();
  // if (res.status === 401) {
  //   redirect("/login");
  // } else {
  //   const data = await res.json();
  //   console.log(data);
  // }

  return (
    <main className="grid grid-cols-6">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full col-span-4">
        {/* make the scroll but set in the parent width
        and height */}
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
      </div>
      <div className="">
        <h1>Dashboard</h1>
      </div>
    </main>
  );
}
