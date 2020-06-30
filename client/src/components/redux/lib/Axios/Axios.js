import axios from "axios";
import Cookies from "js-cookie";
import {
  getRefreshToken,
  makeOriginalCall,
} from "../helpers/RefreshTokenHelpers";

const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_HOST_ADDRESS
      : process.env.REACT_APP_API_HOST_ADDRESS,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (request) => {
    console.log("REQ ######");
    console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const request = error.config;
    if (
      error.response.status === 401 &&
      request.baseURL === process.env.REACT_APP_API_HOST_ADDRESS
    ) {
      try {
        let refreshToken = Cookies.get("jwt-refresh-cookie-expense");
        let success = await getRefreshToken(refreshToken);

        if (success.status === 200) {
          console.log("RES ######", request);
          let success = await makeOriginalCall(request);

          return success;
        }
      } catch (e) {
        console.log(e)
        return Promise.reject(error);
      }
    }
  return Promise.reject(error.response.data)
  }
);

export default Axios;
