import { Map } from "immutable";
import {
    GET_PROFILE_DETAILS_REQUEST,
    GET_PROFILE_DETAILS_SUCCESS,
    GET_PROFILE_DETAILS_ERROR,
    SAVE_ABOUT_PROFILE_DETAILS_REQUEST,
    SAVE_ABOUT_PROFILE_DETAILS_SUCCESS,
    SAVE_ABOUT_PROFILE_DETAILS_ERROR,
    GET_LOGGED_USER_PROFILE_DETAILS_REQUEST,
    GET_LOGGED_USER_PROFILE_DETAILS_SUCCESS,
    GET_LOGGED_USER_PROFILE_DETAILS_ERROR,
    SAVE_LOGGED_USER_PROFILE_DETAILS_REQUEST,
    SAVE_LOGGED_USER_PROFILE_DETAILS_SUCCESS,
    SAVE_LOGGED_USER_PROFILE_DETAILS_ERROR,
    SAVE_LOGGED_USER_PROFILE_PHOTO_REQUEST,
    SAVE_LOGGED_USER_PROFILE_PHOTO_SUCCESS,
    SAVE_LOGGED_USER_PROFILE_PHOTO_ERROR,
    GET_LOGGED_USER_PROFILE_SETTINGS_REQUEST,
    GET_LOGGED_USER_PROFILE_SETTINGS_SUCCESS,
    GET_LOGGED_USER_PROFILE_SETTINGS_ERROR,
    SAVE_LOGGED_USER_PROFILE_SETTINGS_REQUEST,
    SAVE_LOGGED_USER_PROFILE_SETTINGS_SUCCESS,
    SAVE_LOGGED_USER_PROFILE_SETTINGS_ERROR,
    SHOW_FOLL_USER_LIST_REQUEST,
    SHOW_FOLL_USER_LIST_SUCCESS,
    SHOW_FOLL_USER_LIST_ERROR,
    SET_USER_PROFILE_STATE,
} from "../actions/profile";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr, capitalizeFirstLetter } from "../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    profile: null,
    settingsLoading: false,
    settings: null,
    settingsError: [],

    showFollModal: false,
    showFollModalFor: null,
    showFollModalLoading: false,
    showFollModalUsers: [],
    showFollModalError: [],
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
    [GET_LOGGED_USER_PROFILE_DETAILS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            profile: null,
            error: [],
        }));
    },
    [GET_LOGGED_USER_PROFILE_DETAILS_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.profile = action.data.user;
            newState.error = [];
        } else {
            newState.profile = null;
            if (action.data.message && action.data.message !== '') {
                newState.error = [action.data.message];
            } else {
                newState.error = ['Something went wrong! please try again later.'];
            }
        }
        return state.merge(Map(newState));
    },
    [GET_LOGGED_USER_PROFILE_DETAILS_ERROR]: (state, action) => {
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
    [GET_LOGGED_USER_PROFILE_SETTINGS_REQUEST]: (state, action) => {
        return state.merge(Map({
            settingsLoading: true,
            settings: null,
            settingsError: [],
        }));
    },
    [GET_LOGGED_USER_PROFILE_SETTINGS_SUCCESS]: (state, action) => {
        var newState = {
            settingsLoading: false,
        };
        if (action.data.status === 1) {
            newState.settings = action.data.user_settings;
        } else {
            if (action.data.message && action.data.message !== '') {
                newState.settingsError = [action.data.message];
            } else {
                newState.settingsError = ['Something went wrong! please try again later.'];
            }
        }
        return state.merge(Map(newState));
    },
    [GET_LOGGED_USER_PROFILE_SETTINGS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            settingsLoading: false,
            settingsError: error,
        }));
    },
    [SAVE_ABOUT_PROFILE_DETAILS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [SAVE_ABOUT_PROFILE_DETAILS_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 0) {
            let msg = action.data.message ? action.data.message : 'Something went wrong! please try again later';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
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
    },
    [SAVE_LOGGED_USER_PROFILE_DETAILS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            profile: null,
            error: [],
        }));
    },
    [SAVE_LOGGED_USER_PROFILE_DETAILS_SUCCESS]: (state, action) => {
        var newState = { loading: false };
        if (action.data.status === 1) {
            newState.profile = action.data.user;
        } else {
            let msg = action.data.message ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [SAVE_LOGGED_USER_PROFILE_DETAILS_ERROR]: (state, action) => {
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
    [SAVE_LOGGED_USER_PROFILE_SETTINGS_REQUEST]: (state, action) => {
        return state.merge(Map({
            settingsLoading: true,
            settingsError: [],
        }));
    },
    [SAVE_LOGGED_USER_PROFILE_SETTINGS_SUCCESS]: (state, action) => {
        var newState = {
            settingsLoading: false,
        };
        if (action.data.status !== 1) {
            if (action.data.message && action.data.message !== '') {
                newState.settingsError = [action.data.message];
            } else {
                newState.settingsError = ['Something went wrong! please try again later.'];
            }
        }
        return state.merge(Map(newState));
    },
    [SAVE_LOGGED_USER_PROFILE_SETTINGS_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            settingsLoading: false,
            settingsError: error,
        }));
    },
    [SAVE_LOGGED_USER_PROFILE_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [SAVE_LOGGED_USER_PROFILE_PHOTO_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            // newState.profile = action.data.user;
        } else {
            if (action.data.message && action.data.message !== '') {
                newState.error = [action.data.message];
            } else {
                newState.error = ['Something went wrong! please try again later.'];
            }
        }
        return state.merge(Map(newState));
    },
    [SAVE_LOGGED_USER_PROFILE_PHOTO_ERROR]: (state, action) => {
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
    [SHOW_FOLL_USER_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            showFollModalLoading: true,
            showFollModal: true,
            showFollModalFor: action._for ? capitalizeFirstLetter(action._for) : "Users",
            showFollModalUsers: [],
            showFollModalError: []
        }));
    },
    [SHOW_FOLL_USER_LIST_SUCCESS]: (state, action) => {
        var newState = {
            showFollModalLoading: false,
        };
        if (action.data.status === 1) {
            let users = [];
            if (action.data.data && action.data.data.length > 0) {
                action.data.data.map((o) => {
                    users.push(o.user_details);
                });
            }
            newState.showFollModalUsers = users;
        } else {
            if (action.data.message && action.data.message !== '') {
                newState.showFollModalError = [action.data.message];
            } else {
                newState.showFollModalError = ['Something went wrong! please try again later.'];
            }
        }
        return state.merge(Map(newState));
    },
    [SHOW_FOLL_USER_LIST_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            showFollModalLoading: false,
            showFollModal: false,
            showFollModalFor: null,
            showFollModalError: error,
        }));
    },
    [SET_USER_PROFILE_STATE]: (state, action) => {
        return state.merge(Map({
            ...state,
            ...action.newState
        }));
    }
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}