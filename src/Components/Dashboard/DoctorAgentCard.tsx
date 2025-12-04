import api, { PATHS } from "@/Utils/api";
import type { AIDoctorAgent } from "@/Utils/Types";
import { useAuth } from "@clerk/clerk-react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type props = {
  doctorAgent: AIDoctorAgent;
};
const DoctorAgentCard = ({ doctorAgent }: props) => {
  const { has, getToken } = useAuth();
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const silver = has && has({ plan: "silver" });

  const gold = has && has({ plan: "gold" });
  const premium = gold || silver;

  useEffect(() => {
    const getData = async () => {
      try {
        const { success, message, data } = (
          await api.get(PATHS.GET_USER_SESSIONS, {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          })
        ).data;
        // console.log(data);
        // console.log(data.length);

        if (success) {
          if (data.length < 5) {
            setIsAllowed(true);
          } else if (gold && data.length < 35) {
            setIsAllowed(true);
          } else if (silver && data.length < 20) {
            setIsAllowed(true);
          }
        } else {
          toast.error(message);
          console.log(message);
        }
      } catch (error) {
        toast.error("Unable to load sessions");
        console.log(error);
      }
    };

    getData();
  }, [getToken, gold, silver]);

  const start_Consultation = async (selectedDoctor: AIDoctorAgent) => {
    try {
      setLoading(true);
      const { success, message, data } = (
        await api.post(
          PATHS.CREATE_SESSION,
          {
            notes: `AI ${selectedDoctor.specialist} consultation`,
            selectedDoctor,
          },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        )
      ).data;
      if (success) {
        toast.success(message);
        navigate(`/medical-agent/${data[0].sessionId}`);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // console.log("isAllowed", isAllowed);

  return (
    <div className="relative">
      {!premium && (
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
        onClick={() => start_Consultation(doctorAgent)}
        disabled={(!premium && doctorAgent.subscriptionRequired) || !isAllowed}
        className={`btn w-full mt-1 rounded-lg hover:bg-white hover:text-black active:scale-95 transition-all duration-300 ${
          (!premium && doctorAgent.subscriptionRequired) ||
          !isAllowed ||
          loading
            ? "bg-gray-200 text-gray-400"
            : "bg-black text-white"
        }`}
      >
        Start Consultation
        {!loading ? (
          <ArrowRight className="size-5" />
        ) : (
          <Loader2 className="animate-spin size-5" />
        )}
      </button>
    </div>
  );
};

export default DoctorAgentCard;
