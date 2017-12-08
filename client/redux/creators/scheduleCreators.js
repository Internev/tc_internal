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
  GET_SCHEDULED_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE
} from '../actions'
import axios from 'axios'
import moment from 'moment'

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

export function getAllEvents (startDate) {
  startDate = startDate || moment().subtract(2, 'weeks')
  return dispatch => {
    dispatch(getAllEventsRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'startdate': startDate
      }
    }
    return axios.get('/api/schedule/all', config)
      .then(res => {
        console.log('response from /api/schedule/all, res.data.events:', res.data.events)
        const events = res.data.events
        .filter(event => event.dogs.length)
        .map(event => {
          const num = event.dogs.length
          const user = event.user
          const e = {allDay: true}
          e.title = user
                  ? `${num} dog${num > 1 ? 's' : ''} assigned to ${user.name}.`
                  : `${num} dog${num > 1 ? 's' : ''} scheduled.`
          e.start = event.date
          e.end = event.date
          return e
        })
        console.log('and now events is:', events)
        return dispatch(getAllEventsSuccess(events))
      })
      .catch(err => {
        return dispatch(getAllEventsFailure(err))
      })
  }
}

function getAllEventsRequest () {
  return {
    type: GET_ALL_EVENTS_REQUEST
  }
}

function getAllEventsSuccess (events) {
  return {
    type: GET_ALL_EVENTS_SUCCESS,
    events
  }
}

function getAllEventsFailure (err) {
  return {
    type: GET_ALL_EVENTS_FAILURE,
    err
  }
}

export function getScheduled (date) {
  // console.log('get scheduled for date:', date)
  return dispatch => {
    dispatch(getScheduledRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'scheduledate': date
      }
    }
    return axios.get('/api/schedule', config)
      .then(res => {
        const walks = res.data.walks
        const dogs = walks.reduce((acc, walk) => {
          walk.dogs.forEach(dog => {
            if (walk.user) dog.assignedTo = walk.user
            acc.push(dog)
          })
          return acc
        }, [])
        return dispatch(getScheduledSuccess(dogs))
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

function getScheduledSuccess (dogs) {
  return {
    type: GET_SCHEDULED_SUCCESS,
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
  console.log('save Scheduled about to run, dogs:', [...dogs])
  dogs = dogs.filter(dog => !dog.assignedTo)
  console.log('save Scheduled about to run, dogs filtered:', [...dogs])
  return dispatch => {
    dispatch(saveScheduledRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    return axios.post('/api/schedule', {date, dogs}, config)
      .then(res => {
        // console.log('response from post /api/assign/schedule:', res)
        dispatch(getAllEvents())
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
