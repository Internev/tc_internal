import {
  UPLOAD_CLIENTS_REQUEST,
  UPLOAD_CLIENTS_SUCCESS,
  UPLOAD_CLIENTS_FAILURE
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

const uploadClientsSuccess = (state, action) => {
  const newState = {...state, ...{isFetching: false, list: action.list}}
  return newState
}

const uploadClientsFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, msg: 'Upload failure, try again.', error: action.err}}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case UPLOAD_CLIENTS_REQUEST:
      return uploadClientsRequest(state, action)
    case UPLOAD_CLIENTS_SUCCESS:
      return uploadClientsSuccess(state, action)
    case UPLOAD_CLIENTS_FAILURE:
      return uploadClientsFailure(state, action)
    default:
      return state
  }
}
