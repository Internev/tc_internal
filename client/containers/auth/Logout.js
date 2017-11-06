import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/creators/userCreators'

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
    user: state.user
  }
}

export default connect(mapStateToProps)(Logout)
