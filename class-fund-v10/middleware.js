import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Cac route can dang nhap (client-side pages)
const PROTECTED = ["/dashboard", "/campaigns", "/expense", "/members", "/reports"];
// Chi admin moi vao duoc
const ADMIN_ONLY = ["/expense", "/members", "/reports"];

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Cho phep ledger va login va api va static
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") ||
      pathname.startsWith("/ledger") || pathname === "/login" || pathname === "/") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (ADMIN_ONLY.some(p => pathname.startsWith(p)) && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json|icon.svg).*)"]
};
