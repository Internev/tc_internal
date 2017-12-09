import React from 'react'
import { connect } from 'react-redux'
import './AssignDogs.scss'
import WalkerListContainer from './WalkerListContainer'
import ScheduledDogsContainer from './ScheduledDogsContainer'
import AssignedContainer from './AssignedContainer'
import moment from 'moment'

const AssignDogs = ({assigned: {date: displayDate}}) => (
  <div className='assign'>
    {displayDate
      ? <h4>Assigning dogs for {moment(displayDate).format('dddd, MMM Do')}</h4>
      : null
    }
    <div className='assign_summary'>
      <AssignedContainer />
    </div>
    <div className='assign_container'>
      <div className='assign_walkers'>
        <WalkerListContainer />
      </div>
      <div className='assign_dogs'>
        <ScheduledDogsContainer />
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    assigned: state.assigned
  }
}

export default connect(mapStateToProps)(AssignDogs)
