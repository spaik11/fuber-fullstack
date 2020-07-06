import { SET_ACTIVE_MARKER } from '../constants/activeMarkerConstants'

const initialState = {
  activeMarker: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_MARKER:
      return {
        ...state,
        activeMarker: action.payload
      }
    default:
      return state;
  }
}