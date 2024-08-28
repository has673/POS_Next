// middleware.ts

import { NextResponse } from "next/server";

import { Josefin_Sans } from "next/font/google";
import { decodeJwt } from "jose";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/slices/userslice";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  try {
    // Verify the token here if needed
    // If token is invalid, redirect to login
    const decoded = decodeJwt(token);
    const { userId, role } = decoded;
    // dispatch(setUserData(userId, role));
    console.log(userId);
    Cookies.set("userId", userId);
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
    "/Reservation/:path8",
    "/Dashboard/:path*",
  ], // Adjust this to match your protected routes
};
