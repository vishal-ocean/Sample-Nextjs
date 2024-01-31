import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export default withMiddlewareAuthRequired({
  returnTo(req) {
    const redirectTo = `${req.nextUrl.basePath}${req.nextUrl.pathname}`;
    return redirectTo;
  },
  middleware(req) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.nextUrl.pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
