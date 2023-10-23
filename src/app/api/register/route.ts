import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
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
    const reponse = await fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
