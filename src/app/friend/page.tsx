import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { Toaster, toast } from "sonner";
import ChatSections from "./ChatSection";

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

export default async function Friends() {
  const data = await getFriends();

  // console.log(data);

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="w-full flex mt-4 gap-2">
        {/* divided into two parts first in chat box another is chat friends */}
        <ChatSections data={data} />
      </div>
    </>
  );
}
