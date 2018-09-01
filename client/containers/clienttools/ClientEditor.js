import React from 'react'
import { Input, Card, Icon, Modal, Header, Button, Loader, Popup, Radio, Form, Label } from 'semantic-ui-react'
import DogEditor from './DogEditor'
import ClientEditorRadio from './ClientEditorRadio'
import './ClientTools.scss'

const desc = (dogs) => (
  dogs.map((dog, i) => (
    <div key={i}>
      <Icon name='paw' />
      {dog.name}
    </div>
  ))
)

const ClientEditor = ({
  search,
  client,
  clients,
  openEditClient,
  cancelEditClient,
  saveEditClient,
  deleteClient,
  handleEditClientChange,
  handleEditClientObjectUpdate,
  handleEditClientDog,
  handleRemoveClientDog,
  handleCommentRemove,
  modalOpen
}) => {
  return (
    <div className='client_editor'>
      <h3>Edit Client Details ({clients.length} total clients)</h3>
      <Loader active={clients.isFetching} />
      <Modal
        open={modalOpen}
        onClose={cancelEditClient}
        closeOnDimmerClick={false}
        closeIcon
      >
        <Header icon='user' content='Edit Client' />
        <Modal.Content>
          <div className='client_editor-form'>
            <h4>Client Details</h4>
            <div>
              <Input type='text' name='name' fluid label={{content: 'Name:'}}
                value={client.name} labelPosition='left' onChange={e => handleEditClientChange(e)} />
            </div>
            <div>
              <Input type='text' name='email' fluid label={{content: 'Email:'}}
                value={client.email} labelPosition='left' onChange={e => handleEditClientChange(e)} />
            </div>
            <div>
              <Input type='text' name='phone' fluid label={{content: 'Phone:'}}
                value={client.phone} labelPosition='left' onChange={e => handleEditClientChange(e)} />
            </div>
            <div>
              <Input type='text' name='address' fluid label={{content: 'Address:'}}
                value={client.address} labelPosition='left' onChange={e => handleEditClientChange(e)} />
            </div>
            <div>
              <Input type='text' name='payment' fluid label={{content: 'Payment Type:'}}
                value={client.payment} labelPosition='left' onChange={e => handleEditClientChange(e)} />
            </div>
            <div>
              <Input type='text' name='accessType' fluid label={{content: 'Access Type:'}}
                value={client.access && client.access.type} labelPosition='left' onChange={e => handleEditClientChange(e)} />
            </div>
            <div>
              <Input type='text' name='accessInfo' fluid label={{content: 'Access Info:'}}
                value={client.access && client.access.info} labelPosition='left' onChange={e => handleEditClientChange(e)} />
            </div>
            <div>
              <Input type='text' name='accessCode' fluid label={{content: 'Access Code:'}}
                value={client.access && client.access.code} labelPosition='left' onChange={e => handleEditClientChange(e)} />
            </div>
            <div>
              <Input type='text' name='social' fluid label={{content: 'Social Media:'}}
                value={client.social} labelPosition='left' onChange={e => handleEditClientChange(e)} />
            </div>
            <h4>{client.dogs && client.dogs.length > 1 ? 'Dogs' : 'Dog'}</h4>
            {client.dogs ? client.dogs.map((dog, i) => <DogEditor key={dog.id} dog={dog} handleEditClientDog={handleEditClientDog} handleRemoveClientDog={handleRemoveClientDog} index={i} handleCommentRemove={handleCommentRemove} />) : null}
            <h4>Emergency Contact Details</h4>
            <div>
              <Input type='text' name='emergency.name' fluid label={{content: 'Emergency Contact:'}}
                value={client.emergency ? client.emergency.name : ''} labelPosition='left' onChange={e => handleEditClientObjectUpdate(e)} />
              <Input type='text' name='emergency.phone' fluid label={{content: 'Emergency Phone:'}}
                value={client.emergency ? client.emergency.phone : ''} labelPosition='left' onChange={e => handleEditClientObjectUpdate(e)} />
            </div>
            <h4>Veterinarian Details</h4>
            <div>
              <Input type='text' name='vet.practice' fluid label={{content: 'Preferred Vet Practice:'}}
                value={client.vet ? client.vet.practice : ''} labelPosition='left' onChange={e => handleEditClientObjectUpdate(e)} />
              <Input type='text' name='vet.name' fluid label={{content: 'Preferred Vet Contact:'}}
                value={client.vet ? client.vet.name : ''} labelPosition='left' onChange={e => handleEditClientObjectUpdate(e)} />
              <Input type='text' name='vet.phone' fluid label={{content: 'Preferred Vet Phone:'}}
                value={client.vet ? client.vet.phone : ''} labelPosition='left' onChange={e => handleEditClientObjectUpdate(e)} />
              <Input type='text' name='vet.address' fluid label={{content: 'Preferred Vet Address:'}}
                value={client.vet ? client.vet.address : ''} labelPosition='left' onChange={e => handleEditClientObjectUpdate(e)} />
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Popup
            trigger={<Button color='red' icon='remove user' content='Delete Client' />}
            content={<Button color='red' icon='warning' content='Confirm Delete' onClick={() => deleteClient(client)} />}
            on='click'
            position='top right'
          />
          <Button color='orange' onClick={cancelEditClient}>
            <Icon name='remove' /> Cancel Changes
          </Button>
          <Button color='green' onClick={saveEditClient}>
            <Icon name='checkmark' /> Save Changes
          </Button>
        </Modal.Actions>
      </Modal>
      <div>
        <Input
          placeholder='Search by dog or client name'
          icon='search'
          fluid
          onChange={e => search(e)}
          className='client_editor-input'
          />
      </div>
      <div className='client_editor-results'>
        <Card.Group itemsPerRow={4}>
          {clients.map((client, i) => (
            <Card
              key={i}
              header={client.name}
              meta={client.email}
              description={desc(client.dogs)}
              onClick={e => openEditClient(client)}
              />
            ))}
        </Card.Group>
      </div>
    </div>
  )
}

export default ClientEditor
