import { Map } from "immutable";
import {
    GET_USER_TIMELINE_REQUEST,
    GET_USER_TIMELINE_SUCCESS,
    GET_USER_TIMELINE_ERROR,
    GET_USER_SINGLE_TIMELINE_REQUEST,
    GET_USER_SINGLE_TIMELINE_SUCCESS,
    GET_USER_SINGLE_TIMELINE_ERROR
} from "../actions/userTimeline";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    posts: [],
    progressPhotos: {},
    post: {},
    error: [],
});

const actionMap = {
    [GET_USER_TIMELINE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            posts: [],
            progressPhotos: {},
            post: {},
            error: [],
        }));
    },
    [GET_USER_TIMELINE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.posts = action.data.timeline;
            newState.progressPhotos = action.data.progress_photos;
            newState.error = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.posts = [];
            newState.progressPhotos = {};
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_TIMELINE_ERROR]: (state, action) => {
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
    [GET_USER_SINGLE_TIMELINE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            post: {},
            error: [],
        }));
    },
    [GET_USER_SINGLE_TIMELINE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.post = action.data.timeline;
            newState.error = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.post = {};
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_SINGLE_TIMELINE_ERROR]: (state, action) => {
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
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}