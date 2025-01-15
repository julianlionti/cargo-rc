import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
