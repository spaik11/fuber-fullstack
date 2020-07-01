import { VISIBILITY, SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../constants/sidebarConstants";

const initialState = {
  visibility: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VISIBILITY:
      return {
        ...state,
        visibility: !state.visibility
      }
    case SIDEBAR_OPEN:
      return {
        ...state,
        visibility: true
      }
    case SIDEBAR_CLOSE:
      return {
        ...state,
        visibility: false
      }
    default:
      return state;
  }
}