import React from 'react'
import { Input, Card, Loader } from 'semantic-ui-react'

const ScheduledDogs = ({
  handleDogClick,
  dogs,
  searchTerm,
  handleSearchTerm,
  isFetching,
  error
}) => (
  <div className='assign_doglist'>
    <Loader active={isFetching} />
    <h4>Scheduled Dogs</h4>
    <Input
      fluid
      icon='search'
      className='assign_filter'
      placeholder='Filter by dog or client name'
      value={searchTerm}
      onChange={e => handleSearchTerm(e)}
      />
    <h4>Unassigned</h4>
    <Card.Group itemsPerRow={3}>
      {dogs
        .filter(dog => !dog.assignedTo)
        .map((dog, i) => (
          <Card
            key={i}
            header={dog.name}
            meta={dog.breed}
            description={`Owner: ${dog.client.name}`}
            onClick={() => handleDogClick(dog)}
          />
      ))}
    </Card.Group>
    <h4>Assigned</h4>
    <Card.Group itemsPerRow={3}>
      {dogs
        .filter(dog => dog.assignedTo)
        .map((dog, i) => (
          <Card
            key={i}
            header={dog.name}
            meta={dog.breed}
            color='green'
            description={`Assigned to: ${dog.assignedTo.name}`}
          />
      ))}
    </Card.Group>
  </div>
)

export default ScheduledDogs
