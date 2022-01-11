import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ALL_PROFESSIONS,
    UPDATE_PROFESSION,
    ADD_PROFESSION
} from "../actions/types";
const initialState = {
    profile: null,
    profiles: null,
    loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case GET_ALL_PROFESSIONS:
            return {
                ...state,
                professions: action.payload,
                loading: false
            };
        case UPDATE_PROFESSION:
            return {
                ...state,
                professions: action.payload,
                loading: false
            };
        case ADD_PROFESSION:
            return {
                ...state,
                profession: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };

        default:
            return state;
    }
}