import { GET_GUIDELINE, UPDATE_GUIDELINE } from "../actions/types";
// import isEmpty from '../../src/validations/is-empty';

const initialState = {
    guideline: '',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch(action.type) {
        case GET_GUIDELINE:
        return {
            ...state,
            guideline: action.payload,
        };
        case UPDATE_GUIDELINE:
        return {
            ...state,
            guideline: action.payload
        };
        default:
            return state;
    }
}