import {
  GET_ALL_GROUPS,
  GET_A_GROUP_VIA_GROUPID,
  GET_MESSAGES_BETWEEN_TWO_USERS,
  GET_GROUPS_VIA_USERID,
} from "../actions/types";
// import isEmpty from '../../src/validations/is-empty'

const initialState = {
  groups: [],
  group: "",
  messages: [],
  message: "",
  userOne: {},
  userTwo: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  console.log("ChAT REDUCER ACTION", action);
  switch (action.type) {
    case GET_ALL_GROUPS:
      return {
        ...state,
        groups: action.payload.data.data,
      };
    case GET_A_GROUP_VIA_GROUPID:
      return {
        ...state,
        group: action.payload.data.data,
        messages: action.payload.data.chat,
      };
    case GET_MESSAGES_BETWEEN_TWO_USERS:
      return {
        ...state,
        messages: action.payload.data.chat,
        userOne: action.payload.data.userOne,
        userTwo: action.payload.data.userTwo,
      };
    case GET_GROUPS_VIA_USERID:
      return {
        ...state,
        groups: action.payload.data.data,
      };
    default:
      return state;
  }
}
