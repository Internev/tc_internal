import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Header.scss'

class Header extends React.Component {
  render () {
    return (
      <header className='header'>
        <img className='header_logo' src='/tomandcaptain.png' />
        {this.props.user.isAuthenticated
        ? <nav className='header_nav'>
          <div className='header_nav-wide'>
            <Link to='/home' className='header_nav-wide-link'>Home</Link>
            <Link to='/logout' className='header_nav-wide-link'>Log out</Link>
          </div>
          <div className='header_nav-narrow'>
            <i className='glyphicon glyphicon-menu-hamburger' />
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
