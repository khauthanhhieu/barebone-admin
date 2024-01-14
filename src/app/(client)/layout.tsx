import { Metadata } from "next";
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
