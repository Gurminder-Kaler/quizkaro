import {
  GET_ALL_REPORT_TYPES,
  GET_ALL_REPORT_MESSAGES,
  CHANGE_REPORT_TYPE_STATUS,
  SEND_REPORT_MESSAGE_TO_SKYBOOK,
} from "../actions/types";
const initialState = {
  reports: [],
  reportTypes: [],
  status: true,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_REPORT_MESSAGES:
      return {
        ...state,
        reports:
          action.payload && action.payload.data && action.payload.data.data
            ? action.payload.data.data
            : "",
        loading: true,
      };
    case GET_ALL_REPORT_TYPES:
      return {
        ...state,
        reportTypes:
          action.payload && action.payload.data && action.payload.data.data
            ? action.payload.data.data
            : "",
        loading: true,
      };
    case CHANGE_REPORT_TYPE_STATUS:
      console.log("action.type", action);
      return {
        ...state,
        status:
          action.payload && action.payload.data && action.payload.data.data
            ? action.payload.data.data.status
            : "",
        loading: true,
      };
    case SEND_REPORT_MESSAGE_TO_SKYBOOK:
      console.log("action", action);
      return {
        ...state,
        reports:
          action.payload && action.payload.data && action.payload.data.data
            ? action.payload.data.data
            : "",
        loading: true,
      };
    default:
      return state;
  }
}
