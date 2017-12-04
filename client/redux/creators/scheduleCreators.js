import {
  SET_SCHEDULE_DATE,
  SCHEDULE_DOG,
  UNSCHEDULE_DOG
} from '../actions'
import axios from 'axios'

export function setScheduleDate (date) {
  return {
    type: SET_SCHEDULE_DATE,
    date
  }
}

export function scheduleDog (dog) {
  return {
    type: SCHEDULE_DOG,
    dog
  }
}

export function unscheduleDog (id) {
  return {
    type: UNSCHEDULE_DOG,
    id
  }
}
