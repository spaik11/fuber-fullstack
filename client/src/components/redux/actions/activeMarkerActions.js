import { SET_ACTIVE_MARKER } from '../constants/activeMarkerConstants'

export const setActiveMarker = (markerInfo) => (dispatch) =>{
   dispatch({
      type: SET_ACTIVE_MARKER,
      payload: markerInfo
   })
}