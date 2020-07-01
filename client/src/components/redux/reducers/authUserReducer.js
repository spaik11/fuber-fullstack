import {
  LOGIN_USER,
  LOGOUT_USER,
  REQUEST_HELP,
  ADD_FRIEND,
} from "../constants/authUserConstants";

const initialState = {
  isAuthenticated: false,
  user: null,
  requestHelp: null,
  friends: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
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
    case ADD_FRIEND:
      return {
        ...state,
        friends: action.payload,
      };
    default:
      return state;
  }
}
