import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const signinRouter = "/api/auth/signin";

// This function checks if the user is logged in and if the user is trying to access the admin page.
export async function middleware(req: NextRequest) {
  const session = req.cookies.get("next-auth.session-token"); // Cookie storing session

  // If no session exists, redirect to login page
  if (!session) {
    return NextResponse.redirect(new URL(signinRouter, req.url));
  }

  // Only allow access to routes under '/admin/*' and '/driver/*' for logged-in users
  if ((req.url.includes("/admin") || req.url.includes("/driver")) && !session) {
    return NextResponse.redirect(new URL(signinRouter, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/driver"], // Apply middleware only to these routes
};
