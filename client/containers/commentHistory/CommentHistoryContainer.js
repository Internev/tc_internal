import React from 'react'
import { connect } from 'react-redux'
import { getAllDogs } from '../../redux/creators/dogsCreators'

class commentHistoryContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handleCommentChange = this.handleCommentChange.bind(this)
  }
  componentDidMount () {
    if (!this.props.dogs.all.length) this.props.dispatch(getAllDogs())
    console.log('CommentHistory Container mounted, props:', this.props)
  }
  componentDidUpdate () {
    console.log('CommentHistory Container updated, props:', this.props)
  }
  handleCommentChange (e) {
    // this.props.dispatch(updateAssignedComment(e.target.value))
  }
  render () {
    return (
      <div>cmmenthistry</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs
  }
}

export default connect(mapStateToProps)(commentHistoryContainer)
