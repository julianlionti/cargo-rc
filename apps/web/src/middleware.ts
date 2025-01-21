import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export { default as nextAuth } from "next-auth/middleware";

const signinRouter = "/api/auth/signin";

// This function checks if the user is logged in and if the user is trying to access the admin page.
export async function middleware(req: NextRequest) {
  const session = req.cookies.get("next-auth.session-token"); // Cookie storing session

  // If no session exists, redirect to login page
  if (!session) {
    return NextResponse.redirect(new URL(signinRouter, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|public|_next/static|_next/image|static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|$).*)",
  ], // Apply middleware only to these routes
};
