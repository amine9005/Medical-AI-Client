export type AIDoctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired: boolean;
};

export type sessionDetails = {
  id: string;
  sessionId: string;
  notes: string;
  report: object;
  selectedDoctor: AIDoctorAgent;
  createdAt: string;
};
