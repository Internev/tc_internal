import React from 'react'
import { Button, Header, Icon, Modal, Image, Progress } from 'semantic-ui-react'
import './Dog.scss'

const DogUploadModal = ({open, handleClose, upload, handleImagePreview, dogImagePreview, handleImageUpload, name, uploadPercentage}) => (
  <Modal
    open={open}
    onClose={handleClose}
    size='mini'
    className='dog-upload'
  >
    <Header icon='upload' content='Upload Dog Image' />
    <Modal.Content>
      <h3>Upload a picture of {name}</h3>
      <label htmlFor='dogUpload' className='ui icon button'>
        <Icon name='upload' />
        &nbsp;Choose Photo
      </label>
      <input
        type='file'
        onChange={e => handleImagePreview(e)}
        accept='image/*'
        id='dogUpload'
        style={{display: 'none'}}
      />
      {dogImagePreview
      ? <Image src={dogImagePreview} size='medium' rounded className='dog-upload_preview' />
      : null }
    </Modal.Content>
    <Modal.Actions>
      <Button color='orange' onClick={handleClose} inverted>
        <Icon name='remove' /> Cancel
      </Button>
      <Button
        color='green'
        onClick={handleImageUpload}
        inverted
        disabled={!dogImagePreview}
        >
        <Icon name='checkmark' /> Upload
      </Button>
    </Modal.Actions>
  </Modal>
)

export default DogUploadModal
