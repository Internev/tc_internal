import React from 'react'
import { Input, Card, Icon, Modal, Header, Button, Loader } from 'semantic-ui-react'

const desc = (dogs) => (
  dogs.map((dog, i) => (
    <div key={i}>
      <Icon name='paw' />
      {dog.name}
    </div>
  ))
)

const ClientList = ({
  handleClientClick,
  clients,
  searchTerm,
  handleSearchTerm,
  isFetching,
  error
}) => (
  <div className='assign_clientlist'>
    <Loader active={isFetching} />
    <h4>Clients</h4>
    <Input
      fluid
      icon='search'
      className='assign_filter'
      placeholder='Filter by name or email address'
      value={searchTerm}
      onChange={e => handleSearchTerm(e)}
      />
    <Card.Group itemsPerRow={3}>
      {clients.map((client, i) => (
        <Card
          key={i}
          header={client.name}
          meta={client.email}
          description={desc(client.dogs)}
          onClick={() => handleClientClick(client)}
        />
      ))}
    </Card.Group>
  </div>
)

export default ClientList
