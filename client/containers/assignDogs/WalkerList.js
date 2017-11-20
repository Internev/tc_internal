import React from 'react'
import { Input, Card, Icon, Modal, Header, Button, Loader } from 'semantic-ui-react'

const WalkerList = ({
  handleWalkerClick,
  walkers,
  searchTerm,
  handleSearchTerm,
  isFetching,
  error
}) => (
  <div className='assign_walkerlist'>
    <Loader active={isFetching} />
    <h4>Walkers</h4>
    <Input
      fluid
      icon='search'
      className='assign_filter'
      placeholder='Filter by name or email address'
      value={searchTerm}
      onChange={e => handleSearchTerm(e)}
      />
    <Card.Group itemsPerRow={1}>
      {walkers.map((walker, i) => (
        <Card
          key={i}
          header={walker.name}
          meta={walker.email}
          description={`Ph: ${walker.phone}`}
          onClick={() => handleWalkerClick(walker)}
        />
      ))}
    </Card.Group>
  </div>
)

export default WalkerList
