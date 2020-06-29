import { combineReducers } from "redux";
import directionsReducers from "./directionsReducer";
import authUserReducer from "./authUserReducer";

export default combineReducers({
  directions: directionsReducers,
  authUser: authUserReducer,
});
