import React from 'react'
import './Schedule.scss'
import { Input, Card, Icon, Message, Dimmer, Button, Loader, Popup, Form, Dropdown } from 'semantic-ui-react'
import moment from 'moment'

const ScheduledList = ({
  dogs,
  unscheduleDog,
  handleSaveScheduled,
  assignThisDay,
  isFetching,
  msg,
  handleCloseMsg,
  date,
  recurrenceState,
  handleRecurrenceFreq,
  handleRecurrenceDuration,
  handleRecurrenceCancel,
  recurrenceModal,
  handleRecurrenceModal
  }) => {
  const recurrence = (dog) => {
    const freq = [
      {text: 'Weekly', value: 1},
      {text: 'Fortnightly', value: 2},
      {text: 'Every three weeks', value: 3},
      {text: 'Every four weeks', value: 4}
    ]
    return (
      <div className='scheduled_recurrence'>
        <h4>Set Recurring Booking starting {moment(date).format('dddd MMMM Do, YYYY')}</h4>
        <div>
          <span>Recurrence frequency:&nbsp;</span>
          <Dropdown
            options={freq}
            defaultValue={freq[0].value}
            onChange={(e, {value}) => handleRecurrenceFreq(dog, value)}
          />
        </div>
        <div>
          <span>Number of weeks to repeat:</span>
          <Input
            type='number'
            onChange={(e) => handleRecurrenceDuration(dog, e.target.value)}
            />
        </div>
        {recurrenceState[dog.id]
          ? <div>
            Walking {dog.name} every {recurrenceState[dog.id].freq} weeks for {recurrenceState[dog.id].duration} weeks, until {moment(date).add(recurrenceState[dog.id].duration, 'weeks').calendar()}
          </div>
          : null
        }
        <div>
          <Button color='green' onClick={() => handleRecurrenceModal(dog.id, false)}>Add recurrence</Button>
          <Button color='orange' onClick={() => handleRecurrenceCancel(dog)}>Clear</Button>
        </div>
      </div>
    )
  }
  return (
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
                {recurrenceState[dog.id]
                  ? <div>
                    Walking {dog.name} every {recurrenceState[dog.id].freq} weeks for {recurrenceState[dog.id].duration} weeks, until {moment(date).add(recurrenceState[dog.id].duration, 'weeks').calendar()}
                  </div>
                  : null
                }
                <Popup
                  wide='very'
                  trigger={<Button className='scheduled_card-right' icon='setting' size='mini' />}
                  content={recurrence(dog)}
                  open={recurrenceModal[dog.id]}
                  onOpen={() => handleRecurrenceModal(dog.id, true)}
                  onClose={() => handleRecurrenceModal(dog.id, false)}
                  on='click'
                  position='top right'
                />
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
}

export default ScheduledList
