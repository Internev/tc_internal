import React from 'react'
import { connect } from 'react-redux'
import { Card, Input, Dimmer, Loader, Header } from 'semantic-ui-react'
import { getUsers, updateUser, deleteUser } from '../../redux/creators/usersCreators'
import UserCard from './UserCard'
import './UserTools.scss'

class UserTools extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchTerm: ''}
    this.toggleAdmin = this.toggleAdmin.bind(this)
    this.toggleWalker = this.toggleWalker.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(getUsers())
  }
  componentDidUpdate () {
  }
  filterUsers (e) {
    this.setState({searchTerm: e.target.value})
  }
  toggleAdmin (user) {
    if (user.id !== this.props.auth.id) {
      this.props.dispatch(updateUser(user, 'admin'))
    }
  }
  toggleWalker (user) {
    this.props.dispatch(updateUser(user, 'walker'))
  }
  deleteUser (user) {
    this.props.dispatch(deleteUser(user, 'walker'))
  }
  render () {
    return (
      <div className='usertools'>
        <Dimmer inverted active={this.props.users.isFetching}>
          <Loader inverted>Contacting Database</Loader>
        </Dimmer>
        <Header>
          User Management
          <Header.Subheader>
            User permissions can be updated here. <br />
            Walker: regular walker rights (can be assigned dogs, can view details of assigned dogs).<br />
            Administrator: full rights (can update everything).
          </Header.Subheader>
        </Header>
        <Input
          className='usertools_input'
          fluid
          icon='search'
          placeholder='Filter Users by Name or Email Address'
          onChange={e => this.filterUsers(e)}
        />
        <Card.Group itemsPerRow={4} stackable>
          {this.props.users.users
            .filter(user =>
              this.state.searchTerm
              ? `${user.name}${user.email}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
              : true
            )
            .map((user, i) => (
              <UserCard
                key={i}
                user={user}
                toggleAdmin={this.toggleAdmin}
                toggleWalker={this.toggleWalker}
                deleteUser={this.deleteUser}
              />
            )
          )}
        </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(UserTools)
