import React from 'react'
import { connect } from 'react-redux'
// import { logoutUser } from '../../redux/creators/userCreators'

class DogDetails extends React.Component {
  componentWillMount () {
    if (this.props.dogs.editing.id !== this.props.match.params.id) {
      // get dog from param >> from list of dogs.
      console.log('DogDetails props no editable:', this.props)
    }
    console.log('DogDetails props:', this.props)
  }
  render () {
    const d = this.props.dogs.editing
    return (
      <div>
        This is dog details. Name: {d.name}, Breed: {d.breed}, id: {d.id}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs
  }
}

export default connect(mapStateToProps)(DogDetails)
