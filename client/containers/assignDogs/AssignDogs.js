import React from 'react'
import './AssignDogs.scss'
import WalkerListContainer from './WalkerListContainer'
import ClientListContainer from './ClientListContainer'
import DogListContainer from './DogListContainer'
import AssignedContainer from './AssignedContainer'

const AssignDogs = () => (
  <div className='assign'>
    <div className='assign_summary'>
      <AssignedContainer />
    </div>
    <div className='assign_container'>
      <div className='assign_walkers'>
        <WalkerListContainer />
      </div>
      <div className='assign_dogs'>
        <DogListContainer />
      </div>
    </div>
  </div>
)

export default AssignDogs
