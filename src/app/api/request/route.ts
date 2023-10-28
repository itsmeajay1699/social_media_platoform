import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const myCookie = cookies()?.get("token")?.value;
  const res = await fetch("http://localhost:8080/api/v1/relation/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myCookie}`,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
//   if (res.ok) {
//     redirect("/request");
//   }
 revalidatePath("/request");
  return NextResponse.json(json);
}
