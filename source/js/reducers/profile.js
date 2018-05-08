import { Map } from "immutable";
import {
    GET_PROFILE_DETAILS_REQUEST,
    GET_PROFILE_DETAILS_SUCCESS,
    GET_PROFILE_DETAILS_ERROR,
    SAVE_ABOUT_PROFILE_DETAILS_REQUEST,
    SAVE_ABOUT_PROFILE_DETAILS_SUCCESS,
    SAVE_ABOUT_PROFILE_DETAILS_ERROR,
} from "../actions/profile";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    profile: null,
});

const actionMap = {
    [GET_PROFILE_DETAILS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_PROFILE_DETAILS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            profile: action.data.user,
        }));
    },
    [GET_PROFILE_DETAILS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [SAVE_ABOUT_PROFILE_DETAILS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [SAVE_ABOUT_PROFILE_DETAILS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [SAVE_ABOUT_PROFILE_DETAILS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}