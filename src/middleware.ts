import { withAuth } from "next-auth/middleware";
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

export default withAuth(
    function middleware(_) { },
    {
        callbacks: {
            authorized: ({ req, token }) => {
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
