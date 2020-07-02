import {
  LOGIN_USER,
  LOGOUT_USER,
  REQUEST_HELP,
  ADD_FRIEND,
} from "../constants/authUserConstants";

const initialState = {
  isAuthenticated: false,
  user: {
    username: null,
  },
  requestHelp: null,
  friends: null,
  optionsModal: true,
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
        user: { username: null },
      };
    case REQUEST_HELP:
      return {
        ...state,
        requestHelp: action.payload,
        optionsModal: false,
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
