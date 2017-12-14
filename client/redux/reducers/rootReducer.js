import { combineReducers } from 'redux'
import auth from './authReducers'
import users from './usersReducers'
import dogs from './dogsReducers'
import clients from './clientsReducers'
import assigned from './assignedReducers'
import schedule from './scheduleReducers'
import walkHistory from './walkHistoryReducers'

export default combineReducers({
  auth,
  users,
  dogs,
  clients,
  assigned,
  schedule,
  walkHistory
})
