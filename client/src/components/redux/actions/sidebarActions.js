import { VISIBILITY, SIDEBAR_CLOSE, SIDEBAR_OPEN } from "../constants/sidebarConstants";


export const sidebarSwitch = () => dispatch =>{
   dispatch({
      type: VISIBILITY
   })
}

export const sidebarClose = () => dispatch =>{
   dispatch({
      type: SIDEBAR_CLOSE
   })
}

export const sidebarOpen = () => dispatch =>{
   dispatch({
      type: SIDEBAR_OPEN
   })
}