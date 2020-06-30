import { DIRECTIONS, USER_LOCATION, ACTIVE_MARKER, CANCEL_HELP } from "../constants/directionsConstants";

const initialState = {
  directions: {
    geocoded_waypoints: null
  },
  estimate: {
    distance: {
      text: null
    },
    duration: {
      text: null
    },
    start_address: null,
    end_address: null,
    steps: []
  },
  userLoc: {
    lat: null,
    lng: null
    },
  friendLoc: {
    lat: null /*40.8525800*/,
    lng: null /*-74.1*/
  },
  defaultLoc: {
    lat: 40.7128,
    lng: -74.0060
  },
  requestAccepted: false,
  sidebar: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DIRECTIONS:
      return {
        ...state,
        estimate: action.payload.routes[0].legs[0],
        directions: action.payload
      }
    case USER_LOCATION: 
      return {
        ...state,
        userLoc: {...action.payload}
      }
    case ACTIVE_MARKER:
      return {
        ...state,
        friendLoc: action.payload,
        requestAccepted: true
      } 
    case CANCEL_HELP:
      const friendLocCopy = state.friendLoc
      friendLocCopy.lat = null
      friendLocCopy.lng = null
      const directionsCopy = {
        geocoded_waypoints: []
      }
      const estimateCopy = {
        distance: {
          text: null
        },
        duration: {
          text: null
        },
        start_address: null,
        end_address: null,
        steps: []
      }
      return {
        ...state,
        friendLoc: friendLocCopy,
        directions: directionsCopy,
        estimate: estimateCopy,
        requestAccepted: false
      }
    default:
      return state;
  }
}