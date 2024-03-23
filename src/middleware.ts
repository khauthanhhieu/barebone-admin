import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { PublicPages } from "~/scripts/enums";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - images
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!images|_next/static|_next/image|favicon.ico).*)',
    ],
};

const isApiPathname = (pathname: string) => pathname.match(/\/api(?!\/auth\/).*/);

export default withAuth(
    async function middleware(req: NextRequestWithAuth) {
        if (isApiPathname(req.nextUrl.pathname)) {
            const token = await getToken({ req });
            if (!token) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (isApiPathname(req.nextUrl.pathname)) {
                    return true;
                }

                if (PublicPages.includes(req.nextUrl.pathname)) {
                    return true;
                }
                if (req.nextUrl.pathname.startsWith("/admin")) {
                    return token?.isAdmin === true;
                }
                return token != null;
            }
        }
    }
);
