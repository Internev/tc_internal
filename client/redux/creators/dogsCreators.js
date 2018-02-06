import {
  SET_EDITABLE_DOG,
  GET_DOGS_REQUEST,
  GET_DOGS_SUCCESS,
  GET_DOGS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  GET_ALL_DOGS_REQUEST,
  GET_ALL_DOGS_SUCCESS,
  GET_ALL_DOGS_FAILURE,
  UPDATE_DOG_STATUS_REQUEST,
  UPDATE_DOG_STATUS_SUCCESS,
  UPDATE_DOG_STATUS_FAILURE
} from '../actions'
import axios from 'axios'
import {checkToken} from './authCreators'

export function updateDogStatus (index, dog, status, id) {
  return dispatch => {
    dispatch(updateDogStatusRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'id': id,
        'dogid': dog.id,
        'dogname': dog.name,
        'doggender': dog.gender,
        'phone': dog.client.phone,
        'dogstatus': status
      }
    }
    return axios.get('/api/dogs/sms', config)
      .then(res => {
        console.log('response from sms:', res)
        return dispatch(updateDogStatusSuccess(index, dog, status))
      })
      .catch(err => {
        return dispatch(updateDogStatusFailure(index, dog, status, err))
      })
  }
}

function updateDogStatusRequest () {
  return {
    type: UPDATE_DOG_STATUS_REQUEST
  }
}

function updateDogStatusSuccess (index, id, status) {
  return {
    type: UPDATE_DOG_STATUS_SUCCESS,
    index,
    id,
    status
  }
}

function updateDogStatusFailure (index, id, status, err) {
  return {
    type: UPDATE_DOG_STATUS_FAILURE,
    index,
    id,
    status,
    err
  }
}

export function getAllDogs () {
  return dispatch => {
    dispatch(getAllDogsRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    return axios.get('/api/dogs/all', config)
      .then(res => {
        return dispatch(getAllDogsSuccess(res.data.dogs))
      })
      .catch(err => {
        return dispatch(getAllDogsFailure(err))
      })
  }
}

function getAllDogsRequest () {
  return {
    type: GET_ALL_DOGS_REQUEST
  }
}

function getAllDogsSuccess (all) {
  return {
    type: GET_ALL_DOGS_SUCCESS,
    all
  }
}

function getAllDogsFailure (err) {
  return {
    type: GET_ALL_DOGS_FAILURE,
    err
  }
}

export function addDogComment (dogId, name, comment) {
  return dispatch => {
    dispatch(addCommentRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    return axios.post('/api/dogs/comment', {dogId, name, comment}, config)
      .then(res => {
        return dispatch(addCommentSuccess(res.data.dog))
      })
      .catch(err => {
        return dispatch(addCommentFailure(err))
      })
  }
}

function addCommentRequest () {
  return {
    type: ADD_COMMENT_REQUEST
  }
}

function addCommentSuccess (dog) {
  return {
    type: ADD_COMMENT_SUCCESS,
    dog
  }
}

function addCommentFailure (err) {
  return {
    type: ADD_COMMENT_FAILURE,
    err
  }
}

export function setEditableDog (id) {
  return {
    type: SET_EDITABLE_DOG,
    id
  }
}

export function getUserThenDogsThenEditable (id) {
  return (dispatch, getState) => {
    const token = localStorage.getItem('id_token')
    // console.log('checktoken looks like:', checkToken(token), '\n**\n', dispatch)
    return dispatch(checkToken(token)).then(() => {
      const userId = getState().auth.id
      return dispatch(getDogs(userId)).then(() => dispatch(setEditableDog(id)))
    })
  }
}

export function getUserThenDogs () {
  return (dispatch, getState) => {
    const token = localStorage.getItem('id_token')
    // console.log('checktoken looks like:', checkToken(token), '\n**\n', dispatch)
    return dispatch(checkToken(token)).then(() => {
      const userId = getState().auth.id
      return dispatch(getDogs(userId))
    })
  }
}

export function getDogs (userId) {
  return dispatch => {
    dispatch(getDogsRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'id': userId
      }
    }
    return axios.get('/api/dogs', config)
      .then(res => {
        if (res.data.msg) {
          dispatch(getDogsFailure(res.data.msg))
        } else {
          const walk = res.data.walk
          const sms = res.data.walk.sms
          const dogs = walk.dogs
          if (sms) {
            for (let key in sms) {
              dogs.forEach(dog => {
                if (dog.id === parseInt(key)) {
                  if (sms[key].includes('picked up')) {
                    dog.pickedUp = true
                  }
                  if (sms[key].includes('dropped off')) {
                    dog.droppedOff = true
                  }
                }
              })
            }
          }
          dispatch(getDogsSuccess(dogs, walk.comment))
        }
      })
      .catch(err => {
        // console.log('err from api/dogs get:', err)
        return dispatch(getDogsFailure(err))
      })
  }
}

function getDogsRequest () {
  return {
    type: GET_DOGS_REQUEST
  }
}

function getDogsSuccess (assigned, comment) {
  return {
    type: GET_DOGS_SUCCESS,
    assigned,
    comment
  }
}

function getDogsFailure (err) {
  return {
    type: GET_DOGS_FAILURE,
    err
  }
}
