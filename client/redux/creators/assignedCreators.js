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
  CLEAR_ASSIGNED_MSG,
  SET_ASSIGN_DATE
} from '../actions'
import axios from 'axios'

export function setAssignDate (date) {
  return {
    type: SET_ASSIGN_DATE,
    date
  }
}

export function clearAssignedMsg () {
  return {
    type: CLEAR_ASSIGNED_MSG
  }
}

export function saveAssigned (walker, dogs, date) {
  return dispatch => {
    dispatch(saveAssignedRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    axios.post('/api/assign', {walker, dogs, date}, config)
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

export function assignWalker (walker, date) {
  return dispatch => {
    dispatch(assignWalkerRequest)
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'id': walker.id,
        'scheduledate': date
      }
    }
    axios.get('/api/assign', config)
      .then(res => {
        const dogs = res.data.dogs.map((dog, i) => {
          dog.client = res.data.clients[i]
          return dog
        })
        console.log('mapped response from api/assign get:', dogs)
        return dispatch(assignWalkerSuccess(walker, dogs))
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

function assignWalkerSuccess (walker, dogs) {
  return {
    type: ASSIGN_WALKER_SUCCESS,
    walker,
    dogs
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
    dog
  }
}
