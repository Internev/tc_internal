import {
  UPLOAD_CLIENTS_REQUEST,
  UPLOAD_CLIENTS_SUCCESS,
  UPLOAD_CLIENTS_FAILURE
} from '../actions'
import axios from 'axios'

export function uploadClients (clients) {
  return dispatch => {
    dispatch(uploadClientsRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    axios.post('/api/clients', clients, config)
    .then(res => {
      console.log('response from api/clients:', res)
      dispatch(uploadClientsSuccess(res.data.list))
    })
    .catch(err => {
      dispatch(uploadClientsFailure(err))
    })
  }
}

function uploadClientsRequest () {
  return {
    type: UPLOAD_CLIENTS_REQUEST
  }
}

function uploadClientsSuccess (list) {
  return {
    type: UPLOAD_CLIENTS_SUCCESS,
    list
  }
}

function uploadClientsFailure (err) {
  return {
    type: UPLOAD_CLIENTS_FAILURE,
    err
  }
}
