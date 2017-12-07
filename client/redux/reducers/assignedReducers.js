import {
  CLEAR_ASSIGNED,
  ASSIGN_WALKER_SUCCESS,
  ASSIGN_WALKER_FAILURE,
  ASSIGN_WALKER_REQUEST,
  ASSIGN_CLIENT,
  UNASSIGN_WALKER,
  UNASSIGN_CLIENT,
  ASSIGN_DOG,
  UNASSIGN_DOG,
  SAVE_ASSIGNED_REQUEST,
  SAVE_ASSIGNED_SUCCESS,
  SAVE_ASSIGNED_FAILURE,
  CLEAR_ASSIGNED_MSG,
  SET_ASSIGN_DATE
} from '../actions'

const DEFAULT_STATE = {
  walker: {},
  clients: [],
  dogs: [],
  date: null,
  error: '',
  msg: '',
  isFetching: false
}

const assignWalkerSuccess = (state, action) => {
  const newState = {...state, ...{isFetching: false, walker: action.walker, dogs: action.dogs}}
  return newState
}

const assignWalkerFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, error: action.err, msg: 'Unable to contact database to check walker status. Try again in a bit!'}}
  return newState
}

const assignWalkerRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true}}
  return newState
}

const assignClient = (state, action) => {
  if (state.clients.some(client => client.email === action.client.email)) return state
  const newClients = [...state.clients]
  newClients.push(action.client)
  const newState = {...state, ...{clients: newClients}}
  return newState
}

const assignDog = (state, action) => {
  if (state.dogs.some(dog => dog.id === action.dog.id)) return state
  const newDogs = [...state.dogs]
  newDogs.push(action.dog)
  const newState = {...state, ...{dogs: newDogs}}
  return newState
}

const unassignWalker = (state, action) => {
  const newState = {...state, ...{walker: {}}}
  return newState
}

const unassignClient = (state, action) => {
  const newClients = state.clients.filter(client => client.email !== action.client.email)
  const newState = {...state, ...{clients: newClients}}
  return newState
}

const unassignDog = (state, action) => {
  const newDogs = state.dogs.filter(dog => dog.id !== action.dog.id)
  const newState = {...state, ...{dogs: newDogs}}
  return newState
}

const saveAssignedRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true, msg: ''}}
  return newState
}

const saveAssignedSuccess = (state, action) => {
  const newState = {...DEFAULT_STATE, ...{msg: 'Assignments saved.'}}
  return newState
}

const saveAssignedFailure = (state, action) => {
  const newState = {...state, ...{isFetching: false, msg: 'Failed to save assignments, please try again.', error: action.err}}
  return newState
}

const clearAssignedMsg = (state, action) => {
  const newState = {...state, ...{msg: ''}}
  return newState
}

const setAssignDate = (state, action) => {
  const newState = {...state, ...{date: action.date}}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CLEAR_ASSIGNED:
      return DEFAULT_STATE
    case ASSIGN_WALKER_SUCCESS:
      return assignWalkerSuccess(state, action)
    case ASSIGN_WALKER_FAILURE:
      return assignWalkerFailure(state, action)
    case ASSIGN_WALKER_REQUEST:
      return assignWalkerRequest(state, action)
    case ASSIGN_CLIENT:
      return assignClient(state, action)
    case ASSIGN_DOG:
      return assignDog(state, action)
    case UNASSIGN_WALKER:
      return unassignWalker(state, action)
    case UNASSIGN_CLIENT:
      return unassignClient(state, action)
    case UNASSIGN_DOG:
      return unassignDog(state, action)
    case SAVE_ASSIGNED_REQUEST:
      return saveAssignedRequest(state, action)
    case SAVE_ASSIGNED_SUCCESS:
      return saveAssignedSuccess(state, action)
    case SAVE_ASSIGNED_FAILURE:
      return saveAssignedFailure(state, action)
    case CLEAR_ASSIGNED_MSG:
      return clearAssignedMsg(state, action)
    case SET_ASSIGN_DATE:
      return setAssignDate(state, action)
    default:
      return state
  }
}
