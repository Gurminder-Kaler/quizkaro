import { GET_ALL_SMILIES_STICKERS, ADD_SMILEY_STICKER } from "../actions/types";
const initialState = {
  icons: [],
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SMILIES_STICKERS:
      return {
        ...state,
        icons:
          action.payload && action.payload.data && action.payload.data.data
            ? action.payload.data.data
            : "",
        loading: true,
      };
    case ADD_SMILEY_STICKER:
      return {
        ...state,
        icons:
          action.payload && action.payload.data && action.payload.data.data
            ? action.payload.data.data
            : "",
        loading: true,
      };
    default:
      return state;
  }
}
