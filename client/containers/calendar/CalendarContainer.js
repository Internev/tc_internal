import React from 'react'
import { connect } from 'react-redux'
import { unassignWalker, unassignClient, clearAssigned, saveAssigned, clearAssignedMsg } from '../../redux/creators/assignedCreators'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.scss'
import moment from 'moment'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class CalendarContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchTerm: ''}
    this.unassignClientClick = this.unassignClientClick.bind(this)
    this.unassignWalkerClick = this.unassignWalkerClick.bind(this)
    this.saveAssigned = this.saveAssigned.bind(this)
    this.clearAllAssigned = this.clearAllAssigned.bind(this)
    this.handleCloseMsg = this.handleCloseMsg.bind(this)
  }
  componentDidMount () {
  }
  componentDidUpdate () {
  }
  unassignClientClick (client) {
    this.props.dispatch(unassignClient(client))
  }
  unassignWalkerClick () {
    this.props.dispatch(unassignWalker())
  }
  clearAllAssigned () {
    this.props.dispatch(clearAssigned())
  }
  saveAssigned () {
    this.props.dispatch(saveAssigned(this.props.assigned.walker, this.props.assigned.clients))
  }
  handleCloseMsg () {
    this.props.dispatch(clearAssignedMsg())
  }
  render () {
    const events = [
      {
        title: 'Event number one',
        start: new Date(),
        end: new Date()
      }
    ]
    return (
      <div className='calendar_container'>
        <BigCalendar
          selectable
          events={events}
          defaultView='month'
          onSelectEvent={e => console.log('selected event:', e)}
          onSelectSlot={slot => console.log('selected slot:', slot)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    assigned: state.assigned
  }
}

export default connect(mapStateToProps)(CalendarContainer)
