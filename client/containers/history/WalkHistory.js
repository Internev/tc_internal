import React from 'react'
import { Accordion } from 'semantic-ui-react'
import moment from 'moment'

const WalkHistory = ({all, current, handleAccordionClick, activeIndex}) => {
  const rootPanels = (dateBlocks) => {
    return dateBlocks.map((dateBlock, i) => {
      return {
        title: `Fortnight starting ${moment(dateBlock.date).format('MMMM Do YYYY')}`,
        content: {
          content: (
            <div>
              <h4>Total {dateBlock.walks.reduce((a, w) => a += w.dogs.length, 0)} Dogs Walked</h4>
              <Accordion.Accordion styled panels={innerPanels(dateBlock.walks)} />
            </div>
          )
        },
        key: dateBlock.date
      }
    })
  }
  const innerPanels = (walks) => {
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
          key: walk.id
        }
      }
    })
  }
  return (
    <div>
      <h4>Current Pay Period (starts {moment(current.date).format('MMMM Do YYYY')})</h4>
      <h4>Total {current.walks.reduce((a, w) => a += w.dogs.length, 0)} Dogs Walked</h4>
      <div>
        <Accordion styled panels={innerPanels(current.walks)} />
      </div>
      <h4>Walk History</h4>
      <Accordion styled panels={rootPanels(all)} />
    </div>
  )
}
export default WalkHistory
