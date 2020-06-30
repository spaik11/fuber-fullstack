import { VISIBILITY } from "../constants/sidebarConstants";

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
    default:
      return state;
  }
}