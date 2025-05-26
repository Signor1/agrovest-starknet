import FarmInvestmentD from "@/components/dashboard/details/FarmInvestmentD";
import React from "react";

const InvestmentDetails = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <FarmInvestmentD id={params.id} />
    </main>
  );
};

export default InvestmentDetails;
