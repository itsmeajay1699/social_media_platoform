"use client";
import { Button } from "@/components/ui/button";
import FriendsComponentCard from "../dashboard/components/FriendsComponents";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type USER = {
  _id: string;
  username: string;
  profile_photo: string;
};

export default function ChatSections({ data }: { data: any }) {
  const [user, setUser] = useState<USER | null>(null);
  const [userId, setUserId] = useState<string | Number>("");
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const [myMessage, setMyMessage] = useState<any>([]);
  const [receiverMessage, setReceiverMessage] = useState<any>([]);
  // const fkk = localStorage.getItem("user") as string;
  // const user_id = parseInt(localStorage.getItem("user") as string); showing error
  //  because of the this client component is embedded in the server
  // component so it is not able to get the localstorage value so use local sorage in the useEffect hook

  // console.log(user_id)
  useEffect(() => {
    const socket = new WebSocket(
      "wss://social-media-platform-4dt3.onrender.com"
    );
    const user_id = parseInt(localStorage.getItem("user") as string);
    setSocket(socket);

    socket.onopen = () => {
      const data = {
        type: "connect",
        user_id: user_id,
      };

      socket.send(JSON.stringify(data));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.message);
      if (data.type === "message") {
        setReceiverMessage((prev: any) => [...prev, data.message]);
      }
    };

    return () => {
      // socket.send(
      //   JSON.stringify({
      //     type: "closed",
      //     user_id: user_id,
      //   })
      // );
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    try {
      const data = {
        type: "message",
        receiver: user?._id,
        message: message,
        sender: userId,
      };
      setMyMessage((prev: any) => [...prev, message]);
      setMessage("");
      socket.send(JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(user);

  return (
    <>
      <div className="max-w-[400px] w-full max-h-[800px] overflow-hidden overflow-y-auto">
        <div className="bg-primary text-secondary rounded-md p-2">
          <FriendsComponentCard setUser_id={setUser} data={data?.friends} />
        </div>
      </div>
      {
        <div className="flex flex-col gap-2 w-full">
          {user?._id ? (
            <>
              <div className="w-full min-h-[710px] overflow-hidden overflow-y-auto relative pb-4">
                <div
                  className="bg-primary text-secondary rounded-md p-2"
                  style={{ height: "100%" }}
                >
                  <div className="bg-primary text-secondary rounded-md p-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-secondary">
                          <Image
                            src={user?.profile_photo}
                            width={40}
                            height={40}
                            alt="avatar"
                            className="rounded-full h-[40px] w-[40px]"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-lg font-bold">
                            {user?.username}
                          </h1>
                          <p className="text-sm">Active Now</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={sendMessage}
                          className="flex items-center gap-2"
                        >
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

                  <div className="mt-2 p-4 h-[500px] overflow-hidden overflow-y-auto relative ">
                    <div className="max-w-[50%]">
                      {receiverMessage.map((msg: any) => (
                        <p
                          key={msg}
                          className="bg-secondary text-primary rounded-md p-2 mb-2 w-[fit-content]"
                        >
                          {msg}
                        </p>
                      ))}
                    </div>

                    <div className="max-w-[50%] text-right absolute right-0 ">
                      {myMessage.map((msg: any) => (
                        <div
                          key={msg}
                          className="max-w-[100%] flex justify-end mb-2"
                        >
                          <p className="bg-secondary text-primary rounded-md p-2">
                            {msg}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex items-center justify-between absolute bottom-0 w-[100%] left-0 px-8 py-5 bg-primary gap-2"
                >
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="bg-secondary text-primary border-primary"
                  />

                  <Button className="flex items-center gap-2 outline">
                    <p>Send</p>
                    <svg
                      onClick={sendMessage}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-black cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </Button>

                  {/* <svg
                    onClick={sendMessage}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-10 w-10 text-black cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg> */}
                </form>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <h1 className="text-2xl">Select a user to chat</h1>
            </div>
          )}
        </div>
      }
    </>
  );
}
