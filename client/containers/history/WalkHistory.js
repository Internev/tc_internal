import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import moment from 'moment'

const WalkHistory = ({all, handleAccordionClick, activeIndex}) => {
  const panels = (walks) => {
    return walks
    .filter(walk => walk.dogs.length)
    .map(walk => {
      return {
        title: `${moment(walk.date).format('MMMM Do YYYY')}: ${walk.dogs.length} dogs walked.`,
        content: {
          content: (
            <div>
              {walk.dogs.map((dog, i) => (
                <div key={i}><b>{dog.name}</b> (owned by {dog.client.name})</div>
              ))}
            </div>
          ),
          key: 'content-dog'
        }
      }
    })
  }
  return (
    <div>
      <h4>Walk History</h4>
      <Accordion styled defaultActiveIndex={0} panels={panels(all)} />
    </div>
  )
}
export default WalkHistory
