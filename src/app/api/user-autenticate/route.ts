import { NextRequest, NextResponse } from "next/server";

type userData = {
  name: string;
  email: string;
};

export async function GET() {
  try {
    const reposne = await fetch("https://jsonplaceholder.typicode.com/users/3");
    const data: userData = await reposne.json();
    return NextResponse.json(data);
  } catch (err) {
    return null;
  }
}
