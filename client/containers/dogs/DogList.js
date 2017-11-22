import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import dogPlaceholder from '../../imgs/dog-placeholder.png'

const img = (dog) => {
  return dog.photo
  ? <Image src={dog.photo} fluid />
: <Image src={dogPlaceholder} fluid />
}

const desc = (dog) => (
  <div className='doglist_desc'>
    <div>
      Address: {dog.address}
    </div>
    <div>
      Issues: {dog.issues}
    </div>
    <Button>
      Details
    </Button>
    <Button>
      Picked Up
    </Button>
  </div>
)

const DogList = ({dogs}) => (
  <Card.Group>
    {dogs.map(dog => (
      <Card
        header={dog.name}
        meta={`${dog.gender} ${dog.breed}`}
        image={img(dog)}
        description={desc(dog)}
      />
    ))}
  </Card.Group>
)

export default DogList
