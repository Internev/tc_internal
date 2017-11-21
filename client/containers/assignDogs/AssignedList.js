import React from 'react'
import './AssignDogs.scss'
import { Input, Card, Icon, Message, Dimmer, Button, Loader } from 'semantic-ui-react'

const desc = (dogs) => (
  dogs.map((dog, i) => (
    <div key={i}>
      <Icon name='paw' />
      {dog.name}
    </div>
  ))
)

const AssignedList = ({walker, clients, unassignWalker, unassignClient, saveAssigned, clearAll, isFetching, msg, handleCloseMsg}) => (
  <div className={walker.name || clients.length ? 'assign_selected' : ''}>
    <Dimmer active={isFetching}>
      <Loader>Saving Assignments...</Loader>
    </Dimmer>
    {msg
      ? <Message
        onDismiss={handleCloseMsg}
        icon
        color='yellow'
        >
        <Icon name='info' size='small' />
        {msg}
      </Message>
      : null}
    <div className='assign_selected-active'>
      <div className='assign_selected-walker'>
        {walker.name
        ? <Card
          header={walker.name}
          meta='click to remove'
          description='Assigned Walker'
          color='teal'
          onClick={() => unassignWalker()}
          />
        : null}
      </div>
      <div className='assign_selected-clients'>
        <Card.Group itemsPerRow={5}>
          {clients.map((client, i) => (
            <Card
              key={i}
              header={client.name}
              meta='click to remove'
              description={desc(client.dogs)}
              onClick={() => unassignClient(client)}
              color='olive'
            />
          ))}
        </Card.Group>
      </div>
    </div>
    {walker.name && clients.length
    ? <div className='assign_selected-actions'>
      <Button color='orange' onClick={clearAll}><Icon name='remove' /> Clear All</Button>
      <Button color='green' onClick={saveAssigned}><Icon name='checkmark' /> Save Assignments</Button>
    </div>
    : null}
  </div>
)

export default AssignedList
