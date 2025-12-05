import { PricingTable } from "@clerk/clerk-react";

const Billing = () => {
  return (
    <div className="flex flex-col justify-center items-center px-8 md:px-16 mt-10">
      <h2 className="font-bold text-2xl mb-10">Chose Your Plan </h2>
      <PricingTable />
    </div>
  );
};

export default Billing;
