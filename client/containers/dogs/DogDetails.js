import React from 'react'
import { connect } from 'react-redux'
import { Image, Dimmer, Progress } from 'semantic-ui-react'
import axios from 'axios'
import dogPlaceholder from '../../imgs/dog-placeholder.png'
import DogUploadModal from './DogUploadModal'
import './Dog.scss'
import { setEditableDog } from '../../redux/creators/dogsCreators'

class DogDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      uploadProgress: false,
      uploadPercentage: 0,
      dogImagePreview: '',
      file: ''
    }
    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleImagePreview = this.handleImagePreview.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
  }
  componentDidMount () {
    const paramId = parseInt(this.props.match.params.id)
    if ('' + this.props.dogs.editing.id !== paramId) {
      this.props.dispatch(setEditableDog(paramId))
    }
  }
  componentDidUpdate () {
    console.log('dog details state:', this.state)
  }
  handleModalOpen () { this.setState({modalOpen: true}) }
  handleModalClose () { this.setState({modalOpen: false}) }
  handleImagePreview (e) {
    e.preventDefault()
    let preview = new FileReader()
    let binaryFile = new FileReader()
    let file = e.target.files[0]
    this.setState({file: file})
    preview.onloadend = () => {
      this.setState({dogImagePreview: preview.result})
      console.log('file is:', file)
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

    axios.post('/api/dog-upload', fd, config)
      .then(res => {
        console.log('upload finished, res:', res)
        that.setState({uploadProgress: false})
      })
      .catch(err => {
        console.log('Dog image upload failed, err:', err)
        that.setState({uploadProgress: false})
      })
  }
  render () {
    const d = this.props.dogs.editing
    const img = () => {
      return d.photo
      ? <Image
        src={d.photo}
        size='medium'
        rounded
        floated='left'
        />
      : <Image
        src={dogPlaceholder}
        size='medium'
        rounded
        floated='left'
        onClick={this.handleModalOpen}
        className='dog_upload'
        />
    }
    return (
      <div>
        {d
        ? <div className='dog-details'>
          {img()}
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
          <div className='dog-details_content'>
            <div className='dog-details_content-item'>
              <span>Name: </span>{d.name}
            </div>
            <div className='dog-details_content-item'>
              <span>Breed: </span>{d.breed}
            </div>
            <div className='dog-details_content-item'>
              <span>Age: </span>{d.age}
            </div>
            <div className='dog-details_content-item'>
              <span>Notes: </span>{d.notes}
            </div>
          </div>
        </div>
        : <div>Sorry, this dog doesn't exist, or you do not have access to its details at the moment.</div>}
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
