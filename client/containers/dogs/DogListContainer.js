import React from 'react'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import DogList from './DogList'
import { setEditableDog, getDogs, getUserThenDogs } from '../../redux/creators/dogsCreators'

class DogListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.detailsLink = this.detailsLink.bind(this)
  }
  componentDidMount () {
    // console.log('doglistcontainer mounted, props:', this.props)
    if (!this.props.auth.id) {
      this.props.dispatch(getUserThenDogs())
    } else {
      this.props.dispatch(getDogs(this.props.auth.id))
    }
  }
  componentDidUpdate () {
    console.log('doglistcontainer updated, props:', this.props)
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
        <Dimmer inverted active={this.props.auth.isFetching || this.props.dogs.isFetching}>
          <Loader />
        </Dimmer>
        <DogList
          dogs={this.props.dogs.list}
          detailsLink={this.detailsLink}
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(DogListContainer)
