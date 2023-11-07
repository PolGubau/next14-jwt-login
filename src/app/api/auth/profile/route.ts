import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import Error from "next/error";
export async function GET(request: NextRequest) {
  const authCookie = cookies().get("token")?.value;

  if (!authCookie) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }
  try {
    const verification = verify(authCookie, process.env.AUTH_SECRET as string);

    return new Response(JSON.stringify(verification), {
      status: 200,
      statusText: "Authorized",
    });
  } catch (error: any) {
    const data = {
      ok: false,
      error: error.message,
    };

    return new Response(JSON.stringify(data), {
      status: 401,
      statusText: "Unauthorized",
    });
  }
}
