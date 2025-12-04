import type { AIDoctorAgent } from "@/Utils/Types";
import React from "react";

type Props = {
  doctorAgent: AIDoctorAgent;
  setSelectedDoctor: React.Dispatch<React.SetStateAction<AIDoctorAgent>>;
  currentSelection: number;
};

const SuggestedAgentCard = ({
  doctorAgent,
  setSelectedDoctor,
  currentSelection,
}: Props) => {
  return (
    <div
      className={`flex flex-col justify-center items-center p-4 border rounded-2xl text-center shadow hover:border-blue-500 hover:bg-blue-50 cursor-pointer ${
        currentSelection === doctorAgent.id ? "border-blue-500 bg-blue-50" : ""
      }`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      <img
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        className="w-[50px] h-[50px] rounded-4xl"
      />
      <h2 className="font-bold text-sm">{doctorAgent.specialist}</h2>
      <p className="text-xs line-clamp-3">{doctorAgent.description}</p>
    </div>
  );
};

export default SuggestedAgentCard;
