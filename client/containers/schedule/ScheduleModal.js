import React from 'react'
import { Modal, Header } from 'semantic-ui-react'
import DogList from '../assignDogs/DogList'
import ScheduledList from './ScheduledList'
import './Schedule.scss'

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
    clearAllScheduled,
    isScheduleFetching,
    msg,
    handleCloseMsg
  }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={cancelScheduleDogs}
      closeOnDimmerClick={false}
      closeIcon
      className='calendar_modal'
    >
      <Header icon='add square' content={`Schedule dogs for ${date}`} />
      <Modal.Content>
        <ScheduledList
          dogs={scheduledDogs}
          unscheduleDog={unscheduleDog}
          handleSaveScheduled={handleSaveScheduled}
          clearAllScheduled={clearAllScheduled}
          isFetching={isScheduleFetching}
          msg={msg}
          handleCloseMsg={handleCloseMsg}
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
