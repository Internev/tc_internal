import React from 'react'
import { connect } from 'react-redux'
import { Card, Input } from 'semantic-ui-react'
import { getUsers, updateUser } from '../../redux/creators/usersCreators'
import UserCard from './UserCard'
import './UserTools.scss'

class UserTools extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchTerm: ''}
    this.toggleAdmin = this.toggleAdmin.bind(this)
    this.toggleWalker = this.toggleWalker.bind(this)
  }
  componentWillMount () {
    this.props.dispatch(getUsers())
  }
  componentDidUpdate () {
    console.log('User Tools props:', this.props)
  }
  filterUsers (e) {
    this.setState({searchTerm: e.target.value})
  }
  toggleAdmin (user) {
    this.props.dispatch(updateUser(user, 'admin'))
  }
  toggleWalker (user) {
    this.props.dispatch(updateUser(user, 'walker'))
  }
  render () {
    return (
      <div className='usertools'>
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
    users: state.users
  }
}

export default connect(mapStateToProps)(UserTools)
