import axios from "axios";

const API = "http://localhost:5000/api/expenses";

axios.defaults.withCredentials = true;

export const getExpenses = () => axios.get(API);

export const createExpense = (data) => axios.post(API, data);

export const updateExpense = (id, data) => axios.put(`${API}/${id}`, data);

export const deleteExpense = (id) => axios.delete(`${API}/${id}`);
