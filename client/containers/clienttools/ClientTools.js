import React from 'react'
import { connect } from 'react-redux'
// import { Card, Input, Dimmer, Loader, Icon } from 'semantic-ui-react'
import { parseClientCSV } from '../../utils/csvParsers'
import { uploadClients, getClients } from '../../redux/creators/clientsCreators'
import ClientCSVUpload from './ClientCSVUpload'
import ClientEditor from './ClientEditor'
import './ClientTools.scss'

class ClientTools extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchTerm: ''}
    this.handleClientCSVUpload = this.handleClientCSVUpload.bind(this)
    this.handleClientEditorSearch = this.handleClientEditorSearch.bind(this)
  }
  componentDidMount () {
    console.log('Client Tools props:', this.props)
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
  render () {
    return (
      <div>
        <ClientCSVUpload handleClientCSVUpload={this.handleClientCSVUpload} />
        <hr />
        <ClientEditor
          search={this.handleClientEditorSearch}
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
