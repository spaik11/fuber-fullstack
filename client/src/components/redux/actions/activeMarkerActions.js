import { SET_ACTIVE_MARKER } from '../constants/activeMarkerConstants'

export const setActiveMarker = (markerInfo) => (dispatch) =>{
   console.log(markerInfo)
   dispatch({
      type: SET_ACTIVE_MARKER,
      payload: markerInfo
   })
}