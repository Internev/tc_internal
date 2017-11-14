import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import DogCard from './DogCard'
import { setEditableDog } from '../../redux/creators/dogsCreators'

class DogList extends React.Component {
  constructor (props) {
    super(props)
    this.detailsLink = this.detailsLink.bind(this)
  }
  componentDidMount () {
    // console.log('doglist mounted, props:', this.props)
  }
  uploadDogImage () {

  }
  detailsLink (id) {
    this.props.dispatch(setEditableDog(id))
    this.props.history.push('/dog-details/' + id)
  }
  render () {
    return (
      <div>
        <Card.Group itemsPerRow={4} stackable>
          {this.props.dogs.dogs.map((dog, i) => (
            <DogCard key={i} dog={dog} detailsLink={this.detailsLink} />
          ))}
        </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs
  }
}

export default connect(mapStateToProps)(DogList)
