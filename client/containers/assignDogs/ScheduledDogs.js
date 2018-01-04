import React from 'react'
import { Input, Card, Loader } from 'semantic-ui-react'

const ScheduledDogs = ({
  handleDogClick,
  dogs,
  searchTerm,
  handleSearchTerm,
  isFetching,
  error
}) => {
  const sameOwner = dogs.reduce((a, dog) => {
    a[dog.client.name]
      ? a[dog.client.name] += 1
      : a[dog.client.name] = 1
    return a
  }, {})
  for (let key in sameOwner) {
    if (sameOwner[key] === 1) {
      delete sameOwner[key]
    } else {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      sameOwner[key] = `rgba(${r}, ${g}, ${b}, 0.2)`
    }
  }
  console.log('SameOwner obj:', sameOwner)
  const desc = (dog) => (
    <div className='assign_doglist-desc'>
      <div>
        {`Owner: ${dog.client.name}`}
      </div>
      {dog.assignedTo && dog.assignedTo.name
      ? <div>{`Assigned to: ${dog.assignedTo.name}`}</div>
      : null
      }
    </div>
  )
  return (
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
              description={desc(dog)}
              onClick={() => handleDogClick(dog)}
              style={sameOwner[dog.client.name]
                ? {background: sameOwner[dog.client.name]}
                : null
              }
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
              description={desc(dog)}
            />
        ))}
      </Card.Group>
    </div>
  )
}

export default ScheduledDogs
