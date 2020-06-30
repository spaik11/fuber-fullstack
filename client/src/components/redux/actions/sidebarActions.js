import { VISIBILITY } from "../constants/sidebarConstants";


export const sidebarSwitch = () => dispatch =>{
   dispatch({
      type: VISIBILITY
   })
}