import type { sessionDetails } from "@/Utils/Types";
import {
  CircleIcon,
  Loader2,
  PhoneCall,
  PhoneOffIcon,
  SaveIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Vapi from "@vapi-ai/web";
import type { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import api, { PATHS } from "@/Utils/api";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

type messagesType = {
  role: string;
  text: string;
};

const MedicalAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<sessionDetails | null>(
    null
  );
  const [time, setTime] = useState(0);
  const [callStarted, setCallStarted] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<string | null>("assistant");
  const [liveTranscript, setLiveTranscript] = useState<string | null>("");
  const [messages, setMessages] = useState<messagesType[]>([]);
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [reportSaved, setReportSaved] = useState(true);
  const [callEnded, setCallEnded] = useState(false);
  // const [credits, setCredits] = useState(0);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const apiKey = import.meta.env.VITE_VAPI_API_KEY;
  //   const assistantId = import.meta.env.VITE_VAPI_VOICE_ASSISTANT_ID;

  const vapiAgentConfig: CreateAssistantDTO = {
    name: "AI Medical Doctor Voice Agent",
    firstMessage:
      "Hi there!, I am your AI Medical Assistant. I'm here to help you with any medical questions you may have. How can I help you today?",
    transcriber: {
      provider: "assembly-ai",
      language: "en",
    },
    voice: {
      provider: "playht",
      voiceId: sessionDetails?.selectedDoctor?.voiceId as string,
    },
    model: {
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: sessionDetails?.selectedDoctor?.agentPrompt as string,
        },
      ],
      provider: "google",
    },
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { success, message, data } = (
          await api.get(
            `${PATHS.GET_SESSION.replace(":id", sessionId as string)}`,
            {
              headers: {
                Authorization: `Bearer ${await getToken()}`,
              },
            }
          )
        ).data;
        // console.log(data);

        if (success) {
          setSessionDetails(data[0]);
        } else {
          toast.error(message);
          console.log(message);
        }
      } catch (error) {
        console.error("Error fetching session details:", error);
      }
      setLoading(false);
    };
    getData();
  }, [getToken, sessionId]);

  useEffect(() => {
    if (!callEnded) {
      return;
    }
    let intervalId = 0;
    if (callStarted) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [callStarted, time, callEnded]);

  useEffect(() => {
    const createVapi = () => {
      const vapiInstance = new Vapi(apiKey);
      setVapiInstance(vapiInstance);

      vapiInstance.on("call-start", () => {
        console.log("Call started");
      });
      vapiInstance.on("call-end", () => {
        console.log("Call ended");
        setCallStarted(false);
      });
      vapiInstance.on("message", (message) => {
        const { role, transcript, transcriptType } = message;
        if (message.type === "transcript") {
          console.log(`${message.role}: ${message.transcript}`);
        }
        if (transcriptType === "partial") {
          console.log("partial transcript", transcript);
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType === "final") {
          setMessages((prev) => [
            ...prev,
            {
              role: role,
              text: transcript,
            },
          ]);
          setCurrentRole(null);
        }
      });

      vapiInstance.on("speech-start", () => {
        console.log("AI Speech started");
        setButtonLoading(false);
        setCallStarted(true);
        setCurrentRole("assistant");
      });
      vapiInstance.on("speech-end", () => {
        console.log("AI Speech ended");
        setCurrentRole("user");
      });
      vapiInstance.on("error", (error) => {
        console.error("Vapi error:", error);
      });
      return () => {
        vapiInstance?.stop();
      };
    };
    createVapi();

    // Event listeners
  }, [apiKey]);

  const start_Call = async () => {
    if (vapiInstance) {
      vapiInstance.start(vapiAgentConfig);
      setButtonLoading(true);
    }
  };

  const end_Call = async () => {
    if (vapiInstance) {
      vapiInstance.stop();
      setCurrentRole(null);
      setTime(0);
      generate_report();
    }
  };
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.floor(time % 60);

  const generate_report = async () => {
    try {
      setButtonLoading(true);
      setCallStarted(true);
      setCallEnded(true);

      const { success, message, data } = (
        await api.post(
          PATHS.CREATE_REPORT,
          {
            sessionId: sessionId,
            messages: messages,
            sessionDetails: sessionDetails,
          },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        )
      ).data;

      // console.log("data: ", data);

      if (success) {
        setSessionDetails(data[0]);
        toast.success(message);
        setReportSaved(true);

        navigate("/dashboard");
      } else {
        toast.error("Unable to save report try again");
        setReportSaved(false);
      }
    } catch (error) {
      console.log(error);
      setReportSaved(false);
      toast.error("Unable to save report try again");
    }
    setButtonLoading(false);
    setCallStarted(false);
  };

  useEffect(() => {
    const limit_time = async () => {
      if (minutes === 5) {
        if (vapiInstance) {
          setTime(0);
          vapiInstance.stop();
          setCurrentRole(null);
          toast.success("Time limit reached");
          setCallEnded(true);

          try {
            setButtonLoading(true);
            setCallStarted(true);

            const { success, message, data } = (
              await api.post(
                PATHS.CREATE_REPORT,
                {
                  sessionId: sessionId,
                  messages: messages,
                  sessionDetails: sessionDetails,
                },
                {
                  headers: {
                    Authorization: `Bearer ${await getToken()}`,
                  },
                }
              )
            ).data;

            // console.log("data: ", data);

            if (success) {
              setSessionDetails(data[0]);
              toast.success(message);
              setReportSaved(true);
              navigate("/dashboard");
            } else {
              toast.error("Unable to save report try again");
              setReportSaved(false);
            }
          } catch (error) {
            console.log(error);
            setReportSaved(false);
            toast.error("Unable to save report try again");
          } finally {
            setButtonLoading(false);
            setCallStarted(false);
          }
        }
      }
    };
    limit_time();
  }, [
    getToken,
    messages,
    minutes,
    navigate,
    sessionDetails,
    sessionId,
    vapiInstance,
  ]);

  if (sessionDetails?.report) {
    navigate("/dashboard");
    return;
  }

  return (
    <div className="mt-5 px-4 xl:px-12 ">
      <div className="border rounded-3xl p-4 bg-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center ">
            <CircleIcon
              className={`size-4 ${
                callStarted && !callEnded
                  ? "fill-green-500 text-green-500"
                  : "fill-red-500 text-red-500"
              }`}
            />{" "}
            {callStarted ? "Connected..." : " Not Connected"}
          </h2>
          <h2 className="font-bold text-xl text-gray-400">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </h2>
        </div>
        {/* Session Details */}
        {loading ? (
          <div className="flex flex-col justify-center items-center min-h-[500px]">
            {" "}
            <Loader2 className="size-10 animate-spin" />
          </div>
        ) : (
          <div className="mt-10">
            {sessionDetails ? (
              <div className="flex flex-col items-center ">
                <img
                  src={sessionDetails.selectedDoctor.image}
                  alt={sessionDetails.selectedDoctor.specialist}
                  className="h-[100px] w-[100px] rounded-full"
                />
                <h2 className="font-bold text-lg mt-2">
                  {sessionDetails.selectedDoctor.specialist}
                </h2>
                <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

                <div className="mt-10 max-w-md xl:max-w-4xl overflow-y-auto max-h-[200px] p-2 flex flex-col items-center">
                  {messages?.map((message, index) => (
                    <p key={index} className="text-gray-600 text-center">
                      {message.role.toUpperCase()}:{" " + message.text}
                    </p>
                  ))}
                </div>
                {liveTranscript && liveTranscript.length > 0 && (
                  <p className="text-center">
                    {currentRole}: {liveTranscript}{" "}
                  </p>
                )}
                {reportSaved ? (
                  <>
                    {" "}
                    {!callStarted ? (
                      <button
                        disabled={buttonLoading}
                        onClick={() => start_Call()}
                        className={`btn mt-10 bg-black text-white rounded-lg hover:bg-white hover:text-black active:scale-95 transition-all duration-300 ${
                          buttonLoading ? "bg-gray-400" : ""
                        }`}
                      >
                        {!buttonLoading ? (
                          <>
                            <PhoneCall /> Start Call
                          </>
                        ) : (
                          <>
                            <Loader2 className="size-5 animate-spin" />{" "}
                            Calling...
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => end_Call()}
                        disabled={buttonLoading}
                        className={`btn mt-10  text-white rounded-lg hover:bg-red-600 hover:text-black active:scale-95 transition-all duration-300 ${
                          buttonLoading ? "bg-green-400" : "bg-red-800"
                        }`}
                      >
                        {!buttonLoading ? (
                          <>
                            <PhoneOffIcon /> End Call
                          </>
                        ) : (
                          <>
                            <Loader2 className="size-5 animate-spin" />{" "}
                            Generating Report...
                          </>
                        )}
                      </button>
                    )}{" "}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => generate_report()}
                      disabled={buttonLoading}
                      className={`btn mt-10  text-white rounded-lg hover:bg-green-600 hover:text-black active:scale-95 transition-all duration-300 ${
                        buttonLoading ? "bg-green-400" : "bg-green-800"
                      }`}
                    >
                      {!buttonLoading ? (
                        <>
                          <SaveIcon /> Save Report
                        </>
                      ) : (
                        <>
                          <Loader2 className="size-5 animate-spin" /> Saving...
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            ) : (
              <>
                <h2 className="font-bold text-2xl">
                  Failed to load session try again
                </h2>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalAgent;
