import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import SessionProvider from "~/components/Auth/SessionProvider"
import { getServerSession } from "next-auth";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession();

    return (
        <html lang="en">
            <body>
                <SessionProvider session={session}>
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}