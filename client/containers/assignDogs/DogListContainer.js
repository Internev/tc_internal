import React from 'react'
import { connect } from 'react-redux'
import DogList from './DogList'
import { getAllDogs } from '../../redux/creators/dogsCreators'
import { assignDog } from '../../redux/creators/assignedCreators'

class DogListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchTerm: ''}
    this.handleDogClick = this.handleDogClick.bind(this)
    this.handleSearchTerm = this.handleSearchTerm.bind(this)
  }
  componentDidMount () {
    if (this.props.dogs.all.length < 1) {
      this.props.dispatch(getAllDogs())
    }
  }
  componentDidUpdate () {
    console.log('DogListContainer props:', this.props)
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
      <DogList
        handleDogClick={this.handleDogClick}
        handleSearchTerm={this.handleSearchTerm}
        searchTerm={this.state.searchTerm}
        dogs={this.state.searchTerm
          ? this.props.dogs.all.filter(dog =>
            this.state.searchTerm
            ? `${dog.name}${dog.client.name}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
            : true
          )
          : this.props.dogs.all}
        isFetching={this.props.dogs.isFetching}
        error={this.props.dogs.error}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs
  }
}

export default connect(mapStateToProps)(DogListContainer)
