import axios from "axios";
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import {
  GET_ALL_GROUPS,
  GET_A_GROUP_VIA_GROUPID,
  GET_MESSAGES_BETWEEN_TWO_USERS,
  GET_ERRORS,
  GET_GROUPS_VIA_USERID,
} from "./types";

import { API_URL } from "../common/Constant";

// getAllGroupsOfAUserAction
export const getGroupsViaUserId = (userId) => (dispatch) => {
  let send = {
    userId: userId,
  };
  axios
    .post(API_URL + "/chat/getGroupsViaUserId", send)
    .then((result) => {
      dispatch(getGroupsViaUserIdAction(result));
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};
// GET_ALL_GROUPS
export const getAllGroups = () => (dispatch) => {
  axios
    .post(API_URL + "/chat/getAllGroups")
    .then((result) => {
      dispatch(getAllGroupsAction(result));
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};

// GET_A_GROUP_VIA_GROUPID
export const getAGroupViaGroupId = (params) => (dispatch) => {
  // console.log('params', params)
  let send = {
    groupId: params.groupId,
  };
  axios
    .post(API_URL + "/chat/getAGroupViaGroupId", send)
    .then((result) => {
      dispatch(getAGroupViaGroupIdAction(result));
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};

// get messages between 2 users (one to one chat)
export const getMessagesBetweenTwoUsers = (params) => (dispatch) => {
  let send = {
    userOne: params.userOne,
    userTwo: params.userTwo,
    deletedType: "for_me",
  };
  axios
    .post(API_URL + "/chat/getMessagesBetweenTwoUsers", send)
    .then((result) => {
      dispatch(getMessagesBetweenTwoUsersAction(result));
    })
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
};

//getMessagesBetweenTwoUsersAction
export const getMessagesBetweenTwoUsersAction = (res) => {
  return { type: GET_MESSAGES_BETWEEN_TWO_USERS, payload: res };
};

//getAllGroups
export const getAllGroupsAction = (res) => {
  return { type: GET_ALL_GROUPS, payload: res };
};
//getAllGroupsviauser id
export const getGroupsViaUserIdAction = (res) => {
  return { type: GET_GROUPS_VIA_USERID, payload: res };
};
//getAGroup
export const getAGroupViaGroupIdAction = (res) => {
  return { type: GET_A_GROUP_VIA_GROUPID, payload: res };
};
