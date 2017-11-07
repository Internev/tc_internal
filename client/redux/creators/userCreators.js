import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  UPDATE_AUTH_MSG,
  PASSWORD_TOKEN_CHECKING,
  PASSWORD_TOKEN_RESULT
} from '../actions'
import axios from 'axios'

export function updateAuthMsg (msg) {
  console.log('userCreator updateAuthMsg, msg is:', msg)
  return {
    type: UPDATE_AUTH_MSG,
    msg
  }
}

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

export function forgotPassword (email) {
  return dispatch => {
    return axios.post('/auth/forgot', {email})
      .then(res => {
        return dispatch(updateAuthMsg(`Email sent (assuming you're a registered user), please follow the link in the email to reset your password.`))
      })
      .catch(err => {
        console.log('forgotPassword Error:', err)
        return dispatch(updateAuthMsg(`Email sent (assuming you're a registered user).`))
      })
  }
}

export function resetPasswordCheck (token) {
  return dispatch => {
    dispatch(passwordTokenChecking())
    const config = {
      headers: {
        token
      }
    }
    return axios.get('/auth/reset', config)
      .then(res => {
        console.log('response from server reset token check:', res)
        dispatch(passwordTokenResult(res.data.resetToken))
      })
      .catch(err => {
        console.log('passwordTokenCheck error:', err)
        dispatch(passwordTokenResult(false))
      })
  }
}

function passwordTokenChecking () {
  return {
    type: PASSWORD_TOKEN_CHECKING,
    isPassTokenChecking: true,
    isPassTokenGood: false
  }
}

function passwordTokenResult (valid) {
  return {
    type: PASSWORD_TOKEN_RESULT,
    isPassTokenChecking: false,
    isPassTokenGood: valid
  }
}

export function changePassword (password, token) {
  return dispatch => {
    return axios.post('/auth/reset', {password, token})
      .then(res => {
        return dispatch(receiveSignup(res.data))
      })
      .catch(err => {
        console.log('we got a changePassword err:', err)
        if (err) return dispatch(signupError(err.response.data))
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
