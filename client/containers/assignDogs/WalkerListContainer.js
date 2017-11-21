import React from 'react'
import { connect } from 'react-redux'
import WalkerList from './WalkerList'
import { getUsers } from '../../redux/creators/usersCreators'
import { assignWalker } from '../../redux/creators/assignedCreators'

class WalkerListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchTerm: ''}
    this.handleWalkerClick = this.handleWalkerClick.bind(this)
    this.handleSearchTerm = this.handleSearchTerm.bind(this)
  }
  componentDidMount () {
    if (this.props.users.users.length < 1) {
      this.props.dispatch(getUsers())
    }
  }
  componentDidUpdate () {
    console.log('WalkerListContainer users props:', this.props.users)
  }
  handleWalkerClick (walker) {
    // console.log('Making walker active for assigning dogs.', walker)
    this.props.dispatch(assignWalker(walker))
  }
  handleSearchTerm (e) {
    this.setState({searchTerm: e.target.value})
  }
  render () {
    return (
      <WalkerList
        handleWalkerClick={this.handleWalkerClick}
        handleSearchTerm={this.handleSearchTerm}
        searchTerm={this.state.searchTerm}
        walkers={this.state.searchTerm
          ? this.props.users.users.filter(user =>
            this.state.searchTerm
            ? `${user.name}${user.email}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
            : true
          )
          : this.props.users.users}
        isFetching={this.props.users.isFetching}
        error={this.props.users.error}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(WalkerListContainer)
