import {
  CLEAR_ASSIGNED,
  ASSIGN_WALKER,
  ASSIGN_CLIENT,
  UNASSIGN_WALKER,
  UNASSIGN_CLIENT,
  SAVE_ASSIGNED_REQUEST,
  SAVE_ASSIGNED_SUCCESS,
  SAVE_ASSIGNED_FAILURE
} from '../actions'

const DEFAULT_STATE = {
  walker: {},
  clients: [],
  error: '',
  msg: '',
  isFetching: false
}

const assignWalker = (state, action) => {
  const newState = {...state, ...{walker: action.walker}}
  return newState
}

const assignClient = (state, action) => {
  if (state.clients.some(client => client.email === action.client.email)) return state
  const newClients = [...state.clients]
  newClients.push(action.client)
  const newState = {...state, ...{clients: newClients}}
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

const saveAssignedRequest = (state, action) => {
  const newState = {...state, ...{isFetching: true}}
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

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CLEAR_ASSIGNED:
      return DEFAULT_STATE
    case ASSIGN_WALKER:
      return assignWalker(state, action)
    case ASSIGN_CLIENT:
      return assignClient(state, action)
    case UNASSIGN_WALKER:
      return unassignWalker(state, action)
    case UNASSIGN_CLIENT:
      return unassignClient(state, action)
    case SAVE_ASSIGNED_REQUEST:
      return saveAssignedRequest(state, action)
    case SAVE_ASSIGNED_SUCCESS:
      return saveAssignedSuccess(state, action)
    case SAVE_ASSIGNED_FAILURE:
      return saveAssignedFailure(state, action)
    default:
      return state
  }
}
