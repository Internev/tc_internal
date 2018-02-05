import React from 'react'
import { connect } from 'react-redux'
import { Dimmer, Loader, Message } from 'semantic-ui-react'
import DogList from './DogList'
import { setEditableDog, getDogs, getUserThenDogs, updateDogStatus } from '../../redux/creators/dogsCreators'

class DogListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      popups: {}
    }
    this.detailsLink = this.detailsLink.bind(this)
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this)
    this.handlePopupOpen = this.handlePopupOpen.bind(this)
    this.handlePopupClose = this.handlePopupClose.bind(this)
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
  }
  handleUpdateStatus (index, dog, status) {
    status = status || 'picked up'
    this.setState({popups: {}})
    this.props.dispatch(updateDogStatus(index, dog, status))
  }
  handlePopupOpen (id) {
    const update = {}
    update[id] = true
    const newPopups = {...this.state.popups, ...update}
    this.setState({popups: newPopups})
  }
  handlePopupClose (id) {
    const update = {}
    update[id] = false
    const newPopups = {...this.state.popups, ...update}
    this.setState({popups: newPopups})
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
        {this.props.dogs.walkComment
          ? <Message
            info
            visible
            icon='announcement'
            content={this.props.dogs.walkComment}
            />
          : null
        }
        <DogList
          dogs={this.props.dogs.assigned}
          detailsLink={this.detailsLink}
          handleUpdateStatus={this.handleUpdateStatus}
          handlePopupOpen={this.handlePopupOpen}
          handlePopupClose={this.handlePopupClose}
          popups={this.state.popups}
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
