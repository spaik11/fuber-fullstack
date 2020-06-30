import {
  LOGIN_USER,
  LOGOUT_USER,
  REQUEST_HELP,
} from "../constants/authUserConstants";

const initialState = {
  isAuthenticated: false,
  user: null,
  requestHelp: null,
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
    case REQUEST_HELP:
      return {
        ...state,
        requestHelp: action.payload,
      };
    default:
      return state;
  }
}
