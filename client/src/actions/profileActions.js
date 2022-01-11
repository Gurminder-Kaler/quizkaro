import axios from 'axios'
import { toast } from 'react-toastify'

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_ALL_PROFESSIONS,
  UPDATE_PROFESSION,
  ADD_PROFESSION
} from './types'

import { API_URL } from '../common/Constant'
// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile')
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Delete current Account and Profile
export const deleteAccount = () => dispatch => {
  dispatch(setProfileLoading())
  if (
    window.confirm(
      "Are you sure you want to delete the account you won't be able to recover the profile?"
    )
  )
    axios
      .delete('/api/profile')
      .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Get all Profession
export const getAllProfessions = () => dispatch => {
  axios
    .get(API_URL + '/profession/getAllProfessions')
    .then(result => {
      dispatch(getAllProfessionsAction(result))
    })
    .catch(
      err => console.log('🚀 ~ file: profileActions.js ~ line 40 ~ err', err)
      // dispatch({type: GET_ERRORS, payload: err.response})
    )
}

// Update Profession
export const updateProfession = (payload, state) => dispatch => {
  axios
    .post(API_URL + '/profession/updateProfession', payload)
    .then(result => {
      dispatch(updateProfessionAction(result))
      toast.success('Profession updated successfully')
    })
    .catch(
      err => console.log('🚀 ~ file: profileActions.js ~ line 40 ~ err', err)
      // dispatch({type: GET_ERRORS, payload: err.response})
    )
}

// /Update Profession
export const addProfession = payload => dispatch => {
  axios
    .post(API_URL + '/profession/addProfession', payload)
    .then(result => {
      dispatch(addProfessionAction(result))
      axios
        .get(API_URL + '/profile/getAllProfessions')
        .then(result => {
          dispatch(getAllProfessionsAction(result))
        })
        .catch(
          err =>
            console.log('🚀 ~ file: profileActions.js ~ line 40 ~ err', err)
          // dispatch({type: GET_ERRORS, payload: err.response})
        )
      toast.success('Profession added successfully')
    })
    .catch(
      err => console.log('🚀 ~ file: addProfession.js ~ line 40 ~ err', err)
      // dispatch({type: GET_ERRORS, payload: err.response})
    )
}

//Add Profession
export const addProfessionAction = res => {
  return { type: ADD_PROFESSION, payload: res }
}

// Update Profession
export const updateProfessionAction = res => {
  return { type: UPDATE_PROFESSION, payload: res }
}

// Profile loading
export const getAllProfessionsAction = res => {
  return { type: GET_ALL_PROFESSIONS, payload: res }
}
// Profile loading
export const setProfileLoading = () => {
  return { type: PROFILE_LOADING }
}

// Clear profile
export const clearCurrentProfile = () => {
  return { type: CLEAR_CURRENT_PROFILE }
}
