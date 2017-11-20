import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/creators/authCreators'

class Logout extends React.Component {
  componentWillMount () {
    this.props.dispatch(logoutUser())
    this.props.history.push('/login')
  }
  render () {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Logout)
