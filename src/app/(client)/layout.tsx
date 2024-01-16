import { Metadata } from "next";
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
            {children}
        </div>
    );
}
