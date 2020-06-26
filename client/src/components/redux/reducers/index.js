import { combineReducers } from 'redux'
import directionsReducers from './directionsReducer'


export default combineReducers({
   directions: directionsReducers,
})