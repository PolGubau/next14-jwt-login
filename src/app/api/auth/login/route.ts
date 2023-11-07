import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // check if the credentials are valid

  // check if email is already registered

  // check if password is correct

  // create a token

  // let's fake the api response

  if (email == "pol@gmail.com" && password == "a") {
    const token = jwt.sign(
      {
        email: "pol@gmail.com",
        username: "pol",
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
      },
      process.env.AUTH_SECRET as string
    );

    cookies().set({
      name: "token",
      value: token,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });

    const data = {
      ok: true,
      message: "Logged in",
    };
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Set-Cookie": `token=${token}` },
    });
  } else {
    const data = {
      ok: false,
      error: "Invalid credentials",
    };
    return new Response(JSON.stringify(data), {
      status: 400,
    });
  }
}
