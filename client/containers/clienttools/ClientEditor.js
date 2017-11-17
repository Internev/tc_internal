import React from 'react'
import { Input, Card } from 'semantic-ui-react'
import './ClientTools.scss'

const ClientEditor = ({search, clients}) => (
  <div className='client_editor'>
    <h3>Edit Client Details</h3>
    <div>
      <Input
        placeholder='Search by client name or email address'
        icon='search'
        fluid
        onChange={e => search(e)}
        className='client_editor-input'
        />
    </div>
    <div className='client_editor-results'>
      <Card.Group itemsPerRow={4}>
        {clients.map((client, i) => (
          <Card
            header={client.name}
            meta={client.email}
            description={client.dogs}
            />
          ))}
      </Card.Group>
    </div>
  </div>
)

export default ClientEditor
