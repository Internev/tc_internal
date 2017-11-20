import React from 'react'
import { connect } from 'react-redux'
import AssignedList from './AssignedList'
import { unassignWalker, unassignClient, clearAssigned, saveAssigned } from '../../redux/creators/assignedCreators'

class assignedContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchTerm: ''}
    this.unassignClientClick = this.unassignClientClick.bind(this)
    this.unassignWalkerClick = this.unassignWalkerClick.bind(this)
    this.saveAssigned = this.saveAssigned.bind(this)
    this.clearAllAssigned = this.clearAllAssigned.bind(this)
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
  render () {
    return (
      <AssignedList
        walker={this.props.assigned.walker}
        clients={this.props.assigned.clients}
        unassignWalker={this.unassignWalkerClick}
        unassignClient={this.unassignClientClick}
        saveAssigned={this.saveAssigned}
        clearAll={this.clearAllAssigned}
        isFetching={this.props.assigned.isFetching}
       />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    assigned: state.assigned
  }
}

export default connect(mapStateToProps)(assignedContainer)
