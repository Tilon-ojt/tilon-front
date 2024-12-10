import axios from "axios";

const api = axios.create({
  //   baseURL: "http://172.16.5.51:8000",
  baseURL: "http://localhost:8000",
});

export default api;
