import { AIDoctorAgents } from "@/assets/list";
import type { sessionDetails } from "@/Utils/Types";
import { CircleIcon, PhoneCall, PhoneOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Vapi from "@vapi-ai/web";
import type { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

const dummyData = {
  id: "123",
  sessionId: "123",
  notes: "123",
  report: { report: "123" },
  selectedDoctor: AIDoctorAgents[0],
  createdAt: "123",
};

type messagesType = {
  role: string;
  text: string;
};

const MedicalAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<sessionDetails | null>(
    dummyData
  );
  const [time, setTime] = useState(0);
  const [callStarted, setCallStarted] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<string | null>("assistant");
  const [liveTranscript, setLiveTranscript] = useState<string | null>("");
  const [messages, setMessages] = useState<messagesType[]>([]);
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);

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
    const createVapi = () => {
      const vapiInstance = new Vapi(apiKey);
      setVapiInstance(vapiInstance);

      vapiInstance.on("call-start", () => {
        console.log("Call started");
        setCallStarted(true);
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

    let intervalId = 0;
    if (callStarted) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
    return () => clearInterval(intervalId);
    // Event listeners
  }, [apiKey, callStarted, time]);

  const start_Call = async () => {
    if (vapiInstance) {
      vapiInstance.start(vapiAgentConfig);
    }
  };

  const end_Call = () => {
    if (vapiInstance) {
      vapiInstance.stop();
      setCallStarted(false);
      setCurrentRole(null);
    }
  };
  const minutes = Math.floor((time % 360000) / 6000);
  return (
    <div className="mt-5 px-4 xl:px-12 ">
      <div className="border rounded-3xl p-4 bg-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center ">
            <CircleIcon
              className={`size-4 ${
                callStarted
                  ? "fill-green-500 text-green-500"
                  : "fill-red-500 text-red-500"
              }`}
            />{" "}
            {callStarted ? "Connected..." : " Not Connected"}
          </h2>
          <h2 className="font-bold text-xl text-gray-400">
            {minutes.toString().padStart(2, "0")}:
            {time.toString().padStart(2, "0")}
          </h2>
        </div>
        {/* Session Details */}
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
                {liveTranscript && liveTranscript.length > 0 && (
                  <p className="text-center">
                    {currentRole}: {liveTranscript}{" "}
                  </p>
                )}
              </div>

              {!callStarted ? (
                <button
                  onClick={() => start_Call()}
                  className="btn mt-10 bg-black text-white rounded-lg hover:bg-white hover:text-black active:scale-95 transition-all duration-300"
                >
                  <PhoneCall /> Start Call
                </button>
              ) : (
                <button
                  onClick={() => end_Call()}
                  className="btn mt-10 bg-red-800 text-white rounded-lg hover:bg-red-600 hover:text-black active:scale-95 transition-all duration-300"
                >
                  <PhoneOffIcon /> End Call
                </button>
              )}
            </div>
          ) : (
            <>
              <h2 className="font-bold text-2xl">No Session Selected</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalAgent;
