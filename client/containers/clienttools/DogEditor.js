import React from 'react'
import { Input, Label, Form, Icon } from 'semantic-ui-react'
import './ClientTools.scss'
import differenceInYears from 'date-fns/difference_in_years'

const DogEditor = ({dog, handleEditClientDog, index, handleCommentRemove}) => {
  const comments = (com) => {
    if (com) {
      return (
        <div>
          <Label size='large'>Comments:</Label>
          {com.map((c, i) => (
            <div key={i} className='client_editor-comment'>
              <span><b>{c.name}: </b>{c.msg} </span>
              <Icon
                name='remove'
                className='client_editor-comment-remove'
                onClick={() => handleCommentRemove(dog, index, c, i)}
                />
            </div>
          ))}
        </div>
      )
    }
  }
  return (
    <div className='dog-editor'>
      <div>
        <Input type='text' name='name' fluid label={{content: 'Name:'}}
          value={dog.name} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='breed' fluid label={{content: 'Breed:'}}
          value={dog.breed} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='gender' fluid label={{content: 'Gender:'}}
          value={dog.gender} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='dob' fluid labelPosition='right' value={dog.dob} onChange={e => handleEditClientDog(e, dog, index)}>
          <Label>DOB:</Label>
          <input />
          <Label tag color='blue'>Age: {differenceInYears(new Date(), new Date(dog.dob))}</Label>
        </Input>
      </div>
      <div>
        <Input type='text' name='photo' fluid label={{content: 'Photo URL:'}}
          value={dog.photo} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='allergies' fluid label={{content: 'Allergies:'}}
          value={dog.allergies} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='desexed' fluid label={{content: 'Desexed:'}}
          value={dog.desexed} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='injuries' fluid label={{content: 'Injuries:'}}
          value={dog.injuries} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='insurance' fluid label={{content: 'Insurance:'}}
          value={dog.insurance} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='insurer' fluid label={{content: 'Insurer:'}}
          value={dog.insurer} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='issues' fluid label={{content: 'Issues:'}}
          value={dog.issues} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='medications' fluid label={{content: 'Medications:'}}
          value={dog.medications} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='recall' fluid label={{content: 'Recall:'}}
          value={dog.recall} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='vaccinated' fluid label={{content: 'Vaccinated:'}}
          value={dog.vaccinated} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Input type='text' name='vacdate' fluid label={{content: 'Date of last vaccination:'}}
          value={dog.vacdate} labelPosition='left' onChange={e => handleEditClientDog(e, dog, index)} />
      </div>
      <div>
        <Form>
          <Form.Field>
            <Label size='large'>Notes:</Label>
            <textarea rows='3' value={dog.notes} name='notes' onChange={e => handleEditClientDog(e, dog, index)} />
          </Form.Field>
        </Form>
      </div>
      {comments(dog.comments)}
    </div>
  )
}

export default DogEditor
