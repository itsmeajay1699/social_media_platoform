"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function LogoutButton({ logout }: { logout: () => void }) {
  return (
    <Button
      onClick={async () => {
        const data = await logout();
        if (data === null) {
          return toast.error("Something went wrong");
        }
      }}
      variant="ghost"
      className="w-full justify-start"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="mr-2 h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Logout
    </Button>
  );
}
