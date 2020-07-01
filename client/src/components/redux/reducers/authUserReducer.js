import {
  LOGIN_USER,
  LOGOUT_USER,
  REQUEST_HELP,
} from "../constants/authUserConstants";

const initialState = {
  isAuthenticated: false,
  user: {
    username: null
  },
  requestHelp: null,
  optionsModal: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: {...action.payload},
      };
    case LOGOUT_USER:
      return {
        isAuthenticated: false,
        user: null,
      };
    case REQUEST_HELP:
    console.log('Payload: ',action.payload)
      return {
        ...state,
        requestHelp: action.payload,
        optionsModal: false
      };
    default:
      return state;
  }
}
