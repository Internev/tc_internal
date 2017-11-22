import {
  SET_EDITABLE_DOG,
  GET_DOGS_REQUEST,
  GET_DOGS_SUCCESS,
  GET_DOGS_FAILURE
} from '../actions'

const DEFAULT_STATE = {
  list: [],
  editing: {},
  isFetching: false,
  msg: '',
  error: ''
}

const setEditableDog = (state, action) => {
  const newEditing = state.list.filter(dog => dog.id === action.id)
  const newState = {...state, ...{editing: newEditing[0]}}
  return newState
}

const getDogsRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true}}
  return newState
}

const getDogsSuccess = (state, action) => {
  const newState = {...state, ...{isFetching: false, list: action.list}}
  return newState
}

const getDogsFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, error: action.err, msg: 'Failed to retrieve assigned dogs. Please check login and try again.'}}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_EDITABLE_DOG:
      return setEditableDog(state, action)
    case GET_DOGS_REQUEST:
      return getDogsRequest(state, action)
    case GET_DOGS_SUCCESS:
      return getDogsSuccess(state, action)
    case GET_DOGS_FAILURE:
      return getDogsFailure(state, action)
    default:
      return state
  }
}
