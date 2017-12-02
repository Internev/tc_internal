import React from 'react'
import { connect } from 'react-redux'
import { Dimmer, Progress } from 'semantic-ui-react'
import axios from 'axios'
import DogUploadModal from './DogUploadModal'
import DogDetails from './DogDetails'
import './Dog.scss'
import { getUserThenDogsThenEditable, addDogComment } from '../../redux/creators/dogsCreators'

class DogDetailsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      uploadProgress: false,
      uploadPercentage: 0,
      dogImagePreview: '',
      file: '',
      comment: ''
    }
    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.addComment = this.addComment.bind(this)
    this.handleImagePreview = this.handleImagePreview.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
  }
  componentDidMount () {
    const paramId = parseInt(this.props.match.params.id)
    if ('' + this.props.dogs.editing.id !== paramId) {
      // console.log('dispatching setEditableDog')
      // this.props.dispatch(getUserThenDogs())
      this.props.dispatch(getUserThenDogsThenEditable(paramId))
    }
  }
  componentDidUpdate () {
    // console.log('dog details state:', this.state)
    console.log('dog details props:', this.props)
  }
  handleModalOpen () { this.setState({modalOpen: true}) }
  handleModalClose () { this.setState({modalOpen: false}) }
  handleCommentChange (e) { this.setState({comment: e.target.value}) }
  addComment () {
    this.props.dispatch(addDogComment(this.props.dogs.editing.id, this.props.auth.name, this.state.comment))
    this.setState({comment: ''})
  }
  handleImagePreview (e) {
    e.preventDefault()
    let preview = new FileReader()
    let file = e.target.files[0]
    this.setState({file: file})
    preview.onloadend = () => {
      this.setState({dogImagePreview: preview.result})
      // console.log('file is:', file)
    }

    preview.readAsDataURL(file)
  }
  handleImageUpload (id) {
    this.setState({modalOpen: false, uploadProgress: true})
    const that = this
    let config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'content-type': 'multipart/form-data'
      },
      onUploadProgress (progressEvent) {
        that.setState({uploadPercentage: Math.round((progressEvent.loaded * 100) / progressEvent.total)})
      }
    }
    let fd = new FormData()
    fd.append('file', this.state.file)
    fd.append('id', id)

    axios.post('/api/dogs/upload', fd, config)
      .then(res => {
        console.log('upload finished, res:', res)
        this.props.dispatch(getUserThenDogsThenEditable(res.data.dog.id))
        that.setState({uploadProgress: false})
      })
      .catch(err => {
        console.log('Dog image upload failed, err:', err)
        that.setState({uploadProgress: false})
      })
  }
  render () {
    const d = this.props.dogs.editing
    return (
      <div>
        {d
        ? <div className='dog-details'>
          <DogUploadModal
            open={this.state.modalOpen}
            handleClose={this.handleModalClose}
            handleImagePreview={this.handleImagePreview}
            handleImageUpload={this.handleImageUpload}
            dogImagePreview={this.state.dogImagePreview}
            uploadPercentage={this.state.uploadPercentage}
            name={d.name}
            id={d.id}
            />
          <Dimmer active={this.state.uploadProgress}>
            Uploading Photo...
            <Progress percent={this.state.uploadPercentage} autoSuccess size='large' indicating />
          </Dimmer>
          <DogDetails
            dog={d}
            handleModalOpen={this.handleModalOpen}
            comment={this.state.comment}
            handleCommentChange={this.handleCommentChange}
            addComment={this.addComment}
            />
        </div>
        : <div>Sorry, this dog doesn't exist, or you do not have access to its details at the moment.</div>}
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

export default connect(mapStateToProps)(DogDetailsContainer)
