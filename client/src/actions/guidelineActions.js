import axios from 'axios'
import { toast } from 'react-toastify'

import { GET_GUIDELINE, UPDATE_GUIDELINE, GET_ERRORS } from './types'

import { API_URL } from '../common/Constant'

// GET_GUIDELINE
export const getGuideline = type => dispatch => {
  axios
    .get(API_URL + '/guideline/getGuideline/' + type)
    .then(result => {
      dispatch(getGuidelineAction(result))
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}
// /add SmileySticker
export const updateGuideline = payload => dispatch => {
  let data = {
    data: payload.data,
    type: payload.type
  }
  axios
    .post(API_URL + '/guideline/updateGuideline', data)
    .then(result => {
      dispatch(updateGuidelineAction(result))
      toast.success(result.data.message, { autoClose: 2300 })
    })
    .catch(
      err => console.log('🚀 ~ err', err)
      // dispatch({type: GET_ERRORS, payload: err.response})
    )
}

//getGuidelineAction
export const getGuidelineAction = res => {
  return { type: GET_GUIDELINE, payload: res }
}

// updateGuidelineAction
export const updateGuidelineAction = res => {
  return { type: UPDATE_GUIDELINE, payload: res }
}
