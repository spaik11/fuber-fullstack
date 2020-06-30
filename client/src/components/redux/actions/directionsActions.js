import {
  DIRECTIONS,
  USER_LOCATION,
  ACTIVE_MARKER,
  CANCEL_HELP,
} from "../constants/directionConstants";

export const getDirections = (directions) => (dispatch) => {
  dispatch({
    type: DIRECTIONS,
    payload: directions,
  });
};

export const getUserLocation = (coordinates) => (dispatch) => {
  dispatch({
    type: USER_LOCATION,
    payload: coordinates,
  });
};

export const getActiveMarker = (marker) => (dispatch) => {
  dispatch({
    type: ACTIVE_MARKER,
    payload: marker,
  });
};

export const cancelHelp = () => (dispatch) => {
  dispatch({
    type: CANCEL_HELP,
  });
};
