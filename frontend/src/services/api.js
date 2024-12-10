import axios from "axios";

const api = axios.create({
  baseURL: "https://http://localhost:3000/api",
});

export default api;
