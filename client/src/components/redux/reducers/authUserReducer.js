import {
  LOGIN_USER,
  LOGOUT_USER,
  REQUEST_HELP,
  ADD_FRIEND,
  SET_SOCKET
} from "../constants/authUserConstants";

const initialState = {
  isAuthenticated: false,
  user: {
    username: null,
  },
  requestHelp: null,
  friends: [],
  optionsModal: true,
  socket: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
    if(state.socket){
      state.socket.emit("initial-connect", {
        ...action.payload
      })
    }
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
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload
      }
    default:
      return state;
  }
}
