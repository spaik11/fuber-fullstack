import { TOGGLE_SWITCHER } from "../constants/darkModeConstants";

export const toggleDarkMode = () => (dispatch) => {
  dispatch({
    type: TOGGLE_SWITCHER,
  });
};
