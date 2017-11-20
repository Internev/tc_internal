import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

// Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
// const isAuthenticated = () => true

const PRIVATE_ROOT = '/'
const PUBLIC_ROOT = '/login'

const AuthRoute = ({component, isPrivate, adminOnly, ...props}) => {
  if (props.auth.isAuthenticated) {
    // If route is admin only and user is admin, proceed, otherwise redirect to private root.
    if (adminOnly) {
      return props.auth.admin
      ? <Route {...props} component={component} />
      : <Redirect to={PRIVATE_ROOT} />
    }
    // If route is private, user proceeds, else route is public, redirect use to private root.
    return isPrivate
      ? <Route {...props} component={component} />
      : <Redirect to={PRIVATE_ROOT} />
  } else {
    // If route is private, user is redirected to app's public root, else user proceeds.
    return isPrivate
      ? <Redirect to={PUBLIC_ROOT} />
      : <Route {...props} component={component} />
  }
}

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(AuthRoute)
