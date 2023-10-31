"use client";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Api } from "@/lib/utils";
export default function Topbar({ input = true }: { input?: boolean }) {
  const [search, setSearch] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<any[]>([]);
  const [accountUser, setAccountUser] = React.useState<any>(null);
  const [show, setShow] = React.useState<boolean>(true);
  React.useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      if (search.length === 0) {
        setShow(false);
      }

      if (search.length < 1 || search.length > 10) {
        setUsers([]);
        return;
      }
      const fetchUsers = async () => {
        //(token);
        const res = await fetch(
          `http://localhost:8080/api/v1/user/getUsers/${search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let data;
        if (res.status === 200) {
          data = await res.json();
          setUsers(data.users);
          return;
        }
        toast.error("Something went wrong try again later");
      };

      fetchUsers();
    } catch (err) {
      //(err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const user = async () => {
      const localUser = await Api(
        "http://localhost:8080/api/v1/user/me",
        token as string
      );
      //(localUser.user);
      setAccountUser(localUser.user);
    };
    user();
  }, []);

  const [id, setId] = React.useState<number[]>([]);
  const handleAddFriend = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8080/api/v1/relation/friend-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receiver_id: id,
          }),
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        if (data.error) {
          toast.error(data.message);

          return;
        }
      }
      toast.success("Friend request sent");
    } catch (err) {
      //(err);
    } finally {
      setId((prev) => prev.filter((item) => item !== id));
    }
  };

  const router = useRouter();

  return (
    <header className="max-w-screen-xl m-auto mt-5">
      <div className="flex justify-between px-6">
        <div className="flex md:gap-28 gap-6">
          <div className="my-auto">
            <h1>Dashboard</h1>
          </div>
          {input && (
            <div className="flex items-center bg shadow-sm pr-3 gap-2 border rounded-md">
              <div className="relative">
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-secondary rounded-md  md:w-96 w-60 outline-none"
                />
                {users.length > 0 ? (
                  <div
                    className="absolute max-h-[350px] overflow-y-auto 
                overflow-hidden right-0 left-0 z-50 bg-secondary text-primary p-3 
                transition-all duration-300 rounded-md shadow-md"
                  >
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center mb-3 justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user?.profile_photo} />
                            <AvatarFallback className="text-xs">
                              {"photo"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h1 className="text-sm">{user.username}</h1>
                          </div>
                        </div>
                        {!id.includes(user.id) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            onClick={() => {
                              if (id.length > 2) {
                                toast.error("You can add only 3 friends");
                                return;
                              }
                              setId([...id, user.id]);
                              handleAddFriend(user.id);
                            }}
                            className="w-6 h-6 text-primary text-[10px] rounded-md cursor-pointer hover:bg-primary hover:text-secondary"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />
                          </svg>
                        ) : (
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4  text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {show ? (
                      <div
                        className="absolute max-h-[350px] overflow-y-auto 
                  overflow-hidden right-0 left-0 z-50 bg-secondary text-primary p-3 
                  transition-all duration-300 rounded-md shadow-md"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="border border-primary">
                            <AvatarImage src={""} />
                            <AvatarFallback className="text-xs">
                              {"photo"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h1 className="text-sm">{"No friends"}</h1>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
              <div className="cursor-pointer text-secondary hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-primary text-[10px] rounded-md"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => {
            router.push("/profile");
          }}
          className="hidden md:flex items-center gap-3 cursor-pointer"
        >
          <h3 className="text-primary text-sm ">
            Hi{" "}
            <span className="font-semibold cursor-pointer">
              {accountUser?.full_name || accountUser?.username}{" "}
            </span>
          </h3>
          <Avatar>
            <AvatarImage src={accountUser?.profile_photo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="md:hidden block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
