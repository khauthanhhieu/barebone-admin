import ECommerce from "~/components/Dashboard/E-commerce";
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
