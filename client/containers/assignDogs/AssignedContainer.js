import React from 'react'
import { connect } from 'react-redux'
import AssignedList from './AssignedList'
import { unassignWalker, unassignClient, unassignDog, clearAssigned, saveAssigned, clearAssignedMsg, updateAssignedComment } from '../../redux/creators/assignedCreators'

class AssignedContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      comment: null
    }
    this.unassignClientClick = this.unassignClientClick.bind(this)
    this.unassignDogClick = this.unassignDogClick.bind(this)
    this.unassignWalkerClick = this.unassignWalkerClick.bind(this)
    this.saveAssigned = this.saveAssigned.bind(this)
    this.clearAllAssigned = this.clearAllAssigned.bind(this)
    this.handleCloseMsg = this.handleCloseMsg.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
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
    this.props.dispatch(saveAssigned(this.props.assigned.walker, this.props.assigned.dogs, this.props.assigned.date, this.props.assigned.scheduledDogs, this.props.assigned.comment))
  }
  handleCloseMsg () {
    this.props.dispatch(clearAssignedMsg())
  }
  handleCommentChange (e) {
    this.props.dispatch(updateAssignedComment(e.target.value))
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
        comment={this.props.assigned.comment}
        handleCommentChange={this.handleCommentChange}
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
