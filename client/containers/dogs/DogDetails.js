import React from 'react'
import differenceInYears from 'date-fns/difference_in_years'
import differenceInMonths from 'date-fns/difference_in_months'
import { Image, Header, List, Icon, Form } from 'semantic-ui-react'
import './Dog.scss'
import dogPlaceholder from '../../imgs/dog-placeholder.png'

const DogDetails = ({dog, handleModalOpen, addComment, comment, handleCommentChange}) => {
  const emergency = (em) => {
    if (em) {
      return (
        <List.Item>
          <List.Header>Emergency Contact</List.Header>
          <List.Content><b>Name: </b>{em.name}</List.Content>
          <List.Content><b>Phone: </b>{em.phone}</List.Content>
        </List.Item>
      )
    }
  }
  const vet = (v) => {
    if (v) {
      return (
        <List.Item>
          <List.Header>Veterinary Details</List.Header>
          <List.Content><b>Practice: </b>{v.practice}</List.Content>
          <List.Content><b>Phone: </b>{v.phone}</List.Content>
          <List.Content><b>Address: </b>{v.address}</List.Content>
          <List.Content><b>Preferred Vet: </b>{v.name}</List.Content>
        </List.Item>
      )
    }
  }
  const comments = (c) => {
    if (c) {
      return (
        <List.Item>
          <List.Header>Comments</List.Header>
          {c.map((com, i) => (
            <List.Content><b>{com.name}: </b>{com.msg}</List.Content>
          ))}
        </List.Item>
      )
    }
  }
  const img = () => {
    return dog.photo
    ? <Image
      src={dog.photo}
      size='medium'
      rounded
      className='dog-details_content-photo'
      />
    : <Image
      src={dogPlaceholder}
      size='medium'
      rounded
      onClick={handleModalOpen}
      className='dog-details_content-photo'
      />
  }
  const age = () => {
    const years = differenceInYears(new Date(), new Date(dog.dob))
    if (years < 1) {
      return `${differenceInMonths(new Date(), new Date(dog.dob))} months old`
    } else if (years < 2) {
      return `1 year old`
    } else {
      return `${years} years old`
    }
  }
  return (
    <div className='dog-details_content'>
      {img()}
      <div className='dog-details_content-items'>
        <Header>
          {dog.name}
          <Header.Subheader>
            {dog.gender} {dog.breed}
          </Header.Subheader>
        </Header>
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content><b>Age: </b>{age()}, (DOB: {dog.dob})</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Address: </b>{dog.address}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Recall: </b>{dog.recall}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Issues: </b>{dog.issues}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Notes: </b>{dog.notes}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Pickup Details: </b>{dog.pickupdetails}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Desexed: </b>{dog.desexed ? <Icon name='checkmark' /> : <Icon name='remove' />}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Vaccinated: </b>{
              dog.vaccinated
              ? <span><Icon name='checkmark' />{
                dog.vacdate ? <span>(most recent: {dog.vacdate})</span> : null
              }</span>
              : <Icon name='remove' />
            }</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Insured: </b>{
              dog.insurance
              ? <span><Icon name='checkmark' />{
                dog.insurer ? <span>(Insurer: {dog.insurer})</span> : null
              }</span>
              : <Icon name='remove' />
          }</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Allergies: </b>{dog.allergies}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Medications: </b>{dog.medications}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content><b>Injuries: </b>{dog.injuries}</List.Content>
          </List.Item>
          <List.Item>
            <List.Header>Owner</List.Header>
            <List.Content><b>Name: </b>{dog.owner}</List.Content>
            <List.Content><b>Phone: </b>{dog.phone}</List.Content>
          </List.Item>
          {emergency(dog.emergency)}
          {vet(dog.vet)}
          {comments(dog.comments)}
          <List.Item>
            <Form onSubmit={addComment}>
              <Form.TextArea
                placeholder='Add a Comment'
                onChange={e => handleCommentChange(e)}
                value={comment}
                />
              <Form.Button>Submit</Form.Button>
            </Form>
          </List.Item>
        </List>
      </div>
    </div>
  )
}

export default DogDetails
