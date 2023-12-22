"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Api } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function DropDownMenu({
  className,
  post_id,
}: {
  post_id: number | undefined;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const deletePost = async (id: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await Api(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/post/${id}`,
        token as string,
        "DELETE"
      );
      if (res.error) toast.error(res.message);
      toast.success(res.message);
      router.refresh();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={` ${className}`} x-data="{ open: false }">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-primary hover:text-black cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              deletePost(post_id as number);
            }}
          >
            delete
          </DropdownMenuItem>
          {/* <DropdownMenuItem></DropdownMenuItem> */}
          {/* <DropdownMenuItem></DropdownMenuItem> */}
          {/* <DropdownMenuItem></DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
