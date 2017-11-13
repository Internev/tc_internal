import {
  SET_EDITABLE_DOG
} from '../actions'

const DEFAULT_STATE = {
  dogs: [
    {
      name: 'Buster',
      breed: 'Poodle',
      photo: 'https://pbs.twimg.com/media/DKXssjMVoAEZwoP.jpg',
      notes: 'Good hound, does not like peanut butter.',
      id: 1
    },
    {
      name: 'Tertius',
      breed: 'Irish Wolfhound',
      photo: '',
      notes: 'Can be saddled and ridden into battle.',
      id: 2
    }
  ],
  editing: {}
}

const setEditableDog = (state, action) => {
  const newEditing = state.dogs.filter(dog => dog.id === action.id)
  const newState = {...state, ...{editing: newEditing[0]}}
  return newState
}

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_EDITABLE_DOG:
      return setEditableDog(state, action)
    default:
      return state
  }
}
