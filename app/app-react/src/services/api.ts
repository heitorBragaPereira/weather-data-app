import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.4.1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
