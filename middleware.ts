import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname.startsWith("/ph")) {
    const hostname = url.pathname.startsWith("/ph/static/")
      ? "eu-assets.i.posthog.com"
      : "eu.i.posthog.com";
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("host", hostname);

    url.protocol = "https";
    url.hostname = hostname;
    url.port = "443";
    url.pathname = url.pathname.replace(/^\/ph/, "");

    requestHeaders.delete("cookie");

    return NextResponse.rewrite(url, {
      headers: requestHeaders,
    });
  }
}

export const config = {
  matcher: "/ph/:path*",
};
