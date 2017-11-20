import React from 'react'
import './AssignDogs.scss'
import WalkerListContainer from './WalkerListContainer'
import ClientListContainer from './ClientListContainer'

const AssignDogs = () => (
  <div className='assign'>
    <div className='assign_summary'>Summary Bit</div>
    <div className='assign_container'>
      <div className='assign_walkers'>
        <WalkerListContainer />
      </div>
      <div className='assign_dogs'>
        <ClientListContainer />
      </div>
    </div>
  </div>
)

export default AssignDogs
