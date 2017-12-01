import {
  CLEAR_ASSIGNED,
  ASSIGN_WALKER_REQUEST,
  ASSIGN_WALKER_SUCCESS,
  ASSIGN_WALKER_FAILURE,
  ASSIGN_CLIENT,
  UNASSIGN_WALKER,
  UNASSIGN_CLIENT,
  ASSIGN_DOG,
  UNASSIGN_DOG,
  SAVE_ASSIGNED_REQUEST,
  SAVE_ASSIGNED_SUCCESS,
  SAVE_ASSIGNED_FAILURE,
  CLEAR_ASSIGNED_MSG
} from '../actions'
import axios from 'axios'

export function clearAssignedMsg () {
  return {
    type: CLEAR_ASSIGNED_MSG
  }
}

export function saveAssigned (walker, clients, dogs) {
  return dispatch => {
    dispatch(saveAssignedRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    axios.post('/api/assign', {walker, clients, dogs}, config)
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
  return dispatch => {
    dispatch(assignWalkerRequest)
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'id': walker.id
      }
    }
    axios.get('/api/assign', config)
      .then(res => {
        const clients = res.data.clients.map((client, i) => {
          client.dogs = res.data.dogs[i]
          return client
        })
        return dispatch(assignWalkerSuccess(walker, clients))
      })
      .catch(err => {
        return dispatch(assignWalkerFailure(err))
      })
  }
}

function assignWalkerRequest () {
  return {
    type: ASSIGN_WALKER_REQUEST
  }
}

function assignWalkerSuccess (walker, clients) {
  return {
    type: ASSIGN_WALKER_SUCCESS,
    walker,
    clients
  }
}

function assignWalkerFailure (err) {
  return {
    type: ASSIGN_WALKER_FAILURE,
    err
  }
}

export function unassignWalker () {
  return {
    type: UNASSIGN_WALKER
  }
}

export function assignClient (client) {
  return {
    type: ASSIGN_CLIENT,
    client
  }
}

export function unassignClient (client) {
  return {
    type: UNASSIGN_CLIENT,
    client
  }
}

export function assignDog (dog) {
  return {
    type: ASSIGN_DOG,
    dog
  }
}

export function unassignDog (dog) {
  return {
    type: UNASSIGN_DOG,
    client
  }
}
