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
import axios from 'axios'

export function saveAssigned (walker, clients) {
  return dispatch => {
    dispatch(saveAssignedRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    axios.post('/api/assign', {walker, clients}, config)
      .then(res => {
        console.log('response from api/assign:', res)
        dispatch(saveAssignedSuccess())
      })
      .catch(err => {
        console.log('err from api/assign:', err)
        dispatch(saveAssignedFailure(err))
      })
  }
}

function saveAssignedRequest () {
  return {
    type: SAVE_ASSIGNED_REQUEST
  }
}

function saveAssignedSuccess () {
  return {
    type: SAVE_ASSIGNED_SUCCESS
  }
}

function saveAssignedFailure (err) {
  return {
    type: SAVE_ASSIGNED_FAILURE,
    err
  }
}

export function clearAssigned () {
  return {
    type: CLEAR_ASSIGNED
  }
}

export function assignWalker (walker) {
  return {
    type: ASSIGN_WALKER,
    walker
  }
}

export function assignClient (client) {
  return {
    type: ASSIGN_CLIENT,
    client
  }
}

export function unassignWalker () {
  return {
    type: UNASSIGN_WALKER
  }
}

export function unassignClient (client) {
  return {
    type: UNASSIGN_CLIENT,
    client
  }
}
