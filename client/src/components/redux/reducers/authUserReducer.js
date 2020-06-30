import { LOGIN_USER, LOGOUT_USER } from "../constants/authUserConstants";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        isAuthenticated: true,
        user: { user: action.payload },
      };
    case LOGOUT_USER:
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
