import {
  DIRECTIONS,
  USER_LOCATION,
  CANCEL_HELP,
  ACCEPT_REQUEST,
} from "../constants/directionConstants";

const initialState = {
  directions: null,
  estimate: {
    distance: {
      text: null,
    },
    duration: {
      text: null,
    },
    start_address: null,
    end_address: null,
    steps: [],
  },
  userLoc: {
    lat: null,
    lng: null,
  },
  friendLoc: {
    lat: null /*40.8525800*/,
    lng: null /*-74.1*/,
  },
  defaultLoc: {
    lat: 40.7128,
    lng: -74.006,
  },
  requestAccepted: false,
  sidebar: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DIRECTIONS:
      if (state.directions) {
        const place1 =
          state.directions.geocoded_waypoints[0].place_id ===
          action.payload.geocoded_waypoints[0].place_id;
        const place2 =
          state.directions.geocoded_waypoints[1].place_id ===
          action.payload.geocoded_waypoints[1].place_id;
        if (place1 === place2) return state;
      }
      return {
        ...state,
        estimate: action.payload.routes[0].legs[0],
        directions: action.payload,
      };
    case USER_LOCATION:
      return {
        ...state,
        userLoc: { ...action.payload },
      };
    case ACCEPT_REQUEST:
      return {
        ...state,
        friendLoc: action.payload,
        requestAccepted: true,
      };
    case CANCEL_HELP:
      const friendLocCopy = state.friendLoc;
      friendLocCopy.lat = null;
      friendLocCopy.lng = null;
      const estimateCopy = {
        distance: {
          text: null,
        },
        duration: {
          text: null,
        },
        start_address: null,
        end_address: null,
        steps: [],
      };
      return {
        ...state,
        friendLoc: friendLocCopy,
        directions: null,
        estimate: estimateCopy,
        requestAccepted: false,
      };
    default:
      return state;
  }
}
