 import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("authtoken");
    console.log(token)
    if (!token) {
      window.location.href = "/login";
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

