import { Toaster, toast } from "sonner";
import TabComponent from "./components/TabComponent";
import { cookies } from "next/headers";
const RecievedReques = async (url: string, myCookie: any) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myCookie}`,
      },
      cache: "no-store",
      next: {
        revalidate: 0, // In seconds
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data.error) {
        return toast.error(data.message);
      }
      return data;
    }
  } catch (err) {
    //(err);
  }
};
export default async function RequestPage() {
  const myCookie = cookies()?.get("token")?.value;
  const recievedRequest = await RecievedReques(
    "http://localhost:8080/api/v1/relation/friend-request/received",
    myCookie
  );
  // //(recievedRequest);
  const sentRequest = await RecievedReques(
    "http://localhost:8080/api/v1/relation/friend-request/sent",
    myCookie
  );
  // //(sentRequest);
  return (
    <>
      <Toaster richColors />
      <div className="w-full">
        <TabComponent
          sentRequest={sentRequest}
          recievedRequest={recievedRequest}
        />
      </div>
    </>
  );
}
