import React from 'react'
import { Card, Image, Button, Popup } from 'semantic-ui-react'
import dogPlaceholder from '../../imgs/dog-placeholder.png'
import './Dog.scss'

const img = (dog) => {
  return dog.photo
  ? <Image src={dog.photo} fluid />
: <Image src={dogPlaceholder} fluid />
}

const desc = (dog, link, update, index, handlePopupOpen, handlePopupClose, popups) => (
  <div className='doglist_desc'>
    <div>
      Address: <a href={`https://maps.google.com.au/maps?q=${dog.client.address}`} target='_blank'>{dog.client.address}</a>
    </div>
    {dog.client && dog.client.keylock
    ? (
      <div>
        Keycode: {dog.client.keycode}
      </div>
    )
    : (
      <div>
        Pickup details: {dog.client && dog.client.access && dog.client.access.type}
      </div>
    )}
    <div className='doglist_desc-buttons'>
      <Button onClick={e => link(dog.id)}>
        Details
      </Button>
      {!dog.pickedUp
        ? <Popup
          key={dog.id}
          trigger={<Button content='Picked Up' color='teal' />}
          content={
            <Button
              content='Confirm Pickup'
              color='teal'
              onClick={() => update(index, dog, 'picked up')} />}
          on='click'
          open={popups[dog.id]}
          onOpen={() => handlePopupOpen(dog.id)}
          onClose={() => handlePopupClose(dog.id)}
          position='top left'
          />
        : !dog.droppedOff
          ? <Popup
            key={dog.id}
            trigger={<Button content='Dropped Off' color='olive' />}
            content={
              <Button
                content='Confirm Drop Off'
                color='olive'
                onClick={() => update(index, dog, 'dropped off')} />}
            on='click'
            open={popups[dog.id]}
            onOpen={() => handlePopupOpen(dog.id)}
            onClose={() => handlePopupClose(dog.id)}
            position='top left'
            />
          : <Button content='Walked!' color='green' icon='thumbs up' />
      }
    </div>
  </div>
)

const DogList = ({dogs, detailsLink, handleUpdateStatus, handlePopupOpen, handlePopupClose, popups}) => (
  <Card.Group className='doglist_container'>
    {dogs.map((dog, index) => (
      <Card
        key={dog.id}
        header={dog.name}
        meta={`${dog.gender} ${dog.breed}`}
        image={img(dog)}
        description={desc(dog, detailsLink, handleUpdateStatus, index, handlePopupOpen, handlePopupClose, popups)}
      />
    ))}
  </Card.Group>
)

export default DogList
