import Sidebar from "~/components/Admin/Sidebar/Sidebar";
import Header from "~/components/Admin/Header";
import "~/styles/admin/style.css";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <div className="dark:bg-black dark:text-bodydark">
                    <div className="flex h-screen overflow-hidden">
                        {/* <!-- ===== Sidebar Start ===== --> */}
                        <Sidebar />
                        {/* <!-- ===== Sidebar End ===== --> */}

                        {/* <!-- ===== Content Area Start ===== --> */}
                        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                            {/* <!-- ===== Header Start ===== --> */}
                            <Header />
                            {/* <!-- ===== Header End ===== --> */}

                            {/* <!-- ===== Main Content Start ===== --> */}
                            <main>
                                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                    {children}
                                </div>
                            </main>
                            {/* <!-- ===== Main Content End ===== --> */}
                        </div>
                        {/* <!-- ===== Content Area End ===== --> */}
                    </div>
                </div>
            </body>
        </html>
    );
}
