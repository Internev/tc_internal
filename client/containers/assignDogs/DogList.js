import React from 'react'
import { Input, Card, Loader } from 'semantic-ui-react'

const DogList = ({
  handleDogClick,
  dogs,
  searchTerm,
  handleSearchTerm,
  isFetching,
  error
}) => (
  <div className='assign_doglist'>
    <Loader active={isFetching} />
    <h4>Dogs</h4>
    <Input
      fluid
      icon='search'
      className='assign_filter'
      placeholder='Filter by dog or client name'
      value={searchTerm}
      onChange={e => handleSearchTerm(e)}
      />
    <Card.Group itemsPerRow={3}>
      {dogs.map((dog, i) => (
        <Card
          key={i}
          header={dog.name}
          meta={dog.breed}
          description={`Owner: ${dog.client.name}`}
          onClick={() => handleDogClick(dog)}
        />
      ))}
    </Card.Group>
  </div>
)

export default DogList
