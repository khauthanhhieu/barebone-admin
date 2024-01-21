import Breadcrumb from "~/components/Admin/Breadcrumbs/Breadcrumb";
import TableOne from "~/components/Admin/Tables/TableOne";
import TableThree from "~/components/Admin/Tables/TableThree";
import TableTwo from "~/components/Admin/Tables/TableTwo";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default TablesPage;
