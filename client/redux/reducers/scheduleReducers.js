import {
  SET_SCHEDULE_DATE,
  SCHEDULE_DOG,
  UNSCHEDULE_DOG
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

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_SCHEDULE_DATE:
      return setScheduleDate(state, action)
    case SCHEDULE_DOG:
      return scheduleDog(state, action)
    case UNSCHEDULE_DOG:
      return unscheduleDog(state, action)
    default:
      return state
  }
}
