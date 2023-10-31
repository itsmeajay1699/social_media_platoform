import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { Toaster, toast } from "sonner";
import RequestBox from "../request/components/RequestContainer";

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

export default async function Friends() {
  const data = await getFriends();
  
  // console.log(data)

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="w-full flex mt-4 gap-2">
        {/* divided into two parts first in chat box another is chat friends */}
        <div className="max-w-[400px] w-full max-h-[800px] overflow-hidden overflow-y-auto">
          <div className="bg-primary text-secondary rounded-md p-2">
            <p className="text-lg font-bold" style={{ fontFamily: "Poppins" }}>
              Friends
            </p>
            {data?.friends?.map((item: any) => {
              return (
                <RequestBox
                  id={item.id}
                  username={item?.sender?.username || item?.receiver?.username}
                  status={item.status}
                  profile_photo={
                    item?.sender?.profile_photo || item?.receiver?.profile_photo
                  }
                  sent={item.sent}
                  key={item.id}
                  friend={true}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full min-h-[710px] overflow-hidden overflow-y-auto">
          <div
            className="bg-primary text-secondary rounded-md p-2"
            style={{ height: "100%" }}
          >
            <div className="bg-primary text-secondary rounded-md p-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-secondary"></div>
                  <div className="flex flex-col">
                    <h1 className="text-lg font-bold">Username</h1>
                    <p className="text-sm">Active Now</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-secondary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        className="text-secondary
                        "
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9a1 1 0 00-1 1v3a1 1 0 102 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v3a1 1 0 102 0V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Call</p>
                  </Button>
                  <Button className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-secondary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        className="text-secondary
                        "
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9a1 1 0 00-1 1v3a1 1 0 102 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v3a1 1 0 102 0V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Video Call</p>
                  </Button>

                  <Button className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-secondary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        className="text-secondary
                        "
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9a1 1 0 00-1 1v3a1 1 0 102 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v3a1 1 0 102 0V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>More</p>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-2 p-4">
              <div className="max-w-[100%]">
                <p className="bg-secondary text-primary rounded-md p-2 max-w-[50%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                  corporis mollitia. Inventore impedit numquam autem. Eius error
                  quia non blanditiis ad delectus quo sed necessitatibus
                  commodi? Itaque quos deleniti voluptate consectetur quae esse
                  quisquam eveniet, debitis facilis minima molestias aperiam
                  tenetur, vero praesentium deserunt provident tempore vel et,
                  voluptatem cum.
                </p>
              </div>
              <div className="max-w-[100%] flex justify-end mb-2">
                <p className="bg-secondary text-primary rounded-md p-2 max-w-[50%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                  corporis mollitia. Inventore impedit numquam autem. Eius error
                  quia non blanditiis ad delectus quo sed necessitatibus
                  commodi? Itaque quos deleniti voluptate consectetur quae esse
                  quisquam eveniet, debitis facilis minima molestias aperiam
                  tenetur, vero praesentium deserunt provident tempore vel et,
                  voluptatem cum.
                </p>
              </div>
              <div className="max-w-[100%] flex justify-end mb-2">
                <p className="bg-secondary text-primary rounded-md p-2 max-w-[50%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                  corporis mollitia. Inventore impedit numquam autem. Eius error
                  quia non blanditiis ad delectus quo sed necessitatibus
                  commodi? Itaque quos deleniti voluptate consectetur quae esse
                  quisquam eveniet, debitis facilis minima molestias aperiam
                  tenetur, vero praesentium deserunt provident tempore vel et,
                  voluptatem cum.
                </p>
              </div>
              <div className="max-w-[100%] flex justify-end mb-2">
                <p className="bg-secondary text-primary rounded-md p-2 max-w-[50%]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                  corporis mollitia. Inventore impedit numquam autem. Eius error
                  quia non blanditiis ad delectus quo sed necessitatibus
                  commodi? Itaque quos deleniti voluptate consectetur quae esse
                  quisquam eveniet, debitis facilis minima molestias aperiam
                  tenetur, vero praesentium deserunt provident tempore vel et,
                  voluptatem cum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
