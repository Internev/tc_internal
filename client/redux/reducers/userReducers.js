import { SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REDIRECT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  UPDATE_AUTH_MSG,
  PASSWORD_TOKEN_CHECKING,
  PASSWORD_TOKEN_RESULT
} from '../actions'

const DEFAULT_STATE = {
  name: '',
  email: '',
  walker: false,
  admin: false,
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') !== null,
  id_token: '',
  isPassTokenChecking: false,
  isPassTokenGood: false,
  auth: {
    success: false,
    message: '',
    errors: {}
  }
}

const signupRequest = (state, action) => {
  const newState = {...state, ...{isFetching: action.isFetching, isAuthenticated: action.isAuthenticated}}
  return newState
}

const signupError = (state, action) => {
  const update = {
    isFetching: action.isFetching,
    isAuthenticated: action.isAuthenticated,
    auth: action.msg
  }
  const newState = {...state, ...update}
  return newState
}

const signupSuccess = (state, action) => {
  const update = {
    isFetching: action.isFetching,
    isAuthenticated: action.isAuthenticated,
    auth: {...action.msg, errors: {}}
  }
  const newState = {...state, ...update}
  return newState
}

const signupRedirect = (state, action) => {
  const newState = {...state, success: false}
  return newState
}

const loginRequest = (state, action) => {
  const newState = {...state, ...{isFetching: action.isFetching, isAuthenticated: action.isAuthenticated}}
  return newState
}

const loginError = (state, action) => {
  const update = {
    isFetching: action.isFetching,
    isAuthenticated: action.isAuthenticated,
    auth: action.data
  }
  const newState = {...state, ...update}
  return newState
}

const loginSuccess = (state, action) => {
  const update = {
    isFetching: action.isFetching,
    isAuthenticated: action.isAuthenticated,
    name: action.data.user.name,
    email: action.data.user.email,
    walker: action.data.user.walker,
    admin: action.data.user.admin,
    id_token: action.data.token,
    auth: {success: action.data.success, errors: {}}
  }
  const newState = {...state, ...update}
  return newState
}

const logoutRequest = (state, action) => {
  const newState = {...state, ...{isFetching: action.isFetching, isAuthenticated: action.isAuthenticated}}
  return newState
}

const logoutSuccess = (state, action) => {
  const newState = {...DEFAULT_STATE, ...{isAuthenticated: false}}
  return newState
}

const updateAuthMsg = (state, action) => {
  const authState = {...state.auth}
  authState.message = action.msg
  const newState = {...state, ...{auth: authState}}
  console.log('updateAuthMessage Reducer newstate is:', newState)
  return newState
}

const passwordTokenChecking = (state, action) => {
  const newState = {
    ...state,
    ...{
      isPassTokenChecking: action.isPassTokenChecking,
      isPassTokenGood: action.isPassTokenGood
    }
  }
  return newState
}

const passwordTokenResult = (state, action) => {
  const newState = {
    ...state,
    ...{
      isPassTokenChecking: action.isPassTokenChecking,
      isPassTokenGood: action.isPassTokenGood
    }
  }
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return signupRequest(state, action)
    case SIGNUP_FAILURE:
      return signupError(state, action)
    case SIGNUP_SUCCESS:
      return signupSuccess(state, action)
    case SIGNUP_REDIRECT:
      return signupRedirect(state, action)
    case LOGIN_REQUEST:
      return loginRequest(state, action)
    case LOGIN_FAILURE:
      return loginError(state, action)
    case LOGIN_SUCCESS:
      return loginSuccess(state, action)
    case LOGOUT_REQUEST:
      return logoutRequest(state, action)
    case LOGOUT_SUCCESS:
      return logoutSuccess(state, action)
    case UPDATE_AUTH_MSG:
      return updateAuthMsg(state, action)
    case PASSWORD_TOKEN_CHECKING:
      return passwordTokenChecking(state, action)
    case PASSWORD_TOKEN_RESULT:
      return passwordTokenResult(state, action)
    default:
      return state
  }
}
