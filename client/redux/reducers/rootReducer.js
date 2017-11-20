import { combineReducers } from 'redux'
import auth from './authReducers'
import users from './usersReducers'
import dogs from './dogsReducers'
import clients from './clientsReducers'

export default combineReducers({
  auth,
  users,
  dogs,
  clients
})
