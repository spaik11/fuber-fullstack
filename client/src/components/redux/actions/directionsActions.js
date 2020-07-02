import {
  DIRECTIONS,
  USER_LOCATION,
  CANCEL_HELP,
  ACCEPT_REQUEST
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

export const cancelHelp = () => (dispatch) => {
  dispatch({
    type: CANCEL_HELP,
  });
};

export const acceptRequest = (coords) => (dispatch) => {
  dispatch({
    type: ACCEPT_REQUEST,
    payload: coords
  })
}