import {
  LOGIN_USER,
  LOGOUT_USER,
  REQUEST_HELP,
  ADD_FRIEND,
} from "../constants/authUserConstants";

const initialState = {
  isAuthenticated: false,
  user: {
    username: null
  },
  requestHelp: null,
<<<<<<< HEAD
  friends: null,
=======
  optionsModal: true
>>>>>>> niko-branch
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
<<<<<<< HEAD
        user: action.payload,
=======
        user: {...action.payload},
>>>>>>> niko-branch
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
    case ADD_FRIEND:
      return {
        ...state,
        friends: action.payload,
      };
    default:
      return state;
  }
}
