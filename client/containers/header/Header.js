import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, Icon } from 'semantic-ui-react'
import { checkToken } from '../../redux/creators/userCreators'
import { headerLinks } from './headerLinks'
import './Header.scss'

class Header extends React.Component {
  componentWillMount () {
    const token = localStorage.getItem('id_token')
    if (token) this.props.dispatch(checkToken(token))
  }
  componentDidUpdate () {
    // console.log('header props:', this.props, this.props.user.admin)
  }
  genMenuItems () {
    return headerLinks
      .filter(link => this.props.user.admin ? true : !link.admin)
      .map(link => { return {key: link.key, content: link.content} })
  }
  render () {
    const hamburger = <Icon
      name='bars'
      size='big'
      />
    return (
      <header className='tcheader'>
        <img className='tcheader_logo' src='/tomandcaptain.png' />
        {this.props.user.isAuthenticated
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
    user: state.user
  }
}

export default connect(mapStateToProps)(Header)
