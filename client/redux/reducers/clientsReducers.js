import {
  UPLOAD_CLIENTS_REQUEST,
  UPLOAD_CLIENTS_FAILURE,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_FAILURE,
  SET_ACTIVE_CLIENT,
  CLEAR_ACTIVE_CLIENT,
  UPDATE_ACTIVE_CLIENT
} from '../actions'

const DEFAULT_STATE = {
  isFetching: false,
  list: [],
  active: {},
  msg: '',
  error: ''
}

const uploadClientsRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true}}
  return newState
}

const uploadClientsFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, msg: 'Upload failure, try again.', error: action.err}}
  return newState
}

const getClientsSuccess = (state, action) => {
  const newState = {...state, ...{isFetching: false, list: action.list}}
  return newState
}

const getClientsRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true}}
  return newState
}

const getClientsFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, msg: 'Failed to retrieve client list.', error: action.err}}
  return newState
}

const setActiveClient = (state, action) => {
  const newState = {...state, ...{active: action.client}}
  return newState
}

const clearActiveClient = (state, action) => {
  const newState = {...state, ...{active: {}}}
  return newState
}

const updateActiveClient = (state, action) => {
  const newActive = {...state.active, ...action.update}
  const newState = {...state, ...{active: newActive}}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case UPLOAD_CLIENTS_REQUEST:
      return uploadClientsRequest(state, action)
    case UPLOAD_CLIENTS_FAILURE:
      return uploadClientsFailure(state, action)
    case GET_CLIENTS_SUCCESS:
      return getClientsSuccess(state, action)
    case GET_CLIENTS_REQUEST:
      return getClientsRequest(state, action)
    case GET_CLIENTS_FAILURE:
      return getClientsFailure(state, action)
    case SET_ACTIVE_CLIENT:
      return setActiveClient(state, action)
    case CLEAR_ACTIVE_CLIENT:
      return clearActiveClient(state, action)
    case UPDATE_ACTIVE_CLIENT:
      return updateActiveClient(state, action)
    default:
      return state
  }
}
