import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../actions'
import axios from 'axios'

function requestSignup () {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

function receiveSignup (msg) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    msg
  }
}

function signupError (msg) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    msg
  }
}

export function signupUser (creds) {
  return dispatch => {
    dispatch(requestSignup())

    axios.post('/auth/signup', {name: creds.name, email: creds.email, password: creds.password})
      .then(res => {
        console.log('userCreator redux, signupUser response:', res)
        return dispatch(receiveSignup(res.data))
      })
      .catch(err => {
        if (err) return dispatch(signupError(err.response.data))
      })
  }
}

function requestLogin (creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

function receiveLogin (data) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    data
  }
}

function loginError (data) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    data
  }
}

export function loginUser (creds) {
  return dispatch => {
    dispatch(requestLogin())

    return axios.post('/auth/login', {email: creds.email, password: creds.password})
      .then(res => {
        localStorage.setItem('id_token', res.data.token)
        return dispatch(receiveLogin(res.data))
      })
      .catch(err => {
        if (err) return dispatch(loginError(err.response.data))
      })
  }
}

function requestLogout () {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

function receiveLogout () {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function logoutUser () {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    return dispatch(receiveLogout())
  }
}

export function checkToken (token) {
  return dispatch => {
    axios.post('/auth/token', {token})
    .then(res => {
      return dispatch(receiveLogin(res.data))
    })
    .catch(err => {
      if (err) return dispatch(loginError(err))
    })
  }
}
