import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../redux/creators/userCreators'
import './Header.scss'

class Header extends React.Component {
  static isPrivate = false

  render () {
    return (
      <header className='header'>
        <img className='header_logo' src='./imgs/tomandcaptain.png' />
        {this.props.user.isAuthenticated
        ? <div className='header_links'>
            <Link to='/home' className='header_links-link'>Home</Link>
            <Link to='/logout' className='header_links-link'>Log out</Link>
          </div>
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
