import React from 'react'
import { connect } from 'react-redux'
import DetailsView from './DetailsView'
import { getAllDogs } from '../../redux/creators/dogsCreators'
import { setScheduleDate, scheduleDog, unscheduleDog, saveScheduled, getScheduled, clearMsg, getAllEvents } from '../../redux/creators/scheduleCreators'
import {receiveDaySchedule} from '../../redux/creators/assignedCreators'
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
      searchTerm: '',
      recurrence: {},
      recurrenceModal: {}
    }
    this.openScheduleDogs = this.openScheduleDogs.bind(this)
    this.handleCancelScheduleDogs = this.handleCancelScheduleDogs.bind(this)
    this.handleDogClick = this.handleDogClick.bind(this)
    this.handleSearchTerm = this.handleSearchTerm.bind(this)
    this.handleUnscheduleDog = this.handleUnscheduleDog.bind(this)
    this.handleSaveScheduled = this.handleSaveScheduled.bind(this)
    this.handleCloseMsg = this.handleCloseMsg.bind(this)
    this.assignThisDay = this.assignThisDay.bind(this)
    this.handleRecurrenceFreq = this.handleRecurrenceFreq.bind(this)
    this.handleRecurrenceDuration = this.handleRecurrenceDuration.bind(this)
    this.handleRecurrenceCancel = this.handleRecurrenceCancel.bind(this)
    this.handleRecurrenceModal = this.handleRecurrenceModal.bind(this)
  }
  componentDidMount () {
    if (this.props.dogs.all.length < 1) {
      this.props.dispatch(getAllDogs())
    }
    // if (this.props.schedule.events < 1) {
    const startDate = moment().subtract(6, 'months')
    this.props.dispatch(getAllEvents(startDate))
    // }
  }
  componentDidUpdate () {
    // console.log('ScheduleContainer state:', this.state)
  }
  handleDogClick (dog) {
    this.props.dispatch(scheduleDog(dog))
  }
  handleSearchTerm (e) {
    this.setState({searchTerm: e.target.value})
  }
  openScheduleDogs (date) {
    // console.log('open schedule dogs, receives date:', date)
    this.props.dispatch(setScheduleDate(date))
    this.props.dispatch(getScheduled(date))
    this.setState({modalOpen: true, workingDate: date})
  }
  handleCancelScheduleDogs () {
    this.setState({modalOpen: false})
  }
  handleUnscheduleDog (id) {
    this.props.dispatch(unscheduleDog(id))
  }
  handleSaveScheduled () {
    this.props.dispatch(saveScheduled(this.props.schedule.date, this.props.schedule.dogs, this.state.recurrence))
  }
  handleCloseMsg () {
    this.props.dispatch(clearMsg())
  }
  assignThisDay () {
    // console.log('Assign this day, date:', this.props.schedule.date, '\ndogs:', this.props.schedule.dogs)
    this.props.dispatch(receiveDaySchedule(this.props.schedule.date, this.props.schedule.dogs))
    this.props.history.push('/assign-dogs')
  }
  handleRecurrenceFreq (dog, freq) {
    const newRec = {...this.state.recurrence}
    if (!newRec[dog.id]) newRec[dog.id] = {freq: 1, duration: 0}
    newRec[dog.id].freq = freq
    this.setState({recurrence: newRec})
  }
  handleRecurrenceDuration (dog, duration) {
    const newRec = {...this.state.recurrence}
    if (!newRec[dog.id]) newRec[dog.id] = {freq: 1, duration: 0}
    newRec[dog.id].duration = parseInt(duration)
    this.setState({recurrence: newRec})
  }
  handleRecurrenceCancel (dog) {
    const newRec = {...this.state.recurrence}
    delete newRec[dog.id]
    this.setState({recurrence: newRec})
    this.handleRecurrenceModal(dog.id, false)
  }
  handleRecurrenceModal (id, open) {
    const newRecModal = {...this.state.recurrenceModal}
    newRecModal[id] = open
    this.setState({recurrenceModal: newRecModal})
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
          assignThisDay={this.assignThisDay}
          isScheduleFetching={this.props.schedule.fetching}
          msg={this.props.schedule.msg}
          handleCloseMsg={this.handleCloseMsg}
          recurrenceState={this.state.recurrence}
          handleRecurrenceFreq={this.handleRecurrenceFreq}
          handleRecurrenceDuration={this.handleRecurrenceDuration}
          handleRecurrenceCancel={this.handleRecurrenceCancel}
          recurrenceModal={this.state.recurrenceModal}
          handleRecurrenceModal={this.handleRecurrenceModal}
        />
        <BigCalendar
          selectable
          events={this.props.schedule.events}
          views={{
            day: DetailsView,
            week: true,
            month: true,
            agenda: true
          }}
          defaultView='day'
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
