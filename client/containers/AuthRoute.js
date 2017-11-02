import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
const isAuthenticated = () => false

const PRIVATE_ROOT = '/'
const PUBLIC_ROOT = '/login'

const AuthRoute = ({component, ...props}) => {
  const { isPrivate } = component

  if (isAuthenticated()) {
    //If route is private, user proceeds, else route is public, redirect use to private root.
    return isPrivate
      ? <Route { ...props } component={ component } />
      : <Redirect to={ PRIVATE_ROOT } />
  } else {
    //If route is private, user is redirected to app's public root, else user proceeds.
    return isPrivate
      ? <Redirect to={ PUBLIC_ROOT } />
      : <Route { ...props } component={ component } />
  }
}

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
}

export default AuthRoute
