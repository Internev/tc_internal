import {
  SET_SCHEDULE_DATE,
  SCHEDULE_DOG
} from '../actions'
import axios from 'axios'

export function setScheduleDate (date) {
  return {
    type: SET_SCHEDULE_DATE,
    date
  }
}

export function scheduleDog (dog) {
  return {
    type: SCHEDULE_DOG,
    dog
  }
}

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
