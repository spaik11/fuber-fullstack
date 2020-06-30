import { combineReducers } from 'redux'
import directionsReducer from './directionsReducer'
import sidebarReducer from './sidebarReducer'


export default combineReducers({
   directions: directionsReducer,
   sidebar: sidebarReducer
})
