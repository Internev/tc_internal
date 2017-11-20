import { combineReducers } from 'redux'
import auth from './authReducers'
import users from './usersReducers'
import dogs from './dogsReducers'
import clients from './clientsReducers'
import assigned from './assignedReducers'

export default combineReducers({
  auth,
  users,
  dogs,
  clients,
  assigned
})
