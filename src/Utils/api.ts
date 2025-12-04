import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
export const PATHS = {
  CREATE_REPORT: `${BASE_URL}/ai/create-report`,
  GET_SUGGESTIONS: `${BASE_URL}/ai/suggestions`,
  CREATE_SESSION: `${BASE_URL}/session/create`,
  GET_SESSION: `${BASE_URL}/session/:id`,
  GET_USER_SESSIONS: `${BASE_URL}/session`,
  GET_CREDITS: `${BASE_URL}/user/credits`,
};
