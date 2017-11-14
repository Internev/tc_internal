import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import dogPlaceholder from '../../imgs/dog-placeholder.png'

const DogCard = ({dog, detailsLink}) => {
  const img = () => {
    // console.log('dog image', dogPlaceholder)
    return dog.photo
    ? <Image src={dog.photo} fluid />
  : <Image src={dogPlaceholder} fluid />
  }
  return (
    <Card
      header={dog.name}
      meta={dog.breed}
      image={img()}
      description={dog.notes}
      onClick={() => detailsLink(dog.id)}
    />
  )
}

export default DogCard
