import React from 'react'
import { connect } from 'react-redux'
import CommentHistory from './CommentHistory'
import { getAllDogs } from '../../redux/creators/dogsCreators'
import { Item } from 'semantic-ui-react'

class commentHistoryContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handleCommentChange = this.handleCommentChange.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(getAllDogs())
    console.log('CommentHistory Container mounted, props:', this.props.dogs.all.filter(dog => dog.comments))
  }
  componentDidUpdate () {
    console.log('CommentHistory Container updated, props:', this.props)
  }
  handleCommentChange (e) {
    // this.props.dispatch(updateAssignedComment(e.target.value))
  }
  render () {
    return (
      <div>
        {this.props.dogs.all
          .filter(dog => dog.comments)
          .map(dog => <CommentHistory dog={dog} />)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs
  }
}

export default connect(mapStateToProps)(commentHistoryContainer)
