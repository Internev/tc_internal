import React from 'react'
import { connect } from 'react-redux'
import ClientList from './ClientList'
import { getClients } from '../../redux/creators/clientsCreators'
import { assignClient } from '../../redux/creators/assignedCreators'

class ClientListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchTerm: ''}
    this.handleClientClick = this.handleClientClick.bind(this)
    this.handleSearchTerm = this.handleSearchTerm.bind(this)
  }
  componentDidMount () {
    if (this.props.clients.list.length < 1) {
      this.props.dispatch(getClients())
    }
  }
  componentDidUpdate () {
    console.log('ClientListContainer props:', this.props)
  }
  handleClientClick (client) {
    // console.log('Making client active for assigning to walker.', client)
    this.props.dispatch(assignClient(client))
  }
  handleSearchTerm (e) {
    this.setState({searchTerm: e.target.value})
  }
  render () {
    return (
      <ClientList
        handleClientClick={this.handleClientClick}
        handleSearchTerm={this.handleSearchTerm}
        searchTerm={this.state.searchTerm}
        clients={this.state.searchTerm
          ? this.props.clients.list.filter(client =>
            this.state.searchTerm
            ? `${client.name}${client.email}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
            : true
          )
          : this.props.clients.list}
        isFetching={this.props.clients.isFetching}
        error={this.props.clients.error}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients
  }
}

export default connect(mapStateToProps)(ClientListContainer)
