import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// import userService from '../services/userService';

import {
  GET_ALL_POSTS,
  GET_ERRORS,
  GET_POST_VIA_ID,
  UPDATE_POST,
  ADD_POST,
  SET_CURRENT_POST,
} from "./types";

// Register User
import { API_URL } from "../common/Constant";
export const getAllPosts = (userId) => (dispatch) => {
  const data = {
    userId: userId,
  };
  axios
    .post(API_URL + "/post/getAllPostsViaUserId", data)
    .then((posts) => {
      dispatch(getAllPostsAction(posts));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: "err.response.data",
      })
    );
};
export const getAPostViaId = (id) => (dispatch) => {
  let send = { postId: id };
  axios
    .post(API_URL + "/post/getAPostViaId", send)
    .then((post) => {
      console.log("poststst", post);
      dispatch(getAPostViaIdAction(post));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};
export const setCurrentPost = (post, history) => (dispatch) => {
  console.log("POSTPOST", post);
  dispatch(setCurrentPostAction(post));
};
export const addPost = (postData, history) => (dispatch) => {
  console.log("PostData", postData);
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  axios
    .post(API_URL + "/post/savePost", postData, config)
    .then((result) => {
      if (result.data.success) {
        dispatch(addPostAction(result));
        history.push("/customer/post");
        toast.success(result.data.message, { autoClose: 2300 });
      } else {
        toast.warning(result.data.message, { autoClose: 2300 });
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};
export const updatePost = (postData, history) => (dispatch) => {
  console.log("Post DATA", postData);
  let data = {
    postId: postData.id,
    post: postData.post,
  };
  axios
    .post(API_URL + "/post/updatePost", data)
    .then((result) => {
      if (result.data.success) {
        dispatch(updatePostAction(result));
        history.push("/customer/post");
        toast.success(result.data.message, { autoClose: 2300 });
      } else {
        toast.warning(result.data.message, { autoClose: 2300 });
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const getAllPostsAction = (posts) => {
  return {
    type: GET_ALL_POSTS,
    payload: posts,
  };
};

export const getAPostViaIdAction = (post) => {
  console.log("POST", post);
  return {
    type: GET_POST_VIA_ID,
    payload: post.data.post,
  };
};
export const setCurrentPostAction = (post) => {
  console.log("POST123", post);
  return {
    type: SET_CURRENT_POST,
    payload: post,
  };
};
export const addPostAction = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};
export const updatePostAction = (post) => {
  return {
    type: UPDATE_POST,
    payload: post,
  };
};
