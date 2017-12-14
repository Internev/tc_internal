import {
  WALK_HISTORY_FETCHING,
  WALK_HISTORY_POPULATE,
  WALK_HISTORY_ERROR
} from '../actions'
import {checkToken} from './authCreators'
import axios from 'axios'

export function getWalkHistory (id) {
  return dispatch => {
    dispatch(isFetching())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'userid': id
      }
    }
    axios.get('api/history', config)
    .then(res => {
      console.log('response from api/history:', res)
      return dispatch(populateWalkHistory(res.data.walks))
    })
    .catch(err => {
      console.log('error from api/history:', err)
      return dispatch(walkHistoryError(err, 'Unable to retrieve walk history. Check your connection and try again.'))
    })
  }
}

export function getIdThenWalkHistory () {
  return (dispatch, getState) => {
    const token = localStorage.getItem('id_token')
    return dispatch(checkToken(token)).then(() => {
      const userId = getState().auth.id
      return dispatch(getWalkHistory(userId))
    })
  }
}

function isFetching () {
  return {
    type: WALK_HISTORY_FETCHING
  }
}

function populateWalkHistory (walks) {
  return {
    type: WALK_HISTORY_POPULATE,
    walks
  }
}

function walkHistoryError (error, msg) {
  return {
    type: WALK_HISTORY_ERROR,
    error,
    msg
  }
}
