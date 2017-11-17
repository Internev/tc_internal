import React from 'react'
import { Icon } from 'semantic-ui-react'
import './ClientTools.scss'

const ClientCSVUpload = ({handleClientCSVUpload}) => (
  <div className='client_csv-upload'>
    <h3>Upload New Client</h3>
    <div>
      <span>To add a new client direct from the survey, download their data as a csv then:</span>
      <label htmlFor='clientCSV' className='ui icon button'>
        <Icon name='upload' />
        &nbsp;Upload Client CSV
      </label>
      <input
        type='file'
        onChange={e => handleClientCSVUpload(e)}
        accept='.csv'
        id='clientCSV'
        style={{display: 'none'}}
        />
    </div>
  </div>
)

export default ClientCSVUpload
