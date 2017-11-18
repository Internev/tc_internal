import React from 'react'
import { connect } from 'react-redux'
// import { Card, Input, Dimmer, Loader, Icon } from 'semantic-ui-react'
import { parseClientCSV } from '../../utils/csvParsers'
import { uploadClients, getClients, setActiveClient, clearActiveClient, updateActiveClient } from '../../redux/creators/clientsCreators'
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
  }
  componentDidMount () {
    // console.log('Client Tools props:', this.props)
    if (this.props.clients.list.length < 1) this.props.dispatch(getClients())
  }
  componentDidUpdate () {
    console.log('Client Tools props:', this.props, this.state)
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
    console.log('Edit client change:', e)
    console.log('Target name:', e.target.name, 'target value:', e.target.value)
    const update = {}
    update[e.target.name] = e.target.value
    this.props.dispatch(updateActiveClient(update))
  }
  saveEditClient () {
    this.setState({modalOpen: false})
    console.log('going to save client:', this.props.clients.active)
  }
  render () {
    return (
      <div>
        <ClientCSVUpload handleClientCSVUpload={this.handleClientCSVUpload} />
        <hr />
        <ClientEditor
          openEditClient={this.openEditClient}
          cancelEditClient={this.cancelEditClient}
          handleEditClientChange={this.handleEditClientChange}
          saveEditClient={this.saveEditClient}
          search={this.handleClientEditorSearch}
          client={this.props.clients.active}
          modalOpen={this.state.modalOpen}
          clients={this.state.searchTerm
            ? this.props.clients.list.filter(client =>
              this.state.searchTerm
              ? `${client.name}${client.email}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
              : true
            )
            : []}
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
