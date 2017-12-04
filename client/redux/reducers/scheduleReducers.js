import {
  SET_SCHEDULE_DATE,
  SCHEDULE_DOG
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

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_SCHEDULE_DATE:
      return setScheduleDate(state, action)
    case SCHEDULE_DOG:
      return scheduleDog(state, action)
    default:
      return state
  }
}
