import React from 'react'
import { connect } from 'react-redux'
import { unassignWalker, unassignClient, clearAssigned, saveAssigned, clearAssignedMsg } from '../../redux/creators/assignedCreators'
import BigCalendar from 'react-big-calendar'
import ScheduleModal from './ScheduleModal'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.scss'
import moment from 'moment'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class CalendarContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      workingDate: null
    }
    this.openScheduleDogs = this.openScheduleDogs.bind(this)
    this.cancelScheduleDogs = this.cancelScheduleDogs.bind(this)
  }
  componentDidMount () {
  }
  componentDidUpdate () {
  }
  openScheduleDogs (date) {
    console.log('date selected:', date)
    this.setState({modalOpen: true, workingDate: moment(date).format('dddd MMMM Do, YYYY')})
  }
  cancelScheduleDogs () {
    this.setState({modalOpen: false})
  }
  render () {
    const events = [
      {
        title: 'Event number one',
        allDay: true,
        start: new Date(),
        end: new Date()
      }
    ]
    return (
      <div className='calendar_container'>
        <ScheduleModal
          modalOpen={this.state.modalOpen}
          date={this.state.workingDate}
          cancelScheduleDogs={this.cancelScheduleDogs}
        />
        <BigCalendar
          selectable
          events={events}
          defaultView='month'
          onSelectEvent={e => console.log('selected event:', e)}
          onSelectSlot={slot => this.openScheduleDogs(slot.start)}
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
