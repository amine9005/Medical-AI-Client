import api, { PATHS } from "@/Utils/api";
import type { AIDoctorAgent } from "@/Utils/Types";
import { useAuth } from "@clerk/clerk-react";
import { ArrowRight, Loader2, Plus, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SuggestedAgentCard from "./SuggestedAgentCard";
import { useNavigate } from "react-router";
import { AIDoctorAgents } from "@/assets/list";

const AddNewSessionModal = () => {
  const modal = useRef<HTMLDialogElement>(null);

  const openModal = () => modal.current?.showModal();
  const [details, setDetails] = useState<string>();
  const [suggestions, setSuggestions] = useState<AIDoctorAgent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<AIDoctorAgent>();
  const navigate = useNavigate();
  const { getToken, has } = useAuth();

  const [isAllowed, setIsAllowed] = useState(false);

  const silver = has && has({ plan: "silver" });

  const gold = has && has({ plan: "gold" });

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
          toast.error("Unable to load consultations");
          console.log(message);
        }
      } catch (error) {
        toast.error("Unable to load sessions try again");
        console.log(error);
      }
    };

    getData();
  }, [getToken, gold, silver]);

  const get_suggestions = async () => {
    if (!gold && !silver) {
      setSuggestions([AIDoctorAgents[0]]);
      return;
    }
    try {
      setLoading(true);
      const { success, message, data } = (
        await api.post(
          PATHS.GET_SUGGESTIONS,
          { prompt: details },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        )
      ).data;
      if (success) {
        setSuggestions(data);
      } else {
        console.log(message);
        toast.error("Unable to get suggestions try again");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const start_Consultation = async () => {
    try {
      setLoading(true);
      const { success, message, data } = (
        await api.post(
          PATHS.CREATE_SESSION,
          { notes: details, selectedDoctor },
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
  return (
    <div>
      <button
        onClick={() => openModal()}
        disabled={!isAllowed}
        className={`btn  mt-5 rounded-lg px-4 md:px-8 md:py-4 hover:scale-105 active:scale-95 transition-all hover:bg-white hover:text-black font-bold ${
          !isAllowed ? "bg-gray-200 text-gray-400" : "bg-black text-white"
        }`}
      >
        <Plus className="size-6 font-bold" />
        <span className="hidden md:block">Start a Consultation</span>
        <span className="md:hidden"> Add New </span>
      </button>
      <dialog id="my_modal_2" ref={modal} className="modal">
        <div className="modal-box  rounded-2xl">
          <h2 className="font-bold text-lg">Add Basic Details</h2>
          {suggestions.length === 0 ? (
            <>
              <p className="py-4">Add Symptoms or Any Other Details</p>
              <textarea
                rows={9}
                placeholder="Add details here..."
                className="textarea w-full"
                onChange={(e) => setDetails(e.target.value)}
              />
            </>
          ) : (
            <div className="mt-2">
              <h2>Select a Doctor Agent</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 mt-4">
                {suggestions.map((doctor, index) => (
                  <SuggestedAgentCard
                    key={index}
                    doctorAgent={doctor}
                    setSelectedDoctor={() => setSelectedDoctor(doctor)}
                    currentSelection={selectedDoctor?.id || -1}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end items-center mt-4 gap-2">
            <form method="dialog">
              <button className="btn btn-outline px-6 bg-white text-black rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-300">
                Cancel
              </button>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <XIcon />
              </button>
            </form>

            {suggestions.length > 0 ? (
              <button
                disabled={loading || !selectedDoctor}
                onClick={() => start_Consultation()}
                className={`btn px-4 ${
                  loading || !selectedDoctor ? " bg-gray-300" : "bg-black"
                }  text-white rounded-lg hover:bg-gray-600 active:scale-95 transition-all duration-300`}
              >
                Start Consultation{" "}
                {loading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <ArrowRight className="size-5" />
                )}
              </button>
            ) : (
              <button
                disabled={!details || loading}
                onClick={() => get_suggestions()}
                className={`btn px-4 ${
                  loading || !details ? " bg-gray-300" : "bg-black"
                }  text-white rounded-lg hover:bg-gray-600 active:scale-95 transition-all duration-300`}
              >
                Next{" "}
                {loading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <ArrowRight className="size-5" />
                )}
              </button>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </div>
  );
};

export default AddNewSessionModal;
