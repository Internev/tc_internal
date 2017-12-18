import {
  WALK_HISTORY_FETCHING,
  WALK_HISTORY_POPULATE,
  WALK_HISTORY_ERROR
} from '../actions'
import {checkToken} from './authCreators'
import axios from 'axios'
import moment from 'moment'

export function getWalkHistory (id) {
  return dispatch => {
    dispatch(isFetching())
    const config = {
      headers: {
        'authorization': localStorage.getItem('id_token'),
        'userid': id
      }
    }
    axios.get('api/history', config)
    .then(res => {
      let startDate, endDate
      if (moment().week() % 2 === 0) {
        startDate = moment().day(-7)
        endDate = moment().day(6)
      } else {
        startDate = moment().day(0)
        endDate = moment().day(14)
      }
      const currentPeriodStart = moment(startDate)
      const groupedWalks = res.data.walks.reduce((a, walk) => {
        let group
        console.log('walk date:', walk.date, 'start date:', startDate)
        if (moment(startDate).isBefore(walk.date)) {
          group = a.pop() || {date: startDate.toDate(), walks: []}
          group.walks.push(walk)
        } else {
          startDate = moment(startDate).day(-14)
          group = {date: startDate.toDate(), walks: []}
          group.walks.push(walk)
        }
        a.push(group)
        return a
      }, [])
      console.log('grouped walks:', groupedWalks)
      if (moment(groupedWalks[0].date).isBefore(moment())) {
        console.log('first walk is current')
      } else {
        console.log('first walk is not current')
      }
      const currentPeriodWalks = moment(groupedWalks[0].date).isBefore(moment())
        ? groupedWalks.pop()
        : {date: currentPeriodStart.toDate(), walks: []}
      return dispatch(populateWalkHistory(groupedWalks, currentPeriodWalks))
    })
    .catch(err => {
      console.log('error from api/history:', err)
      return dispatch(walkHistoryError(err, 'Unable to retrieve walk history. Check your connection and try again.'))
    })
  }
}

export function getIdThenWalkHistory () {
  return (dispatch, getState) => {
    const token = localStorage.getItem('id_token')
    return dispatch(checkToken(token)).then(() => {
      const userId = getState().auth.id
      return dispatch(getWalkHistory(userId))
    })
  }
}

function isFetching () {
  return {
    type: WALK_HISTORY_FETCHING
  }
}

function populateWalkHistory (all, current) {
  return {
    type: WALK_HISTORY_POPULATE,
    all,
    current
  }
}

function walkHistoryError (error, msg) {
  return {
    type: WALK_HISTORY_ERROR,
    error,
    msg
  }
}
