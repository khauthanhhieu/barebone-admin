import "~/styles/admin/style.css";

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
