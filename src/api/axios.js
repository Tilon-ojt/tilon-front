import axios from "axios";

const api = axios.create({
  baseURL: "http://172.16.5.51:8080",
  // baseURL:"http://localhost:8080",
});

export default api;
