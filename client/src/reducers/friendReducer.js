import { GET_ALL_FRIENDS } from '../actions/types'
const initialState = {
  friend: null,
  friends: null,
  loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FRIENDS:
      return {
        ...state,
        friends: action.payload.data.data,
        loading: true
      }
    default:
      return state
  }
}
