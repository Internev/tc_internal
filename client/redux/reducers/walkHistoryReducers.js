import {
  WALK_HISTORY_FETCHING,
  WALK_HISTORY_POPULATE,
  WALK_HISTORY_ERROR
} from '../actions'

const DEFAULT_STATE = {
  all: [],
  current: {
    walks: [],
    comment: ''
  },
  isFetching: false,
  error: null,
  msg: ''
}

const isFetching = (state, action) => {
  const newState = {...state, ...{isFetching: true}}
  return newState
}

const populateWalkHistory = (state, action) => {
  const newState = {...state, ...{isFetching: false, all: action.all, current: action.current}}
  return newState
}

const walkHistoryError = (state, action) => {
  const newState = {...state, ...{isFetching: false, error: action.error, msg: action.msg}}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case WALK_HISTORY_FETCHING:
      return isFetching(state, action)
    case WALK_HISTORY_POPULATE:
      return populateWalkHistory(state, action)
    case WALK_HISTORY_ERROR:
      return walkHistoryError(state, action)
    default:
      return state
  }
}
