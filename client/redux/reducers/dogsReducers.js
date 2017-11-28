import {
  SET_EDITABLE_DOG,
  GET_DOGS_REQUEST,
  GET_DOGS_SUCCESS,
  GET_DOGS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
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
  const newState = {...state, ...{isFetching: false, list: [], editing: {}, error: action.err, msg: 'Failed to retrieve assigned dogs. Please check login and try again.'}}
  return newState
}

const addCommentRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true}}
  return newState
}

const addCommentSuccess = (state, action) => {
  const newEditing = {...state.editing, ...{comments: action.dog.comments}}
  // newEditing.comments = action.dog.comments
  const newState = {...state, ...{isFetching: false, editing: newEditing}}
  return newState
}

const addCommentFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, error: action.err, msg: `Couldn't add comment, check your internet connection and try again.`}}
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
    case ADD_COMMENT_REQUEST:
      return addCommentRequest(state, action)
    case ADD_COMMENT_SUCCESS:
      return addCommentSuccess(state, action)
    case ADD_COMMENT_FAILURE:
      return addCommentFailure(state, action)
    default:
      return state
  }
}
