import React from 'react'
import { Card, Popup, Button, Checkbox } from 'semantic-ui-react'

const UserCard = ({user, toggleAdmin, toggleWalker, deleteUser}) => {
  const updateRole = (
    <div>
      <Checkbox
        label='Walker'
        checked={user.walker}
        onChange={e => toggleWalker(user)}
      />
      <hr />
      <Checkbox
        label='Administrator'
        checked={user.admin}
        onChange={e => toggleAdmin(user)}
      />
      <hr />
      <Popup
        trigger={<Button basic color='red' icon='remove user' content='Delete User' />}
        content={<Button color='red' icon='warning' content='Confirm Delete' onClick={() => deleteUser(user)} />}
        on='click'
        position='top right'
      />
    </div>
  )
  return (
    <Card
      header={user.name}
      meta={user.admin
        ? 'Administrator'
        : user.walker ? 'Walker' : 'Inactive'}
      description={`Email Address: ${user.email}`}
      extra={updateRole}
    />
  )
}

export default UserCard
