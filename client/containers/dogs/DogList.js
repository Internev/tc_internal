import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import dogPlaceholder from '../../imgs/dog-placeholder.png'
import './Dog.scss'

const img = (dog) => {
  return dog.photo
  ? <Image src={dog.photo} fluid />
: <Image src={dogPlaceholder} fluid />
}

const desc = (dog, link) => (
  <div className='doglist_desc'>
    <div>
      Address: {dog.client.address}
    </div>
    {dog.client && dog.client.keylock
    ? (
      <div>
        Keycode: {dog.client.keycode}
      </div>
    )
    : (
      <div>
        Pickup details: {dog.client && dog.client.pickupDetails}
      </div>
    )}
    <div className='doglist_desc-buttons'>
      <Button onClick={e => link(dog.id)}>
        Details
      </Button>
      <Button>
        Picked Up
      </Button>
    </div>
  </div>
)

const DogList = ({dogs, detailsLink}) => (
  <Card.Group className='doglist_container'>
    {dogs.map(dog => (
      <Card
        key={dog.id}
        header={dog.name}
        meta={`${dog.gender} ${dog.breed}`}
        image={img(dog)}
        description={desc(dog, detailsLink)}
      />
    ))}
  </Card.Group>
)

export default DogList
