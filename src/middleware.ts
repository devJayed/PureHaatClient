//Note: This middleware handles authentication and role-based access control for protected routes.
//its console.logs only work in vscode terminal

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  user: [/^\/protected\/user/],
  admin: [/^\/protected\/admin/],
  delivery: [/^\/protected\/delivery/],
};

// console.log("Middlewar is start working.....");
// console.log(
//   "roleBasedPrivateRoutes['admin']:",
//   roleBasedPrivateRoutes["admin"]
// );

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  // console.log("pathname:", { pathname });

  const userInfo = await getCurrentUser();
  // console.log("userInfo:", { userInfo });

  // Public routes
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    // console.log("roleBasedPrivateRoutes[userInfo?.role]:", { routes });
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/protected/:path*",
    // "/protected/admin",
    // "/protected/admin/:page",
    // "/protected/user",
    // "/protected/user/:page",
    // "/protected/delivery",
    // "/protected/delivery/:page",
  ],
};
