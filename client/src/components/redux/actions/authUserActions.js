import Axios from "../lib/Axios/Axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import {
  LOGIN_USER,
  LOGOUT_USER,
  REQUEST_HELP_SWITCH,
  REQUEST_HELP_SENT,
  ADD_FRIEND,
  SET_SOCKET,
} from "../constants/authUserConstants";

export const createUser = (userInfo) => async (dispatch) => {
  try {
    let success = await Axios.post("/api/users/create-user", userInfo, {
      withCredentials: true,
    });

    dispatch({
      type: LOGIN_USER,
      payload: {
        ...success.data,
        requestHelp: userInfo.requestHelp,
        lat: userInfo.lat,
        lng: userInfo.lng,
      },
    });

    return Promise.resolve();
  } catch (e) {
    if (e.message) {
      return Promise.reject(e.message);
    } else {
      return Promise.reject(e.response.data.message);
    }
  }
};

export const loginUser = (userInfo) => async (dispatch) => {
  try {
    let success = await Axios.post("/api/users/login", userInfo, {
      withCredentials: true,
    });
    dispatch({
      type: LOGIN_USER,
      payload: {
        ...success.data,
        requestHelp: userInfo.requestHelp,
        lat: userInfo.lat,
        lng: userInfo.lng,
      },
    });

    return Promise.resolve();
  } catch (e) {
    console.log(e);
    if (e.message) {
      return Promise.reject(e.message);
    } else {
      return Promise.reject(e.response.data.message);
    }
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
  let decodedToken = await jwt_decode(jwtToken);

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
    localStorage.clear();

    dispatch({
      type: LOGOUT_USER,
    });
  } catch (e) {
    return Promise.reject(e);
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

export const requestHelpSwitch = (mode) => (dispatch) => {
  localStorage.setItem("requestHelpSwitch", mode);
  dispatch({
    type: REQUEST_HELP_SWITCH,
    payload: mode,
  });
};

export const requestHelpSent = (bool) => (dispatch) => {
  dispatch({
    type: REQUEST_HELP_SENT,
    payload: bool,
  });
};

export const loadFriends = (friends) => (dispatch) => {
  dispatch({
    type: ADD_FRIEND,
    payload: friends,
  });
};

export const setSocket = (socket) => (dispatch) => {
  dispatch({
    type: SET_SOCKET,
    payload: socket,
  });
};
