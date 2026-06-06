import axios from "axios";

const API = "http://localhost:5000/api/ai";

axios.defaults.withCredentials = true;

export const getAIReport = () => axios.get(`${API}/report`);

export const getHistory = () => axios.get(`${API}/history`);
