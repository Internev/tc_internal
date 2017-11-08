import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import { checkToken } from '../redux/creators/userCreators'
import './Header.scss'

class Header extends React.Component {
  componentWillMount () {
    const token = localStorage.getItem('id_token')
    if (token) this.props.dispatch(checkToken(token))
  }
  componentDidUpdate () {
    console.log('heasder props:', this.props, this.props.user.admin)
  }
  render () {
    return (
      <header className='header'>
        <img className='header_logo' src='/tomandcaptain.png' />
        {this.props.user.isAuthenticated
        ? <nav className='header_nav'>
          <div className='header_nav-wide'>
            <Link to='/home' className='header_nav-wide-link'>Home</Link>
            {
              this.props.user.admin
              ? <Dropdown text='Admin Tools' className='header_nav-wide-dropdown'>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to='/admin/assign-dogs' className='header_nav-wide-link'>Assign Dogs</Link></Dropdown.Item>
                  <Dropdown.Item>
                    <Link to='/admin/user-tools' className='header_nav-wide-link'>User Tools</Link></Dropdown.Item>
                  <Dropdown.Item>
                    <Link to='/admin/client-tools' className='header_nav-wide-link'>Client Tools</Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              : null
            }
            <Link to='/logout' className='header_nav-wide-link'>Log out</Link>
          </div>
          <div className='header_nav-narrow'>
            <i className='glyphicon glyphicon-menu-hamburger' />
            <div className='header_nav-narrow-links'>
              <Link to='/home' className='header_nav-narrow-link'>Home</Link>
              <Link to='/logout' className='header_nav-narrow-link'>Log out</Link>
              {
                this.props.user.admin
                ? <Dropdown text='Admin Tools'>
                  <Dropdown.Menu>
                    <Dropdown.Item><Link to='/admin/assign-dogs'>Assign Dogs</Link></Dropdown.Item>
                    <Dropdown.Item><Link to='/admin/user-tools'>User Tools</Link></Dropdown.Item>
                    <Dropdown.Item><Link to='/admin/client-tools'>Client Tools</Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                : null
              }
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
