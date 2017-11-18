import {
  UPLOAD_CLIENTS_REQUEST,
  UPLOAD_CLIENTS_FAILURE,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_FAILURE,
  SET_ACTIVE_CLIENT,
  CLEAR_ACTIVE_CLIENT,
  UPDATE_ACTIVE_CLIENT
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
      dispatch(getClientsSuccess(res.data.list))
    })
    .catch(err => {
      dispatch(uploadClientsFailure(err))
    })
  }
}

export function getClients () {
  return dispatch => {
    dispatch(getClientsRequest())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token')
      }
    }
    axios.get('/api/clients', config)
      .then(res => {
        dispatch(getClientsSuccess(res.data.list))
      })
      .catch(err => {
        dispatch(getClientsFailure(err))
      })
  }
}

function uploadClientsRequest () {
  return {
    type: UPLOAD_CLIENTS_REQUEST
  }
}

function uploadClientsFailure (err) {
  return {
    type: UPLOAD_CLIENTS_FAILURE,
    err
  }
}

function getClientsRequest () {
  return {
    type: GET_CLIENTS_REQUEST
  }
}

function getClientsSuccess (list) {
  return {
    type: GET_CLIENTS_SUCCESS,
    list
  }
}


function getClientsFailure (err) {
  return {
    type: GET_CLIENTS_FAILURE,
    err
  }
}

export function setActiveClient (client) {
  return {
    type: SET_ACTIVE_CLIENT,
    client
  }
}

export function clearActiveClient () {
  return {
    type: CLEAR_ACTIVE_CLIENT
  }
}

export function updateActiveClient (update) {
  return {
    type: UPDATE_ACTIVE_CLIENT,
    update
  }
}
