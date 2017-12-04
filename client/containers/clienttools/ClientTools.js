import React from 'react'
import { connect } from 'react-redux'
import { Message, Icon } from 'semantic-ui-react'
import { parseClientCSV } from '../../utils/csvParsers'
import { uploadClients, getClients, setActiveClient, clearActiveClient, updateActiveClient, clearClientsMsg, updateClientDetails, deleteClient } from '../../redux/creators/clientsCreators'
import ClientCSVUpload from './ClientCSVUpload'
import ClientEditor from './ClientEditor'
import './ClientTools.scss'

class ClientTools extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      modalOpen: false
    }
    this.handleClientCSVUpload = this.handleClientCSVUpload.bind(this)
    this.handleClientEditorSearch = this.handleClientEditorSearch.bind(this)
    this.openEditClient = this.openEditClient.bind(this)
    this.cancelEditClient = this.cancelEditClient.bind(this)
    this.handleEditClientChange = this.handleEditClientChange.bind(this)
    this.saveEditClient = this.saveEditClient.bind(this)
    this.handleEditClientObjectUpdate = this.handleEditClientObjectUpdate.bind(this)
    this.handleEditClientDog = this.handleEditClientDog.bind(this)
    this.handleCommentRemove = this.handleCommentRemove.bind(this)
    this.handleCloseMsg = this.handleCloseMsg.bind(this)
    this.deleteClient = this.deleteClient.bind(this)
  }
  componentDidMount () {
    // console.log('Client Tools props:', this.props)
    if (this.props.clients.list.length < 1) this.props.dispatch(getClients())
  }
  componentDidUpdate () {
    // console.log('Client Tools props:', this.props, this.state)
    // console.log('Clients message is:', this.props.clients.msg)
  }
  handleClientCSVUpload (e) {
    let reader = new FileReader()
    reader.onload = (file) => {
      this.props.dispatch(uploadClients(parseClientCSV(file.target.result)))
    }
    reader.readAsText(e.target.files[0])
  }
  handleClientEditorSearch (e) {
    this.setState({searchTerm: e.target.value})
  }
  openEditClient (client) {
    this.setState({modalOpen: true})
    this.props.dispatch(setActiveClient(client))
  }
  cancelEditClient () {
    this.setState({modalOpen: false})
    this.props.dispatch(clearActiveClient())
  }
  handleEditClientChange (e) {
    const update = {}
    update[e.target.name] = e.target.value
    this.props.dispatch(updateActiveClient(update))
  }
  handleEditClientObjectUpdate (e) {
    const keys = e.target.name.split('.')
    const objUpdate = {...this.props.clients.active[keys[0]]}
    objUpdate[keys[1]] = e.target.value
    const update = {}
    update[keys[0]] = objUpdate
    this.props.dispatch(updateActiveClient(update))
  }
  handleEditClientDog (e, dog, index) {
    const dogUpdate = {...dog}
    dogUpdate[e.target.name] = e.target.value
    const update = {}
    update.dogs = [...this.props.clients.active.dogs]
    update.dogs[index] = dogUpdate
    this.props.dispatch(updateActiveClient(update))
  }
  handleCommentRemove (dog, index, comment, commentIndex) {
    // console.log('Handle comment remove:', dog, index, comment, commentIndex)
    const dogUpdate = {...dog}
    dogUpdate.comments.splice(commentIndex, 1)
    const update = {}
    update.dogs = [...this.props.clients.active.dogs]
    update.dogs[index] = dogUpdate
    this.props.dispatch(updateActiveClient(update))
  }
  saveEditClient () {
    this.setState({modalOpen: false})
    // console.log('going to save client:', this.props.clients.active)
    this.props.dispatch(updateClientDetails(this.props.clients.active))
  }
  handleCloseMsg () {
    this.props.dispatch(clearClientsMsg())
  }
  deleteClient (client) {
    console.log('deleting client:', client)
    this.setState({modalOpen: false, searchTerm: ''})
    this.props.dispatch(deleteClient(client))
  }
  cancelDeleteClient () {
    this.setState({confirmDeleteOpen: false})
  }
  render () {
    return (
      <div>
        {this.props.clients.msg
        ? <Message
          onDismiss={this.handleCloseMsg}
          icon
          color='yellow'
          >
          <Icon name='info' size='small' />
          {this.props.clients.msg}
        </Message>
        : null}
        <ClientCSVUpload handleClientCSVUpload={this.handleClientCSVUpload} />
        <hr />
        <ClientEditor
          openEditClient={this.openEditClient}
          cancelEditClient={this.cancelEditClient}
          handleEditClientChange={this.handleEditClientChange}
          handleEditClientDog={this.handleEditClientDog}
          handleEditClientObjectUpdate={this.handleEditClientObjectUpdate}
          saveEditClient={this.saveEditClient}
          deleteClient={this.deleteClient}
          search={this.handleClientEditorSearch}
          client={this.props.clients.active}
          msg={this.props.clients.msg}
          modalOpen={this.state.modalOpen}
          handleCloseMsg={this.handleCloseMsg}
          handleCommentRemove={this.handleCommentRemove}
          clients={this.props.clients.list.filter(client =>
              this.state.searchTerm
              ? `${client.name}${client.dogs.map(dog => dog.name).join(' ')}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
              : true
            )}
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients,
    dogs: state.dogs
  }
}

export default connect(mapStateToProps)(ClientTools)
