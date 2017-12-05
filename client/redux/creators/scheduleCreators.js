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
  GET_SCHEDULED_FAILURE
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

export function unscheduleDog (id) {
  return {
    type: UNSCHEDULE_DOG,
    id
  }
}

export function clearMsg () {
  return {
    type: CLEAR_SCHEDULE_MSG
  }
}

export function getScheduled (date) {
  console.log('get scheduled for date:', date)
  return dispatch => {
    dispatch(getScheduledRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'scheduledate': date
      }
    }
    return axios.get('/api/assign/schedule', config)
      .then(res => {
        console.log('response from get /api/assign/schedule:', res)
        const dogs = res.data.dogs
        const clients = res.data.clients
        dogs.forEach((dog, i) => {
          dog.client = clients[i]
        })
        return dispatch(getScheduledSuccess(res.data.date, dogs))
      })
      .catch(err => {
        return dispatch(getScheduledFailure(err))
      })
  }
}

function getScheduledRequest () {
  return {
    type: GET_SCHEDULED_REQUEST
  }
}

function getScheduledSuccess (date, dogs) {
  return {
    type: GET_SCHEDULED_SUCCESS,
    date,
    dogs
  }
}

function getScheduledFailure (err) {
  return {
    type: GET_SCHEDULED_FAILURE,
    err
  }
}

export function saveScheduled (date, dogs) {
  return dispatch => {
    dispatch(saveScheduledRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    return axios.post('/api/assign/schedule', {date, dogs}, config)
      .then(res => {
        // console.log('response from post /api/assign/schedule:', res)
        return dispatch(saveScheduledSuccess(res.data.date, res.data.dogs))
      })
      .catch(err => {
        return dispatch(saveScheduledFailure(err))
      })
  }
}

function saveScheduledRequest () {
  return {
    type: SAVE_SCHEDULED_REQUEST
  }
}

function saveScheduledSuccess (date, dogs) {
  return {
    type: SAVE_SCHEDULED_SUCCESS,
    date,
    dogs
  }
}

function saveScheduledFailure (err) {
  return {
    type: SAVE_SCHEDULED_FAILURE,
    err
  }
}
