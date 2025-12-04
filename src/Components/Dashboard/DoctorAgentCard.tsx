import api, { PATHS } from "@/Utils/api";
import type { AIDoctorAgent } from "@/Utils/Types";
import { useAuth } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type props = {
  doctorAgent: AIDoctorAgent;
};
const DoctorAgentCard = ({ doctorAgent }: props) => {
  const { has, getToken } = useAuth();
  const [credits, setCredits] = useState(0);

  const isPremium = has && has({ plan: "premium" });

  useEffect(() => {
    const getCredits = async () => {
      const { success, message, credits } = (
        await api.get(PATHS.GET_CREDITS, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
      ).data;

      if (success) {
        console.log(credits);
        setCredits(credits);
      } else {
        toast.error(message);
      }
    };
    getCredits();
  }, [getToken]);

  return (
    <div className="relative">
      {!isPremium && (
        <>
          {doctorAgent.subscriptionRequired ? (
            <div className="badge bg-linear-to-r from-yellow-600  to-yellow-300 absolute m-2 right-2">
              Premium
            </div>
          ) : (
            <div className="badge bg-linear-to-r from-green-600  to-green-300 absolute m-2 right-2">
              Free
            </div>
          )}{" "}
        </>
      )}

      <img
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className="w-full h-[250px]  rounded-2xl bg-linear-to-r from-gray-400 via-gray-300 to-gray-400"
      />
      <h2 className="text-lg font-bold mt-1">{doctorAgent.specialist}</h2>
      <p className="line-clamp-2 mt-1">{doctorAgent.description}</p>
      <button
        disabled={
          (!isPremium && doctorAgent.subscriptionRequired) || credits < 10
        }
        className={`btn w-full mt-1 rounded-lg hover:bg-white hover:text-black active:scale-95 transition-all duration-300 ${
          !isPremium && doctorAgent.subscriptionRequired
            ? "bg-gray-200 text-gray-400"
            : "bg-black text-white"
        }`}
      >
        Start Consultation
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
};

export default DoctorAgentCard;
