import React from 'react'
import { Input, Card, Icon, Modal, Header, Button, Loader } from 'semantic-ui-react'

const WalkHistory = ({all}) => (
  <div>
    <h4>Walk History</h4>
    {all.map((walk, i) => (
      <div key={i}>
        <div>
          {walk.dogs.length} dogs walked on {walk.date}.
        </div>
      </div>
    ))}
  </div>
)

export default WalkHistory
