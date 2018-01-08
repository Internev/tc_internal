import React from 'react'
import './Schedule.scss'
import { Input, Card, Icon, Message, Dimmer, Button, Loader } from 'semantic-ui-react'

const ScheduledList = ({dogs, unscheduleDog, handleSaveScheduled, assignThisDay, isFetching, msg, handleCloseMsg}) => (
  <div>
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
    <div>
      <div className='scheduled_container'>
        {dogs
          .filter(dog => !dog.assignedTo)
          .map((dog, i) => (
            <div className='scheduled_card' key={i}>
              <div><b>{dog.name}</b><span> - {dog.client.name}</span></div>
              <Button className='scheduled_card-right' size='mini' onClick={() => unscheduleDog(dog.id)}>Remove</Button>
            </div>
        ))}
      </div>
    </div>
    <div className='scheduled_actions'>
      <Button color='purple' onClick={assignThisDay}><Icon name='add user' /> Assign Walkers for this Schedule</Button>
      <Button color='green' onClick={handleSaveScheduled}><Icon name='checkmark' /> Save Schedule</Button>
    </div>
    <div>
      Already assigned:
      {dogs
        .filter(dog => dog.assignedTo)
        .map((dog, i) => (
          <div className='scheduled_card' key={i}>
            <div><b>{dog.name}</b><span> - {dog.client.name}. Walker: {dog.assignedTo.name}</span></div>
          </div>
        ))
      }
    </div>
  </div>
)

export default ScheduledList
