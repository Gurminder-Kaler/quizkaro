import axios from 'axios'
// import { toast } from "react-toastify";

import { GET_ERRORS, GET_ALL_FRIENDS } from './types'

import { API_URL } from '../common/Constant'

// Get all SmileySticker
export const getAllFriends = userId => dispatch => {
  console.log('user', userId)
  const data = {
    userId: userId
  }
  axios
    .post(API_URL + '/friendRequest/getAllFriendsViaId', data)
    .then(result => {
      console.log('result actions', result)
      dispatch(getAllFriendsAction(result))
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}

// get All friends
export const getAllFriendsAction = res => {
  return { type: GET_ALL_FRIENDS, payload: res }
}
