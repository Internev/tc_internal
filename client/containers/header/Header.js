import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, Icon } from 'semantic-ui-react'
import { checkToken } from '../../redux/creators/authCreators'
import { headerLinks } from './headerLinks'
import logo from '../../imgs/tomandcaptain.png'
import './Header.scss'

class Header extends React.Component {
  componentWillMount () {
    const token = localStorage.getItem('id_token')
    if (token) this.props.dispatch(checkToken(token))
  }
  componentDidUpdate () {
    // console.log('header props:', this.props, this.props.auth.admin)
  }
  genMenuItems () {
    return headerLinks
      .filter(link => this.props.auth.admin ? true : !link.admin)
      .map(link => { return {key: link.key, content: link.content} })
  }
  render () {
    const hamburger = <Icon
      name='bars'
      size='big'
      />
    return (
      <header className='tcheader'>
        <img className='tcheader_logo' src={logo} />
        {this.props.auth.isAuthenticated
        ? <nav className='tcheader_nav'>
          <Dropdown
            className='tcheader_nav-dropdown'
            fluid
            icon={hamburger}
            options={this.genMenuItems()}
            />
        </nav>
        : null}
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header)
