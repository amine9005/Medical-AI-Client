import React from "react";
import { AIDoctorAgents } from "@/assets/list";
import DoctorAgentCard from "./DoctorAgentCard";

const DoctorAgentsList = () => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-center">
        AI Specialists Doctor Agents
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-5 p-4">
        {AIDoctorAgents.map((agent, index) => (
          <div key={index}>
            <DoctorAgentCard doctorAgent={agent} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAgentsList;
