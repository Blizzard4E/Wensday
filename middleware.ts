import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useUserStore } from "./store";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname == "/") {
        return NextResponse.next();
    }
    let accessToken = request.cookies.get("accessToken");
    if (accessToken) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
}
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|login|about|contact|projects).*)",
    ],
};
