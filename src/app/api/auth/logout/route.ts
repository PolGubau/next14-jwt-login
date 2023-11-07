import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
export async function POST(request: NextRequest) {
  const authCookie = cookies().get("token");

  if (!authCookie) {
    return new Response(null, {
      status: 401,
      statusText: "Not Logged In",
    });
  }

  try {
    verify(authCookie.value, process.env.AUTH_SECRET as string);
    // cookies().set({
    //   name: "token",
    //   value: "",
    //   maxAge: 0,
    //   httpOnly: true,
    //   path: "/",
    //   sameSite: "none",
    //   secure: process.env.NODE_ENV === "production",
    // });
    cookies().delete("token");

    const data = {
      ok: true,
      message: "Logged Out",
    };
    return new Response(JSON.stringify(data), {
      statusText: "Logged Out",
      status: 200,
      headers: { "Set-Cookie": `token=; Max-Age=0; Path=/; HttpOnly` },
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
