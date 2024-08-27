// middleware.ts
import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  try {
    // Verify the token here if needed
    // If token is invalid, redirect to login
  } catch (error) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Staff/:path*",
    "/Reservation/:id*",
    "/Category/:path*",
    "/Dashboard/:path*",
  ], // Adjust this to match your protected routes
};
