import axios from 'axios'
// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

import {
  GET_ERRORS,
  GET_ALL_REPORT_MESSAGES,
  GET_ALL_REPORT_TYPES,
  ADD_REPORT_TYPE,
  CHANGE_REPORT_TYPE_STATUS
} from './types'

// getAllReportMessagesSentToSkyBook
import { API_URL } from '../common/Constant'

export const addReportType = data => dispatch => {
  axios
    .post(API_URL + '/helpAndSupport/addReportType', data)
    .then(result => {
      dispatch(addReportTypeAction(result))

      toast.success(result.data.message, { autoClose: 2300 })
      dispatch(getAllReportTypes(dispatch))
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}

export const getAllReportTypes = () => dispatch => {
  axios
    .get(API_URL + '/helpAndSupport/getAllReportTypes')
    .then(result => {
      dispatch(getAllReportTypesAction(result))
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}

export const changeReportTypeStatus = data => dispatch => {
  // console.log("data", data);
  axios
    .post(API_URL + '/helpAndSupport/changeReportTypeStatus', data)
    .then(result => {
      console.log('result', result)
      dispatch(changeReportTypeStatusAction(result))
      toast.success('Status changed successfully', { autoClose: 2300 })
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}

export const getAllReportMessagesSentToSkyBook = () => dispatch => {
  axios
    .get(API_URL + '/helpAndSupport/getAllReportMessagesSentToSkyBook')
    .then(result => {
      dispatch(getAllReportMessagesSentToSkyBookAction(result))
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}

export const getAllReportTypesAction = res => {
  console.log('GET_ALL_REPORT_TYPES', res)
  return { type: GET_ALL_REPORT_TYPES, payload: res }
}

export const getAllReportMessagesSentToSkyBookAction = res => {
  console.log('GET_ALL_REPORT_MESSAGES', res)
  return { type: GET_ALL_REPORT_MESSAGES, payload: res }
}

export const addReportTypeAction = res => {
  console.log('ADD_REPORT_TYPE', res)
  return { type: ADD_REPORT_TYPE, payload: res }
}

export const changeReportTypeStatusAction = res => {
  console.log('changeReportTypeStatusAction', res)
  return { type: CHANGE_REPORT_TYPE_STATUS, payload: res }
}
