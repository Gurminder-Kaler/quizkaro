import axios from 'axios'
import { toast } from 'react-toastify'

import {
  GET_ERRORS,
  GET_ALL_SMILIES_STICKERS,
  ADD_SMILEY_STICKER
} from './types'

import { API_URL } from '../common/Constant'

// Get all SmileySticker
export const getAllSmileySticker = type => dispatch => {
  axios
    .get(API_URL + '/smileySticker/getAllSmileySticker/' + type)
    .then(result => {
      dispatch(getAllSmileyStickerAction(result))
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}
// /add SmileySticker
export const addSmileySticker = payload => dispatch => {
  //debugger;
  let formData = new FormData()
  formData.append('icon', payload.icon, payload.icon.name)
  formData.append('type', payload.type)

  axios
    .post(API_URL + '/smileySticker/addSmileySticker', formData)
    .then(result => {
      // dispatch(addSmileyStickerAction(result));
      toast.success('SmileySticker added successfully')
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}

//Add SmileySticker
export const addSmileyStickerAction = res => {
  return { type: ADD_SMILEY_STICKER, payload: res }
}

// getAllSmileySticker
export const getAllSmileyStickerAction = res => {
  return { type: GET_ALL_SMILIES_STICKERS, payload: res }
}
