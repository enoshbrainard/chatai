import { NextResponse } from "next/server";

export async function middleware(request) {
  console.log("middleware is running");

  try {
    const cookie = request.headers.get("cookie"); // ✅ Correct way

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify`, {
      method: "GET",
      headers: {
        cookie: cookie || "", // ✅ forward cookies to backend
      },
    });

    if (!res.ok) {
      console.log("redirect to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (e) {
    console.log("❌ Invalid token");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/chat", "/chat/:path*"], // ✅ fixed `:path*` syntax
};
