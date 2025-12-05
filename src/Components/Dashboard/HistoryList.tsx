import { useEffect, useState } from "react";
import AddNewSessionModal from "./AddNewSessionModal";
import api, { PATHS } from "@/Utils/api";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import type { sessionDetails } from "@/Utils/Types";
import moment from "moment";
import ReportViewModal from "./ReportViewModal";
import { Link } from "react-router";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState<sessionDetails[]>([]);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { success, message, data } = (
          await api.get(PATHS.GET_USER_SESSIONS, {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          })
        ).data;
        // console.log(data);

        if (success) {
          setHistoryList(data.slice(0, 5));
        } else {
          toast.error(message);
          console.log(message);
        }
      } catch (error) {
        toast.error("Unable to load sessions");
        console.log(error);
      }
      setLoading(false);
    };

    getData();
  }, [getToken]);

  if (loading) {
    return (
      <div className="mt-10">
        <div className="flex flex-col justify-center items-center p-7 border-2 border-dashed rounded-2xl min-h-[300px]">
          <Loader2 className="animate-spin size-8" />
        </div>
      </div>
    );
  }

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
        <div className="flex flex-col justify-center items-center w-full ">
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-md">AI Medical Specialist </th>
                  <th className="text-md">Description </th>
                  <th className="text-md">Date</th>
                  <th className="text-md text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {historyList.map((session, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-linear-to-r hover:from-blue-400 hover:to-blue-300 ${
                      index % 2 === 0
                        ? "bg-linear-to-r from-blue-200 to-blue-50"
                        : ""
                    }`}
                  >
                    <td className="text-md font-bold">
                      {session.selectedDoctor.specialist}
                    </td>
                    <td className="line-clamp-2 text-md font-bold">
                      {session.notes}
                    </td>
                    <td className="text-md font-bold">
                      {moment(session.createdOn).fromNow()}
                    </td>
                    <td className="text-center text-md font-bold">
                      <ReportViewModal session={session} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="mt-10 font-bold text-md">
            This is a preview of the latest reports, view all of your reports at{" "}
            <Link
              className="link link-hover text-blue-600 text-md"
              to="/history"
            >
              {" "}
              History
            </Link>
          </h2>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
