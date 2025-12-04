import { PricingTable } from "@clerk/clerk-react";
import React from "react";

const Billing = () => {
  return (
    <div className="flex flex-col justify-center items-center px-8 md:px-16 mt-10">
      <h2 className="font-bold text-2xl mb-10">Choose your plan</h2>
      <PricingTable />
    </div>
  );
};

export default Billing;
