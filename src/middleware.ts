import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type loginUser = "/login" | "/signup";

export async function middleware(request: NextRequest) {
  // const checkUser = async () => {
  try {
    const myCookie = request.cookies.get("token")?.value;
    console.log(myCookie, "hello cookie")
    console.log(request.cookies, "hello world");

    if (!myCookie) {
      console.log("hello world");
      const currentPath: loginUser = request.nextUrl.pathname as loginUser;
      console.log(currentPath);
      if (currentPath === "/login" || currentPath === "/signup") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const currentPath: loginUser = request.nextUrl.pathname as loginUser;
    console.log(currentPath);
    if (currentPath === "/login" || currentPath === "/signup") {
      console.log(myCookie, "hello world");
      if (myCookie) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_PROD}/api/v1/auth/check`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myCookie}`,
        },
      }
    );

    // console.log(res);

    if (!res.ok) {
      // return NextResponse.redirect(new URL("/login", request.url));
      // Handle HTTP error responses
    }

    const data = await res.json();
    console.log(data);
    if (!data.error) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Error in checkUser:", error);
    return NextResponse.redirect(new URL("/login", request.url));
    throw error; // Rethrow the error to be caught later
  }
}

// checkUser();

// checkUser()
//   .then((data) => {
//     console.log(data);
//     if (data.error) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   })
//   .catch((error) => {
//     console.error("Middleware error:", error);
//     return NextResponse.redirect(new URL("/login", request.url));
//   });
// }

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard",
    "/request",
    "/friend",
    "/profile",
    "/login",
    "/signup",
  ],
};
