import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isConsultancyHost = (host: string) => host.startsWith("consultancy.");

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (isConsultancyHost(host) && !pathname.startsWith("/consultancy")) {
    const url = request.nextUrl.clone();
    url.pathname = `/consultancy${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
