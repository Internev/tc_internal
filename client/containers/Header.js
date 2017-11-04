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
        ? <nav className='header_nav'>
            <div className='header_nav-wide'>
              <Link to='/home' className='header_nav-wide-link'>Home</Link>
              <Link to='/logout' className='header_nav-wide-link'>Log out</Link>
                <i className='glyphicon glyphicon-queen'></i>
                <i className='glyphicon glyphicon-sunglasses'></i>
                <i className='glyphicon glyphicon-triangle-right'></i>
                <i className='glyphicon glyphicon-menu-down'></i>

            </div>
            <div className='header_nav-narrow'>
              <i className='glyphicon glyphicon-menu-hamburger'></i>
              <div className='header_nav-narrow-links'>
                <Link to='/home' className='header_nav-narrow-link'>Home</Link>
                <Link to='/logout' className='header_nav-narrow-link'>Log out</Link>
              </div>
            </div>
          </nav>
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
