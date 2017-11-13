import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const DogCard = ({dog, detailsLink}) => {
  const img = () => {
    if (dog.photo) return <Image src={dog.photo} fluid />
    return <Image src='dog-placeholder.png' fluid />
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
