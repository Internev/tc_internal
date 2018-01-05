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
  RECEIVE_DAY_SCHEDULE,
  GET_TODAYS_SCHEDULE_REQUEST,
  GET_TODAYS_SCHEDULE_FAILURE,
  UPDATE_ASSIGNED_COMMENT
} from '../actions'
import axios from 'axios'

export function updateAssignedComment (comment) {
  return {
    type: UPDATE_ASSIGNED_COMMENT,
    comment
  }
}

export function receiveDaySchedule (date, scheduledDogs) {
  return {
    type: RECEIVE_DAY_SCHEDULE,
    date,
    scheduledDogs
  }
}

export function getTodaysSchedule (date) {
  // console.log('get scheduled for date:', date)
  return dispatch => {
    dispatch(getTodaysScheduleRequest())
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
        return dispatch(receiveDaySchedule(date, dogs))
      })
      .catch(err => {
        return dispatch(getTodaysScheduleFailure(err))
      })
  }
}

function getTodaysScheduleRequest () {
  return {
    type: GET_TODAYS_SCHEDULE_REQUEST
  }
}

function getTodaysScheduleFailure (err) {
  return {
    type: GET_TODAYS_SCHEDULE_FAILURE,
    err
  }
}

export function clearAssignedMsg () {
  return {
    type: CLEAR_ASSIGNED_MSG
  }
}

export function saveAssigned (walker, dogs, date, scheduledDogs, comment) {
  scheduledDogs = scheduledDogs.map(dog => {
    if (dog.assignedTo && dog.assignedTo.id === walker.id) delete dog.assignedTo
    return dog
  })
  dogs.forEach(dog => {
    const i = scheduledDogs.findIndex(sdog => sdog.id === dog.id)
    if (i > -1) scheduledDogs[i].assignedTo = walker
  })
  scheduledDogs = scheduledDogs.filter(dog => !dog.assignedTo)
  return dispatch => {
    dispatch(saveAssignedRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    axios.post('/api/assign', {walker, dogs, date, scheduledDogs, comment}, config)
      .then(res => {
        const scheduledDogs = res.data.walks.reduce((acc, walk) => {
          walk.dogs.forEach(dog => {
            if (walk.user) dog.assignedTo = walk.user
            acc.push(dog)
          })
          return acc
        }, [])
        dispatch(saveAssignedSuccess(scheduledDogs))
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

function saveAssignedSuccess (scheduledDogs) {
  return {
    type: SAVE_ASSIGNED_SUCCESS,
    scheduledDogs
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
        // const dogs = res.data.walk ? res.data.walk.dogs : []
        return dispatch(assignWalkerSuccess(walker, res.data.walk.dogs, res.data.walk.comment))
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

function assignWalkerSuccess (walker, dogs, comment) {
  return {
    type: ASSIGN_WALKER_SUCCESS,
    walker,
    dogs,
    comment
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
