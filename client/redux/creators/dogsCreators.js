import {
  SET_EDITABLE_DOG
} from '../actions'
// import axios from 'axios'

export function setEditableDog (id) {
  return {
    type: SET_EDITABLE_DOG,
    id
  }
}
