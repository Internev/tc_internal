import React from 'react'
import { Card, Icon, Checkbox } from 'semantic-ui-react'

const UserCard = ({user, toggleAdmin, toggleWalker}) => {
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
