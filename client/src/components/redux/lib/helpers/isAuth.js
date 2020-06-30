import Cookies from "js-cookie";

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  let foundCookie = Cookies.get("jwt-cookie-expense");

  if (foundCookie) {
    return foundCookie;
  } else {
    return false;
  }
};
