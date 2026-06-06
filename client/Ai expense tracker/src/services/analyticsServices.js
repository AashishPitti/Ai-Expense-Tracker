import axios from "axios";

const API = "http://localhost:5000/api/analytics";

axios.defaults.withCredentials = true;

export const getAnalytics = () => axios.get(API);
