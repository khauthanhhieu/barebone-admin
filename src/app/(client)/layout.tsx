import { Metadata } from "next";
import Header from "~/components/Client/Header";
import "~/styles/client/style.css";

export const metadata: Metadata = {
    title: "barebone",
    description: "This is client web",
};

export default async function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
