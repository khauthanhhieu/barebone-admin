import ECommerce from "~/components/Admin/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barebone Admin",
  description: "This is description",
};

export default function Home() {
  return (
    <>
      <ECommerce />
    </>
  );
}
