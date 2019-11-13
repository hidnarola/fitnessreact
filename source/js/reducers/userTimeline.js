import { Map } from "immutable";
import {
    GET_USER_TIMELINE_REQUEST,
    GET_USER_TIMELINE_SUCCESS,
    GET_USER_TIMELINE_ERROR,
    GET_USER_SINGLE_TIMELINE_REQUEST,
    GET_USER_SINGLE_TIMELINE_SUCCESS,
    GET_USER_SINGLE_TIMELINE_ERROR,
    ADD_POST_ON_USER_TIMELINE_REQUEST,
    ADD_POST_ON_USER_TIMELINE_SUCCESS,
    ADD_POST_ON_USER_TIMELINE_ERROR,
    GET_PRIVACY_OF_TIMELINE_USER_REQUEST,
    GET_PRIVACY_OF_TIMELINE_USER_SUCCESS,
    GET_PRIVACY_OF_TIMELINE_USER_ERROR,
    SET_TIMELINE_STATE,
    DELETE_POST_OF_TIMELINE_REQUEST,
    DELETE_POST_OF_TIMELINE_SUCCESS,
    DELETE_POST_OF_TIMELINE_ERROR,
    CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_REQUEST,
    CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_SUCCESS,
    CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_ERROR,
    TOGGLE_LIKES_LIST_MODAL,
    GET_DISCOVER_USER_TIMELINE_REQUEST,
    GET_DISCOVER_USER_TIMELINE_SUCCESS,
    GET_DISCOVER_USER_TIMELINE_ERROR
} from "../actions/userTimeline";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    posts: [],
    error: [],
    privacyLoading: false,
    privacy: null,
    privacyError: [],
    postLoading: false,
    post: null,
    postError: [],
    postDeleteLoading: false,
    postDeleteError: [],
    postAccessChangeLoading: false,
    postAccessChangeError: [],
});

const actionMap = {
    [GET_USER_TIMELINE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            posts: [],
            post: null,
            error: [],
            postLoading: true
        }));
    },
    [GET_USER_TIMELINE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
            postLoading: false
        };
        if (action.data.status === 1) {
            newState.posts = action.data.timeline;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
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
            postLoading: false,
            error: error,
        }));
    },
    [GET_DISCOVER_USER_TIMELINE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            posts: [],
            post: null,
            error: [],
            postLoading: true
        }));
    },
    [GET_DISCOVER_USER_TIMELINE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
            postLoading: false
        };
        if (action.data.status === 1) {
            newState.posts = action.data.timeline;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_DISCOVER_USER_TIMELINE_ERROR]: (state, action) => {
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
            postLoading: false,
            error: error,
        }));
    },
    [GET_USER_SINGLE_TIMELINE_REQUEST]: (state, action) => {
        return state.merge(Map({
            post: null,
            postError: [],
        }));
    },
    [GET_USER_SINGLE_TIMELINE_SUCCESS]: (state, action) => {
        var newState = {
        };
        if (action.data && action.data.status === 1) {
            newState.post = action.data.timeline;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.postError = [msg];
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
            postError: error,
        }));
    },
    [ADD_POST_ON_USER_TIMELINE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            post: null,
            error: [],
        }));
    },
    [ADD_POST_ON_USER_TIMELINE_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.post = action.data.timeline;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [ADD_POST_ON_USER_TIMELINE_ERROR]: (state, action) => {
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
    [GET_PRIVACY_OF_TIMELINE_USER_REQUEST]: (state, action) => {
        return state.merge(Map({
            privacyLoading: true,
            privacy: null,
            privacyError: [],
        }));
    },
    [GET_PRIVACY_OF_TIMELINE_USER_SUCCESS]: (state, action) => {
        var newState = {
            privacyLoading: false,
        };
        if (action.data.status === 1) {
            newState.privacy = action.data.user_settings;
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.privacyError = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_PRIVACY_OF_TIMELINE_USER_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            privacyLoading: false,
            privacyError: error,
        }));
    },
    [DELETE_POST_OF_TIMELINE_REQUEST]: (state, action) => {
        return state.merge(Map({
            postDeleteLoading: true,
            postDeleteError: [],
        }));
    },
    [DELETE_POST_OF_TIMELINE_SUCCESS]: (state, action) => {
        let newState = { postDeleteLoading: false };
        if (action.data.status && action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.postDeleteError = [msg];
        }
        return state.merge(Map(newState));
    },
    [DELETE_POST_OF_TIMELINE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            postDeleteLoading: false,
            postDeleteError: error,
        }));
    },
    [CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_REQUEST]: (state, action) => {
        return state.merge(Map({
            postAccessChangeLoading: true,
            postAccessChangeError: [],
        }));
    },
    [CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_SUCCESS]: (state, action) => {
        let newState = { postAccessChangeLoading: false };
        if (action.data.status && action.data.status !== 1) {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.postDeleteError = [msg];
        }
        return state.merge(Map(newState));
    },
    [CHANGE_ACCESS_LEVEL_POST_OF_TIMELINE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            postAccessChangeLoading: false,
            postAccessChangeError: error,
        }));
    },
    [SET_TIMELINE_STATE]: (state, action) => {
        return state.merge(Map(action.stateData));
    }
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}