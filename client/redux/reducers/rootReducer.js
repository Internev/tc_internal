import { combineReducers } from 'redux'
import user from './userReducers'
import users from './usersReducers'
import dogs from './dogsReducers'

export default combineReducers({
  user,
  users,
  dogs
})
