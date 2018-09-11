import React from 'react'
import { Button, Header, Icon, Modal, Image, Progress } from 'semantic-ui-react'
import './Dog.scss'

const DogUploadModal = ({open, handleClose, title, heading, upload, activate, handleImagePreview, dogImagePreview, handleImageUpload, uploadPercentage, name, gender, number, id, mmsTextChange, mmsText}) => (
  <Modal
    open={open}
    onClose={handleClose}
    size='mini'
    className='dog-upload'
  >
    <Header icon='upload' content={title} />
    <Modal.Content>
      <h3>{heading} of {name}</h3>
      <label htmlFor='dogUpload' className='ui icon button'>
        <Icon name='upload' />
        &nbsp;Choose Photo{title === 'Send the client a Photo' ? '(s)' : ''}
      </label>
      <input
        type='file'
        onChange={e => handleImagePreview(e)}
        accept='image/*'
        id='dogUpload'
        style={{display: 'none'}}
        multiple={title === 'Send the client a Photo'}
      />
      {dogImagePreview
      ? <Image src={dogImagePreview} size='medium' rounded className='dog-upload_preview' />
      : null }
      {title === 'Send the client a Photo'
        ? (<div>
          Add a custom message:
          <textarea
            rows='3'
            cols='40'
            value={mmsText}
            onChange={e => mmsTextChange(e)} />
        </div>)
        : null
      }
    </Modal.Content>
    <Modal.Actions>
      <Button color='orange' onClick={handleClose} inverted>
        <Icon name='remove' /> Cancel
      </Button>
      <Button
        color='green'
        onClick={() => handleImageUpload(id, name, gender, number, mmsText)}
        inverted
        disabled={!dogImagePreview}
        >
        <Icon name='checkmark' /> {activate}
      </Button>
    </Modal.Actions>
  </Modal>
)

export default DogUploadModal
