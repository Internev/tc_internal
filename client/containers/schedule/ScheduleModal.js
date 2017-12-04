import React from 'react'
import { Modal, Header } from 'semantic-ui-react'
import DogList from '../assignDogs/DogList'
import './Schedule.scss'

const ScheduleModal = (
  {
    modalOpen,
    cancelScheduleDogs,
    date,
    handleDogClick,
    handleSearchTerm,
    searchTerm,
    dogs,
    isFetching,
    error
  }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={cancelScheduleDogs}
      dimmer='blurring'
      closeOnDimmerClick={false}
      closeIcon
      className='calendar_modal'
    >
      <Header icon='add square' content={`Schedule dogs for ${date}`} />
      <Modal.Content>
        <div>Assign dogs here.</div>
        <DogList
          handleDogClick={handleDogClick}
          handleSearchTerm={handleSearchTerm}
          searchTerm={searchTerm}
          dogs={dogs}
          isFetching={isFetching}
          error={error}
          />
      </Modal.Content>
    </Modal>
  )
}

export default ScheduleModal
