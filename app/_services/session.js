import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function getSession() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token");
  const decoded = jwt.decode(token?.value);

  return decoded;
}

export async function authorizeAdmin(cookies) {
  try {
    const token = cookies.get("token");
    const decoded = jwt.verify(token?.value, process.env.JWT_SECRET);

    if (!token || !decoded?.admin) {
      return NextResponse.json(
        {
          data: null,
          error: { message: "Unauthorized." },
        },
        { status: 403 }
      );
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: { message: "Something went wrong." },
      },
      { status: 500 }
    );
  }
}
