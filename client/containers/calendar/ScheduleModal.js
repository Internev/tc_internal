import React from 'react'
import { Modal, Header } from 'semantic-ui-react'

const ScheduleModal = ({modalOpen, cancelScheduleDogs, date}) => {
  return (
    <Modal
      open={modalOpen}
      onClose={cancelScheduleDogs}
      dimmer='blurring'
      closeOnDimmerClick={false}
      closeIcon
    >
      <Header icon='add square' content={`Schedule dogs for ${date}`} />
      <Modal.Content>
        <div>Assign dogs here.</div>
      </Modal.Content>
    </Modal>
  )
}

export default ScheduleModal
