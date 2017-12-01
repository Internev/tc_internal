import React from 'react'
import { connect } from 'react-redux'
import AssignedList from './AssignedList'
import { unassignWalker, unassignClient, unassignDog, clearAssigned, saveAssigned, clearAssignedMsg } from '../../redux/creators/assignedCreators'

class AssignedContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchTerm: ''}
    this.unassignClientClick = this.unassignClientClick.bind(this)
    this.unassignDogClick = this.unassignDogClick.bind(this)
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
  unassignDogClick (dog) {
    this.props.dispatch(unassignDog(dog))
  }
  unassignWalkerClick () {
    this.props.dispatch(unassignWalker())
  }
  clearAllAssigned () {
    this.props.dispatch(clearAssigned())
  }
  saveAssigned () {
    this.props.dispatch(saveAssigned(this.props.assigned.walker, this.props.assigned.dogs))
  }
  handleCloseMsg () {
    this.props.dispatch(clearAssignedMsg())
  }
  render () {
    return (
      <AssignedList
        walker={this.props.assigned.walker}
        clients={this.props.assigned.clients}
        dogs={this.props.assigned.dogs}
        unassignWalker={this.unassignWalkerClick}
        unassignClient={this.unassignClientClick}
        unassignDog={this.unassignDogClick}
        saveAssigned={this.saveAssigned}
        clearAll={this.clearAllAssigned}
        isFetching={this.props.assigned.isFetching}
        msg={this.props.assigned.msg}
        handleCloseMsg={this.handleCloseMsg}
       />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    assigned: state.assigned
  }
}

export default connect(mapStateToProps)(AssignedContainer)
