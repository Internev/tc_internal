import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../redux/creators/userCreators'

class Header extends React.Component {
  static isPrivate = false

  render () {
    return (
      <header className='header'>
        <img src='./imgs/tomandcaptain.png' />
        {this.props.user.isAuthenticated
        ? <Link to='/logout'>Log out</Link>
        : null}
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Header)
