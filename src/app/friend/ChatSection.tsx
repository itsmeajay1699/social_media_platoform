"use client";
import { Button } from "@/components/ui/button";
import FriendsComponentCard from "../dashboard/components/FriendsComponents";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CloudFog } from "lucide-react";
import { set } from "zod";

type USER = {
  id: string;
  username: string;
  profile_photo: string;
};

type Message = {
  id: number;
  sender_id: number;
  chat_room_id: number;
  content: string;
  media: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  user_messages: USER;
};

export default function ChatSections({ data }: { data?: any }) {
  const [chatRoom, setChatRoom] = useState<Number | String | null>(null);
  const [currentSelectedUser, setCurrentSelectedUser] = useState<USER | null>(
    null
  );
  const [userId, setUserId] = useState<string | Number>("");
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);

  const [allChatRooms, setAllChatRooms] = useState<any>([]);

  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_API_PROD}`
    );
    const user_id = parseInt(localStorage.getItem("user") as string);
    setUserId(user_id);
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
      if (data.type === "message") {
        setMessages((messages) => [...messages, data.message]);

        setAllChatRooms((allChatRooms: any) => {
          const newChatRoom = allChatRooms.filter(
            (chatRoom: any) => chatRoom.id !== data?.newChatRoom?.id
          );

          return [...newChatRoom, data.newChatRoom];
        });

        // setRefresh((refresh) => !refresh);
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

  useEffect(() => {
    const getAllChatRooms = async () => {
      try {
        // console.log("hello");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/relation/all/chat_rooms`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    getAllChatRooms().then((data) => {
      setAllChatRooms(data.chatRooms);
    });
  }, []);

  useEffect(() => {
    const allChatRoomMessages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/chat/messages/${chatRoom}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            console.log(data.messages);
            setMessages(data.messages);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    allChatRoomMessages();
  }, [chatRoom]);

  const sendMessage = async () => {
    try {
      const data = {
        type: "message",
        chatRoom: chatRoom,
        message: message,
        sender: userId,
      };

      // socket.send(JSON.stringify(data));

      const sendMessage = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/chat/send-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
          cache: "no-store",
        }
      );

      if (sendMessage.status === 200) {
        const data = await sendMessage.json();
        console.log(data);
        if (data.error) {
          console.log(data.message);
        } else {
          console.log(data);
          setMessages([...messages, data.message]);
          setAllChatRooms((allChatRooms: any) => {
            const newChatRoom = allChatRooms.filter(
              (chatRoom: any) => chatRoom.id !== data?.newChatRoom?.id
            );

            return [...newChatRoom, data.newChatRoom];
          });
        }
      }

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // make the scroll bar go to the bottom
    const chatBox = document.getElementById("chatBox");
    // console.log(chatBox?.scrollHeight);

    chatBox?.scrollTo({
      top: chatBox.scrollHeight,
      behavior: "smooth",
    });
  }, [chatRoom]);

  // console.log(messages);

  // console.log(allChatRooms);
  // console.log(userId)

  return (
    <>
      {allChatRooms.length > 0 && (
        <div className="max-w-[400px] w-full  flex-grow">
          <div className="bg-primary text-secondary rounded-md p-2">
            <FriendsComponentCard
              userId={userId}
              setUser_id={setChatRoom}
              data={allChatRooms}
              setCurrentSelectedUser={setCurrentSelectedUser}
            />
          </div>
        </div>
      )}
      {
        <div className="flex flex-col gap-2 w-full flex-grow ">
          {chatRoom ? (
            <>
              <div className="w-full h-min-full  relative pb-4">
                <div
                  className="bg-primary text-secondary rounded-md p-2 flex flex-col chat-section"
                  // style={{ height: "100%" }}
                >
                  <div className="bg-primary text-secondary rounded-md p-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-secondary">
                          <Image
                            src={currentSelectedUser?.profile_photo!}
                            width={40}
                            height={40}
                            alt="avatar"
                            className="rounded-full h-[40px] w-[40px]"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-lg font-bold">
                            {currentSelectedUser?.username}
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
                  {/* chat box here */}
                  {/* give this to the full avaible height */}
                  <div
                    id="chatBox"
                    className="mt-2 p-4 pb-[3rem]
                    flex-grow
                    overflow-hidden overflow-y-auto relative  "
                  >
                    {messages.length > 0 ? (
                      messages?.map((message) => {
                        return (
                          <div
                            key={message.id}
                            className={`flex flex-col gap-2 ${
                              message.sender_id === userId
                                ? "items-end"
                                : "items-start"
                            }`}
                          >
                            <div
                              className={`flex flex-col gap-2 w-full ${
                                message?.sender_id === userId
                                  ? "items-end"
                                  : "items-start"
                              }`}
                            >
                              <div
                                className={`md:w-1/2 w-full mb-4 border rounded-md p-2 ${
                                  message?.sender_id === userId
                                    ? "items-end"
                                    : "items-start"
                                }`}
                              >
                                <div className="flex gap-2 relative">
                                  <div
                                    className={`w-10 h-10 rounded-full ${
                                      message.sender_id === userId
                                        ? "bg-secondary"
                                        : "bg-primary"
                                    }`}
                                  >
                                    <Image
                                      src={
                                        message?.user_messages?.profile_photo
                                      }
                                      width={40}
                                      height={40}
                                      alt="avatar"
                                      className="rounded-full h-[40px] w-[40px]"
                                    />
                                  </div>
                                  <div
                                    className={`flex flex-col flex-1 relative`}
                                  >
                                    <p
                                      className={`text-sm ${
                                        message?.sender_id === userId
                                          ? "text-secondary"
                                          : "text-secondary"
                                      }`}
                                    >
                                      {message?.user_messages?.username}
                                    </p>
                                    <div
                                      className={`flex items-center gap-2 ${
                                        message?.sender_id === userId
                                          ? "items-end"
                                          : "text-secondary"
                                      }`}
                                    >
                                      <p
                                        className={`text-sm ${
                                          message?.sender_id === userId
                                            ? "text-secondary"
                                            : "text-secondary"
                                        }`}
                                      >
                                        {message?.content}
                                      </p>
                                      <p
                                        className={`text-xs absolute right-0 top-[5px] ${
                                          message?.sender_id === userId
                                            ? "text-secondary"
                                            : "text-secondary"
                                        }`}
                                      >
                                        {message?.createdAt}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex justify-center items-center">
                        <h1 className="text-2xl">
                          Start a conversation with{" "}
                          {currentSelectedUser?.username}
                        </h1>
                      </div>
                    )}
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
