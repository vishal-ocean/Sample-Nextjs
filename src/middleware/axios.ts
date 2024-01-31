import { logout } from "@/utils";
import axios from "axios";

// API url

const AXIOS = axios.create({
  baseURL: `${process.env["NEXT_PUBLIC_BACKEND_BASE_URL_DEV"]}`,
});

//set authorization headers for all requests
AXIOS.defaults.headers.common["Accept"] = "application/json";
AXIOS.defaults.headers.common["Content-Type"] = "application/json";
// Add a response interceptor
AXIOS.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 401) {
      logout();
      return Promise.reject(error.response);
    }
    return Promise.reject(error.response);
  }
);

export default AXIOS;
