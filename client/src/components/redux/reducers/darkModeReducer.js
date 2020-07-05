import { TOGGLE_SWITCHER } from "../constants/darkModeConstants";

const initialState = {
  isDarkMode: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCHER:
      let isDarkMode = !state.isDarkMode;
      localStorage.removeItem("darkMode");
      localStorage.setItem("darkMode", isDarkMode);
      return {
        ...state,
        isDarkMode,
      };
    default:
      return state;
  }
}
