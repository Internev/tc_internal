import { combineReducers } from 'redux'
import user from './userReducers'
import users from './usersReducers'

export default combineReducers({
  user,
  users
})
