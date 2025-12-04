export type AIDoctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired: boolean;
};

export type report = {
  sessionId: string;
  agent: string;
  user: string;
  timestamp: string;
  chiefComplaint: string;
  summary: string;
  symptoms: string[];
  duration: string;
  severity: string;
  medicationsMentioned: string[];
  recommendations: string[];
};

export type sessionDetails = {
  id: string;
  sessionId: string;
  conversation: string[];
  notes: string;
  report: report;
  selectedDoctor: AIDoctorAgent;
  createdOn: Date;
};
