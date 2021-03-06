import React from 'react'
import './AssignDogs.scss'
import { Form, Card, Icon, Message, Dimmer, Button, Loader, Label } from 'semantic-ui-react'

const AssignedList = ({walker, clients, dogs, unassignWalker, unassignClient, unassignDog, saveAssigned, clearAll, isFetching, msg, handleCloseMsg, comment,
handleCommentChange}) => (
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
          {dogs.map((dog, i) => (
            <Card
              key={i}
              header={dog.name}
              meta='click to remove'
              description={`Owner: ${dog.client.name}`}
              onClick={() => unassignDog(dog)}
              color='olive'
            />
          ))}
        </Card.Group>
      </div>
    </div>
    {walker.name
    ? <div className='assign_selected-actions'>
      <Form className='assign_selected-actions-comment'>
        <Form.Field>
          <Label size='large'>Comment:</Label>
          <textarea
            rows='2'
            name='comment'
            value={comment || ''}
            onChange={e => handleCommentChange(e)} />
        </Form.Field>
      </Form>
      <Button color='orange' onClick={clearAll}><Icon name='remove' /> Cancel</Button>
      <Button color='green' onClick={saveAssigned}><Icon name='checkmark' /> Save Assignments</Button>
    </div>
    : null}
  </div>
)

export default AssignedList
