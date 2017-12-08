import React from 'react'
import { connect } from 'react-redux'
import ScheduledDogs from './ScheduledDogs'
import { assignDog, getTodaysSchedule } from '../../redux/creators/assignedCreators'

class ScheduledDogsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchTerm: ''}
    this.handleDogClick = this.handleDogClick.bind(this)
    this.handleSearchTerm = this.handleSearchTerm.bind(this)
  }
  componentDidMount () {
    if (this.props.assigned.scheduledDogs.length < 1) {
      const date = new Date()
      date.setHours(2, 0, 0, 0)
      this.props.dispatch(getTodaysSchedule(date))
      // console.log('ScheduledDogsContainer: no scheduled dogs atm.')
    }
  }
  componentDidUpdate () {
    // console.log('ScheduledDogsContainer props:', this.props)
  }
  handleDogClick (dog) {
    console.log('Making dog active for assigning to walker.', dog)
    this.props.dispatch(assignDog(dog))
  }
  handleSearchTerm (e) {
    this.setState({searchTerm: e.target.value})
  }
  render () {
    return (
      <ScheduledDogs
        handleDogClick={this.handleDogClick}
        handleSearchTerm={this.handleSearchTerm}
        searchTerm={this.state.searchTerm}
        dogs={this.state.searchTerm
          ? this.props.assigned.scheduledDogs.filter(dog =>
            this.state.searchTerm
            ? `${dog.name}${dog.client.name}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
            : true
          )
          : this.props.assigned.scheduledDogs}
        isFetching={this.props.assigned.isFetching}
        error={this.props.assigned.error}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    assigned: state.assigned
  }
}

export default connect(mapStateToProps)(ScheduledDogsContainer)
