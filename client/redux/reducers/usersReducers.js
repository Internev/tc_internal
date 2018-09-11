import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from '../actions'

const DEFAULT_STATE = {
  users: [],
  isFetching: false,
  error: null
}

const getUsersRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true}}
  return newState
}

const getUsersSuccess = (state, action) => {
  const newState = {
    ...state,
    ...{
      isFetching: false,
      users: action.users
    }}
  return newState
}

const getUsersFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, error: action.err}}
  return newState
}

const updateUserRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true}}
  return newState
}

const updateUserSuccess = (state, action) => {
  const newState = {
    ...state,
    ...{
      isFetching: false,
      users: action.users
    }}
  return newState
}

const updateUserFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, error: action.err}}
  return newState
}

const deleteUserRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true}}
  return newState
}

const deleteUserSuccess = (state, action) => {
  const newState = {
    ...state,
    ...{
      isFetching: false,
      users: action.users
    }}
  return newState
}

const deleteUserFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, error: action.err}}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return getUsersRequest(state, action)
    case GET_USERS_SUCCESS:
      return getUsersSuccess(state, action)
    case GET_USERS_FAILURE:
      return getUsersFailure(state, action)
    case UPDATE_USER_REQUEST:
      return updateUserRequest(state, action)
    case UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action)
    case UPDATE_USER_FAILURE:
      return updateUserFailure(state, action)
    case DELETE_USER_REQUEST:
      return deleteUserRequest(state, action)
    case DELETE_USER_SUCCESS:
      return deleteUserSuccess(state, action)
    case DELETE_USER_FAILURE:
      return deleteUserFailure(state, action)
    default:
      return state
  }
}
