import { NextResponse } from "next/server";
import { getSession } from "./app/_services/session";

export async function middleware(req) {
  const protectedRoutes = ["/quiz"];
  const currentPathName = req.nextUrl.pathname;
  const token = await getSession();

  if (protectedRoutes.includes(currentPathName) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (currentPathName.includes("/admin") && !token?.admin) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/quiz", "/admin"],
};
