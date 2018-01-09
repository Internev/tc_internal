import React from 'react'
import { Modal, Header } from 'semantic-ui-react'
import DogList from './DogList'
import ScheduledList from './ScheduledList'
import './Schedule.scss'
import moment from 'moment'

const ScheduleModal = (
  {
    modalOpen,
    cancelScheduleDogs,
    date,
    handleDogClick,
    handleSearchTerm,
    searchTerm,
    scheduledDogs,
    unscheduleDog,
    allDogs,
    isFetching,
    error,
    handleSaveScheduled,
    assignThisDay,
    isScheduleFetching,
    msg,
    handleCloseMsg,
    recurrenceState,
    handleRecurrenceFreq,
    handleRecurrenceDuration,
    handleRecurrenceCancel,
    recurrenceModal,
    handleRecurrenceModal
  }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={cancelScheduleDogs}
      closeOnDimmerClick={false}
      closeIcon
      className='calendar_modal'
    >
      <Header icon='add square' content={`Schedule dogs for ${moment(date).format('dddd MMMM Do, YYYY')}`} />
      <Modal.Content>
        <ScheduledList
          dogs={scheduledDogs}
          unscheduleDog={unscheduleDog}
          handleSaveScheduled={handleSaveScheduled}
          assignThisDay={assignThisDay}
          isFetching={isScheduleFetching}
          msg={msg}
          handleCloseMsg={handleCloseMsg}
          date={date}
          handleRecurrenceFreq={handleRecurrenceFreq}
          handleRecurrenceDuration={handleRecurrenceDuration}
          handleRecurrenceCancel={handleRecurrenceCancel}
          recurrenceModal={recurrenceModal}
          handleRecurrenceModal={handleRecurrenceModal}
          recurrenceState={recurrenceState}
        />
        <DogList
          handleDogClick={handleDogClick}
          handleSearchTerm={handleSearchTerm}
          searchTerm={searchTerm}
          dogs={allDogs}
          isFetching={isFetching}
          error={error}
          />
      </Modal.Content>
    </Modal>
  )
}

export default ScheduleModal
