import { NextResponse } from "next/server";

export function middleware(req) {
  const protectedRoutes = ["/quiz"];
  const currentPathName = req.nextUrl.pathname;
  const session = req.cookies.get("token");

  if (protectedRoutes.includes(currentPathName) && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/quiz"],
};
