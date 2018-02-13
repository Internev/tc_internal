import React from 'react'
import { Radio, Form, Label } from 'semantic-ui-react'
import './ClientTools.scss'

const DogEditorRadio = (
  {
    heading,
    fieldname,
    clientProp,
    handleEditClientDog,
    dog,
    index
  }
) => (
  <Form className='client_editor-border'>
    <Form.Field className='client_editor-inline'>
      <Label size='large'>{heading}:</Label>
    </Form.Field>
    <Form.Field className='client_editor-inline'>
      <Radio
        label='Yes'
        name={fieldname}
        value
        checked={clientProp}
        onChange={(e, {value, name}) => {
          e.target.value = value
          e.target.name = name
          return handleEditClientDog(e, dog, index)
        }}
      />
    </Form.Field>
    <Form.Field className='client_editor-inline'>
      <Radio
        label='No'
        name={fieldname}
        value={false}
        checked={!clientProp}
        onChange={(e, {value, name}) => {
          e.target.value = value
          e.target.name = name
          return handleEditClientDog(e, dog, index)
        }}
      />
    </Form.Field>
  </Form>
)

export default DogEditorRadio
