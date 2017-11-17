import React from 'react'
import { Icon } from 'semantic-ui-react'
import './ClientTools.scss'

const ClientEditor = ({handleClientEditor}) => (
  <div className='client_editor'>
    <h3>Edit Client Details</h3>
    <div>
      <span>Search for a client to edit.</span>
    </div>
  </div>
)

export default ClientEditor
