import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("token")?.value ?? "";

  if (!jwt.length) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.AUTH_SECRET)
    );

    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*"],
};
