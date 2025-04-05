import { NextResponse } from "next/server";
import { getSession } from "./app/_services/session";
import { getRecommendation } from "./app/_services/platforms";

export async function middleware(req) {
  const protectedRoutes = ["/quiz", "/purchase", "/admin", "/recommendation"];
  const currentPathName = req.nextUrl.pathname;
  const session = await getSession();

  //Check if user is logged in, if not, redirect to login
  if (protectedRoutes.includes(currentPathName) && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //If user has already used their free trial (has a recommendation), we redirect them to /pricing and they cannot take another quiz unless they pay
  if (currentPathName.includes("/quiz") && session) {
    if (session.plan.name === "free") {
      const { recommendation, error } = await getRecommendation(session.id);
      if (recommendation || error) {
        return NextResponse.redirect(new URL("/pricing", req.url));
      }
    }
  }

  //If user goes to admin page, authorization set upon logging in is checked
  if (currentPathName.includes("/admin") && !session?.admin) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/quiz", "/admin", "/recommendation", "/purchase"],
};
