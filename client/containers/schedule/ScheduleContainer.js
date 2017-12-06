import React from 'react'
import { connect } from 'react-redux'
// import { unassignWalker, unassignClient, clearAssigned, saveAssigned, clearAssignedMsg } from '../../redux/creators/assignedCreators'
import { getAllDogs } from '../../redux/creators/dogsCreators'
import { setScheduleDate, scheduleDog, unscheduleDog, saveScheduled, getScheduled, clearMsg, getAllEvents } from '../../redux/creators/scheduleCreators'
import BigCalendar from 'react-big-calendar'
import ScheduleModal from './ScheduleModal'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Schedule.scss'
import moment from 'moment'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class CalendarContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      workingDate: null,
      searchTerm: ''
    }
    this.openScheduleDogs = this.openScheduleDogs.bind(this)
    this.handleCancelScheduleDogs = this.handleCancelScheduleDogs.bind(this)
    this.handleDogClick = this.handleDogClick.bind(this)
    this.handleSearchTerm = this.handleSearchTerm.bind(this)
    this.handleUnscheduleDog = this.handleUnscheduleDog.bind(this)
    this.handleSaveScheduled = this.handleSaveScheduled.bind(this)
    this.handleCloseMsg = this.handleCloseMsg.bind(this)
  }
  componentDidMount () {
    if (this.props.dogs.all.length < 1) {
      this.props.dispatch(getAllDogs())
    }
    if (this.props.schedule.events < 1) {
      const startDate = moment().subtract(2, 'weeks')
      this.props.dispatch(getAllEvents(startDate))
    }
  }
  componentDidUpdate () {
    console.log('ScheduleContainer props:', this.props)
  }
  handleDogClick (dog) {
    this.props.dispatch(scheduleDog(dog))
  }
  handleSearchTerm (e) {
    this.setState({searchTerm: e.target.value})
  }
  openScheduleDogs (date) {
    this.props.dispatch(setScheduleDate(date))
    this.props.dispatch(getScheduled(date))
    this.setState({modalOpen: true, workingDate: moment(date).format('dddd MMMM Do, YYYY')})
  }
  handleCancelScheduleDogs () {
    this.setState({modalOpen: false})
  }
  handleUnscheduleDog (id) {
    this.props.dispatch(unscheduleDog(id))
  }
  handleSaveScheduled () {
    console.log('save scheduled clicked!')
    this.props.dispatch(saveScheduled(this.props.schedule.date, this.props.schedule.dogs))
  }
  handleCloseMsg () {
    this.props.dispatch(clearMsg())
  }
  render () {
    return (
      <div className='calendar_container'>
        <ScheduleModal
          modalOpen={this.state.modalOpen}
          date={this.state.workingDate}
          cancelScheduleDogs={this.handleCancelScheduleDogs}
          handleDogClick={this.handleDogClick}
          handleSearchTerm={this.handleSearchTerm}
          searchTerm={this.state.searchTerm}
          scheduledDogs={this.props.schedule.dogs}
          unscheduleDog={this.handleUnscheduleDog}
          allDogs={this.state.searchTerm
            ? this.props.dogs.all.filter(dog =>
              this.state.searchTerm
              ? `${dog.name}${dog.client.name}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
              : true
            )
            : this.props.dogs.all}
          isFetching={this.props.dogs.isFetching}
          error={this.props.dogs.error}
          handleSaveScheduled={this.handleSaveScheduled}
          clearAll={this.clearAllScheduled}
          isScheduleFetching={this.props.schedule.fetching}
          msg={this.props.schedule.msg}
          handleCloseMsg={this.handleCloseMsg}
        />
        <BigCalendar
          selectable
          events={this.props.schedule.events}
          defaultView='month'
          onSelectEvent={e => this.openScheduleDogs(e.start)}
          onSelectSlot={slot => this.openScheduleDogs(slot.start)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schedule: state.schedule,
    dogs: state.dogs
  }
}

export default connect(mapStateToProps)(CalendarContainer)
