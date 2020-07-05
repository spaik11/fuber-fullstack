import { combineReducers } from "redux";
import directionsReducer from "./directionsReducer";
import sidebarReducer from "./sidebarReducer";
import authUserReducer from "./authUserReducer";
import darkModeReducer from "./darkModeReducer";

export default combineReducers({
  authUser: authUserReducer,
  directions: directionsReducer,
  sidebar: sidebarReducer,
  isDarkMode: darkModeReducer,
});
