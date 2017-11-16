import React from 'react'
import { connect } from 'react-redux'
import { Card, Input, Dimmer, Loader, Icon } from 'semantic-ui-react'
import { parseClientCSV } from '../../utils/csvParsers'
import { uploadClients } from '../../redux/creators/clientsCreators'
// import UserCard from './UserCard'
import './ClientTools.scss'

class ClientTools extends React.Component {
  constructor (props) {
    super(props)
    this.handleClientCSVUpload = this.handleClientCSVUpload.bind(this)
  }
  componentDidMount () {
    console.log('Client Tools props:', this.props)
  }
  componentDidUpdate () {
    console.log('Client Tools props:', this.props)
  }
  handleClientCSVUpload (e) {
    let reader = new FileReader()
    reader.onload = (file) => {
      this.props.dispatch(uploadClients(parseClientCSV(file.target.result)))
    }
    reader.readAsText(e.target.files[0])
  }
  render () {
    return (
      <div>
        <label htmlFor='clientCSV' className='ui icon button'>
          <Icon name='upload' />
          &nbsp;Upload Client CSV
        </label>
        <input
          type='file'
          onChange={e => this.handleClientCSVUpload(e)}
          accept='.csv'
          id='clientCSV'
          style={{display: 'none'}}
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
