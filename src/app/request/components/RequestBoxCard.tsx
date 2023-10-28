"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { toast } from "sonner";

export default function RequestBoxCard({
  id,
  username,
  status,
  profile_photo,
  sent,
  friend = false,
}: {
  id: number;
  username: string;
  status: number;
  profile_photo: string;
  sent: boolean;
  friend?: boolean;
}) {
  const router = useRouter();
  const acceptRequest = async (
    id: number,
    prevstatus: number,
    status: number
  ) => {
    if (prevstatus !== 0) return toast.error("You can't accept this request");
    try {
      const res = await fetch(`http://localhost:3000/api/request`, {
        method: "PATCH",
        body: JSON.stringify({
          status,
          id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();

        if (data.error) {
          return toast.error(data.message);
        } else {
          toast.success(data.message);
          router.refresh();
          return;
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong try again later");
    }
  };

  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={profile_photo} alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{username}</p>
        {/* <p className="text-sm text-muted-foreground">olivia.martin@email.com</p> */}
      </div>
      {!friend && (
        <>
          {!sent ? (
            <>
              <div className="ml-auto font-medium">
                <Select
                  onValueChange={(value) => {
                    if (value === "accepted") acceptRequest(id, status, 1);
                    else if (value === "rejected") acceptRequest(id, status, 2);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <Button
              onClick={() => acceptRequest(id, status, 2)}
              className="ml-auto"
            >
              Cancel
            </Button>
          )}
        </>
      )}
    </div>
  );
}
