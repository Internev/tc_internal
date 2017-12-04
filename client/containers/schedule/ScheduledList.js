import React from 'react'
import './Schedule.scss'
import { Input, Card, Icon, Message, Dimmer, Button, Loader } from 'semantic-ui-react'

const ScheduledList = ({dogs, unscheduleDog, saveAssigned, clearAll, isFetching, msg, handleCloseMsg}) => (
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
        {dogs.map((dog, i) => (
          <div className='scheduled_card' key={i}>
            <div><b>{dog.name}</b><span> - {dog.client.name}</span></div>
            <Button className='scheduled_card-button' size='mini' onClick={() => unscheduleDog(dog.id)}>Remove</Button>
          </div>
        ))}
      </div>
    </div>
    <div>
      <Button color='orange' onClick={clearAll}><Icon name='remove' /> Clear All</Button>
      <Button color='green' onClick={saveAssigned}><Icon name='checkmark' /> Save Assignments</Button>
    </div>
  </div>
)

export default ScheduledList
