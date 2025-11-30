import { Plus } from "lucide-react";
import { useState } from "react";
import AddNewSessionModal from "./AddNewSessionModal";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);
  return (
    <div className="mt-10">
      {historyList.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-7 border-2 border-dashed rounded-2xl">
          <img
            src="/medical-assistance.png"
            alt="Medical Assistant"
            className="w-[200px] h-[200px]"
          />
          <h2 className="font-bold text-xl mt-5">No Recent Consolations</h2>
          <p>It's looks like you haven't with an AI doctor yet</p>
          <AddNewSessionModal />
        </div>
      ) : (
        <div>List</div>
      )}
    </div>
  );
};

export default HistoryList;
