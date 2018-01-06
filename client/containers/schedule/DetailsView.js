import React from 'react'
import BigCalendar from 'react-big-calendar'
import { connect } from 'react-redux'
import moment from 'moment'
import { getScheduled } from '../../redux/creators/scheduleCreators'
import { Button, Card } from 'semantic-ui-react'
import './Schedule.scss'

class DetailsView extends React.Component {
  constructor (props) {
    super(props)
    this.handleAssignClick = this.handleAssignClick.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(getScheduled(this.props.date))
  }
  componentDidUpdate () {
    console.log('Details View updated, props:', this.props)
  }
  handleAssignClick () {
    this.props.onSelectSlot({start: this.props.date})
  }
  render () {
    const sortedByWalkerObj = this.props.schedule.dogs.reduce((a, dog) => {
      const walker = dog.assignedTo && dog.assignedTo.name
      console.log('walker is:', walker)
      if (!walker) {
        if (a['Unassigned']) {
          a['Unassigned'].push(dog)
        } else {
          a['Unassigned'] = [dog]
        }
      } else if (a[walker]) {
        a[walker].push(dog)
      } else {
        a[walker] = [dog]
      }
      return a
    }, {})
    const sortedByWalker = []
    for (let key in sortedByWalkerObj) {
      sortedByWalker.push(sortedByWalkerObj[key])
    }
    const desc = (dog) => {
      const addr = dog.client.address.split(',')
      const suburb = addr[addr.length - 3]
      return (
        <div className='assign_doglist-desc'>
          <div>
            {`Owner: ${dog.client.name}`}
          </div>
          <div>
            {`Suburb: ${suburb}`}
          </div>
        </div>
      )
    }
    const dogCards = (dogs) => (
      <Card.Group>
        {dogs.map((dog, i) => (
          <Card
            header={dog.name}
            meta={dog.breed}
            description={desc(dog)}
          />
        ))}
      </Card.Group>
    )
    return (
      <div className='details-view'>
        <Button
          className='details-view_button'
          color='green'
          icon='pencil'
          content='Modify this schedule'
          onClick={this.handleAssignClick}
        />
        <Card.Group>
          {sortedByWalker.map((dogs, i) => {
            const name = dogs[0].assignedTo
              ? dogs[0].assignedTo.name
              : 'Unassigned'
            return (
              <Card
                header={name}
                meta={name === 'Unassigned' ? `nobody's walking these hounds yet` : 'is scheduled to walk'}
                description={dogCards(dogs)}
                />
            )
          })}
        </Card.Group>
      </div>
    )
  }
}

DetailsView.navigate = (date, action) => {
  switch (action) {
    case BigCalendar.Navigate.PREVIOUS:
      return moment(date).subtract(1, 'days')

    case BigCalendar.Navigate.NEXT:
      return moment(date).add(1, 'days')

    default:
      return date
  }
}

DetailsView.title = (date, { formats, culture }) => {
  return `Details for: ${moment(date).format('dddd MMM DD')}`
}

const mapStateToProps = (state) => {
  return {
    schedule: state.schedule,
    dogs: state.dogs
  }
}

export default connect(mapStateToProps)(DetailsView)
