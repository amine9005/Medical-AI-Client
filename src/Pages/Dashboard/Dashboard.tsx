import DoctorAgentsList from "@/Components/Dashboard/DoctorAgentsList";
import HistoryList from "@/Components/Dashboard/HistoryList";
import { HeartPlusIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="px-4 xl:px-12 py-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">My Dashboard</h2>
        <button className="btn btn-primary md:btn-lg px-2 md:px-8 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-linear-to-r hover:from-indigo-500 hover:to-indigo-400 bg-linear-to-r from-indigo-600 to-indigo-400 gap-4">
          <HeartPlusIcon className="size-6" />
          Consult with AI Doctor
        </button>
      </div>
      <HistoryList />
      <DoctorAgentsList />
    </div>
  );
};

export default Dashboard;
