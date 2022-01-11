import {
  GET_ALL_POSTS,
  ADD_POST,
  GET_POST_VIA_ID,
  SET_CURRENT_POST,
} from "../actions/types";
const initialState = {
  post: "",
  currentPost: {},
  posts: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  console.log("actiosn in post reducers", action);
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.data.data,
        loading: true,
      };
    case ADD_POST:
      return {
        ...state,
        loading: true,
      };
    case GET_POST_VIA_ID:
      return {
        ...state,
        currentPost: action.payload,
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };
    default:
      return state;
  }
}
