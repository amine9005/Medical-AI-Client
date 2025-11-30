import type { AIDoctorAgents } from "@/assets/list";
import { ArrowRight } from "lucide-react";
import React from "react";

type props = {
  doctorAgent: (typeof AIDoctorAgents)[0];
};
const DoctorAgentCard = ({ doctorAgent }: props) => {
  return (
    <div>
      <img
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className="w-full h-[250px] md:h-[250px]  rounded-2xl bg-linear-to-r from-gray-400 via-gray-300 to-gray-400"
      />
      <h2 className="text-lg font-bold mt-1">{doctorAgent.specialist}</h2>
      <p className="line-clamp-2 mt-1">{doctorAgent.description}</p>
      <button className="btn w-full mt-1 bg-black text-white rounded-lg hover:bg-white hover:text-black active:scale-95 transition-all duration-300">
        Start Consultation
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
};

export default DoctorAgentCard;
