import axios from "axios";

// Base URL for your API
const BASE_URL = import.meta.env.VITE_API_URL; //"http://localhost:8080/api/v1";

const axiosNoAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "session-id": localStorage.getItem("session-id"),
  },
});

const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor to include the token in requests
axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //console.error("No response received:", error);
    if (error.response) {
      const response = error.response;
      console.log(response.status);
      if (response.status == 401) {
        //localStorage.removeItem("token");
        //window.location.href = "/login";
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosNoAuth, axiosAuth };
