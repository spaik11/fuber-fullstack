import Axios from "../lib/Axios/Axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { LOGIN_USER, LOGOUT_USER } from "../constants/authUserConstants";

export const createUser = (userInfo) => async (dispatch) => {
  try {
    let { data } = await Axios.post("/api/users/create-user", userInfo, {
      withCredentials: true,
    });

    dispatch({ type: LOGIN_USER, payload: data });

    return Promise.resolve();
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const loginUser = (userInfo) => async (dispatch) => {
  try {
    let { data } = await Axios.post("/api/users/login", userInfo, {
      withCredentials: true,
    });

    dispatch({ type: LOGIN_USER, payload: data });
    return Promise.resolve();
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  let foundCookie = Cookies.get("jwt-cookie-expense");

  if (foundCookie) {
    return foundCookie;
  } else {
    return false;
  }
};

export const setUserAuth = (jwtToken) => async (dispatch) => {
  let decodedToken = jwt_decode(jwtToken);

  dispatch({
    type: LOGIN_USER,
    payload: decodedToken,
  });
};

export const logout = () => async (dispatch) => {
  try {
    await Axios.get("/api/users/logout");
    Cookies.remove("jwt-cookie-expense");
    Cookies.remove("jwt-refresh-cookie-expense");

    dispatch({
      type: LOGOUT_USER,
    });
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const getRefreshToken = () => {
  if (typeof window == "undefined") return false;

  let foundCookie = Cookies.get("jwt-refresh-cookie-expense");

  if (foundCookie) {
    return foundCookie;
  } else {
    return false;
  }
};
