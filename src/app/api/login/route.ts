import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { toast } from "sonner";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

type userData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const checkData = schema.safeParse(data);
    if (!checkData.success) {
      return NextResponse.json(
        { error: true, message: "Email or password is invalid" },
        { status: 400 }
      );
    }
    const reponse = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkData.data),
    });

    const res = await reponse.json();

    return NextResponse.json(res, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    );
  }
}
