import { NextResponse } from "next/server";
import { decodeJwt } from "jose";
import Cookies from "js-cookie";
export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  try {
    const decoded = decodeJwt(token);
    const { userId, role } = decoded;
    console.log(role);
    console.debug("auth midlleware");
  } catch (error) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Staff/:path*",
    "/Category/:path*",
    "/Reservation/:path*",
    "/Dashboard/:path*",
  ], // Adjust this to match your protected routes
};
