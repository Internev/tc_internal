import {
  SET_SCHEDULE_DATE,
  SCHEDULE_DOG,
  UNSCHEDULE_DOG,
  CLEAR_SCHEDULE_MSG,
  SAVE_SCHEDULED_REQUEST,
  SAVE_SCHEDULED_SUCCESS,
  SAVE_SCHEDULED_FAILURE,
  GET_SCHEDULED_REQUEST,
  GET_SCHEDULED_SUCCESS,
  GET_SCHEDULED_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE
} from '../actions'

const DEFAULT_STATE = {
  date: null,
  dogs: [],
  events: [],
  isFetching: false,
  error: '',
  msg: ''
}

const setScheduleDate = (state, action) => {
  const newState = {...state, ...{date: action.date}}
  return newState
}

const scheduleDog = (state, action) => {
  if (state.dogs.some(dog => dog.id === action.dog.id)) return state
  const newDogs = [...state.dogs]
  newDogs.push(action.dog)
  const newState = {...state, ...{dogs: newDogs}}
  return newState
}

const unscheduleDog = (state, action) => {
  const newDogs = state.dogs.filter(dog => dog.id !== action.id)
  const newState = {...state, ...{dogs: newDogs}}
  return newState
}

const clearMsg = (state, action) => {
  const newState = {...state, ...{msg: ''}}
  return newState
}

const saveScheduledRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true, error: ''}}
  return newState
}

const saveScheduledSuccess = (state, action) => {
  const newState = {...state, ...{isFetching: false, msg: 'Schedule saved!', error: ''}}
  return newState
}

const saveScheduledFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, msg: 'Failed to save schedule, check your connection and try again.', error: action.err}}
  return newState
}

const getScheduledRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true, error: '', dogs: []}}
  return newState
}

const getScheduledSuccess = (state, action) => {
  const newState = {...state, ...{isFetching: false, error: '', dogs: action.dogs}}
  return newState
}

const getScheduledFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, dogs: [], msg: 'Failed to retrieve the schedule, check your connection and try again.', error: action.err}}
  return newState
}

const getAllEventsRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true, error: ''}}
  return newState
}

const getAllEventsSuccess = (state, action) => {
  const newState = {...state, ...{isFetching: false, error: '', events: action.events}}
  return newState
}

const getAllEventsFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, events: [], msg: 'Failed to retrieve the schedule, check your connection and try again.', error: action.err}}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_SCHEDULE_DATE:
      return setScheduleDate(state, action)
    case SCHEDULE_DOG:
      return scheduleDog(state, action)
    case UNSCHEDULE_DOG:
      return unscheduleDog(state, action)
    case CLEAR_SCHEDULE_MSG:
      return clearMsg(state, action)
    case SAVE_SCHEDULED_REQUEST:
      return saveScheduledRequest(state, action)
    case SAVE_SCHEDULED_SUCCESS:
      return saveScheduledSuccess(state, action)
    case SAVE_SCHEDULED_FAILURE:
      return saveScheduledFailure(state, action)
    case GET_SCHEDULED_REQUEST:
      return getScheduledRequest(state, action)
    case GET_SCHEDULED_SUCCESS:
      return getScheduledSuccess(state, action)
    case GET_SCHEDULED_FAILURE:
      return getScheduledFailure(state, action)
    case GET_ALL_EVENTS_REQUEST:
      return getAllEventsRequest(state, action)
    case GET_ALL_EVENTS_SUCCESS:
      return getAllEventsSuccess(state, action)
    case GET_ALL_EVENTS_FAILURE:
      return getAllEventsFailure(state, action)
    default:
      return state
  }
}
