"use client";
import Breadcrumb from "~/components/Admin/Breadcrumbs/Breadcrumb";
import { AreaChart, SimpleBar, SimpleDonut } from "~/components/Admin/Charts";

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />
      <div className="space-y-5">
        <SimpleBar />
        <AreaChart />
        <SimpleDonut />
      </div>
    </>
  );
};

export default Chart;
