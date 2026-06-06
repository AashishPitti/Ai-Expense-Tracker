import axios from "axios";

const API = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const registerUser = (data) => axios.post(`${API}/register`, data);

export const loginUser = (data) => axios.post(`${API}/login`, data);

export const getProfile = () => axios.get(`${API}/profile`);

export const logoutUser = () => axios.post(`${API}/logout`);
