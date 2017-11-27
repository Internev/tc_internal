import {
  SET_EDITABLE_DOG,
  GET_DOGS_REQUEST,
  GET_DOGS_SUCCESS,
  GET_DOGS_FAILURE
} from '../actions'
import axios from 'axios'
import {checkToken} from './authCreators'

export function addDogComment (name, comment) {
  // return dispatch => {
  //   dispatch(addCommentRequest())
  //   const config = {
  //     headers: {
  //       'authorization': localStorage.getItem('id_token')
  //     }
  //   }
  //
  // }
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
        // console.log('res from api/dogs get:', res)
        return res.data.list
        ? dispatch(getDogsSuccess(res.data.list))
        : dispatch(getDogsFailure(res.data.msg))
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

function getDogsSuccess (list) {
  return {
    type: GET_DOGS_SUCCESS,
    list
  }
}

function getDogsFailure (err) {
  return {
    type: GET_DOGS_FAILURE,
    err
  }
}
