import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../actions'
import axios from 'axios'

export function getUsers () {
  return dispatch => {
    dispatch(getUsersRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    return axios.get('/api/users', config)
      .then(res => {
        dispatch(getUsersSuccess(res.data))
      })
      .catch(err => {
        dispatch(getUsersFailure(err))
      })
  }
}

function getUsersRequest () {
  return {
    type: GET_USERS_REQUEST
  }
}

function getUsersSuccess (users) {
  return {
    type: GET_USERS_SUCCESS,
    users
  }
}

function getUsersFailure (err) {
  return {
    type: GET_USERS_FAILURE,
    err
  }
}

export function updateUser (user, update) {
  return dispatch => {
    dispatch(updateUserRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    return axios.post('/api/users', {user, update}, config)
      .then(res => {
        dispatch(updateUserSuccess(res.data))
      })
      .catch(err => {
        dispatch(updateUserFailure(err))
      })
  }
}

function updateUserRequest () {
  return {
    type: GET_USERS_REQUEST
  }
}

function updateUserSuccess (users) {
  return {
    type: GET_USERS_SUCCESS,
    users
  }
}

function updateUserFailure (err) {
  return {
    type: GET_USERS_FAILURE,
    err
  }
}
