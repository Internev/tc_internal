import React from 'react'
import { connect } from 'react-redux'
import WalkHistory from './WalkHistory'
import { getWalkHistory, getIdThenWalkHistory } from '../../redux/creators/walkHistoryCreators'

class HistoryContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handleCommentChange = this.handleCommentChange.bind(this)
  }
  componentDidMount () {
    this.props.auth.id
      ? this.props.dispatch(getWalkHistory(this.props.auth.id))
      : this.props.dispatch(getIdThenWalkHistory())
  }
  componentDidUpdate () {
    console.log('History Container updated, props:', this.props)
  }
  handleCommentChange (e) {
    // this.props.dispatch(updateAssignedComment(e.target.value))
  }
  render () {
    return (
      <WalkHistory
        all={this.props.walkHistory.all}
        current={this.props.walkHistory.current}
        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    walkHistory: state.walkHistory
  }
}

export default connect(mapStateToProps)(HistoryContainer)
