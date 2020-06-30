import axios from "axios";
import Cookies from "js-cookie";

const refreshTokenAxios = axios.create({
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

export const getRefreshToken = async (refreshToken) => {
  try {
    let success = await refreshTokenAxios.get("/api/users/refresh-token", {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + refreshToken,
      },
    });
    if (success.status === 200) {
      return success.data;
    }
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const makeOriginalCall = async (request) => {
  let newToken = Cookies.get("jwt-cookie-expense");

  request.headers.Authorization = `Bearer ${newToken}`;
  try {
    let success = await refreshTokenAxios(request);
    return success;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};
