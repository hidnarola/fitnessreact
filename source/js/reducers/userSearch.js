import { Map } from "immutable";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import {
    GET_USER_SEARCH_REQUEST,
    GET_USER_SEARCH_SUCCESS,
    GET_USER_SEARCH_ERROR,
    RESET_USER_SEARCH,
    HANDLE_CHANGE_USER_SEARCH_FOR,
    GET_USERS_PAGE_SEARCH_REQUEST,
    GET_USERS_PAGE_SEARCH_SUCCESS,
    GET_USERS_PAGE_SEARCH_ERROR,
    SET_USER_SEARCH_STATE
} from "../actions/userSearch";

const initialState = Map({
    loading: false,
    searchValue: '',
    users: [],
    error: [],
    allUsersLoading: false,
    allUsersSearchValue: '',
    allUsers: [],
    allUsersError: [],
});

const actionMap = {
    [GET_USER_SEARCH_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            users: [],
            error: [],
        }));
    },
    [GET_USER_SEARCH_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.users = action.data.users;
            newState.error = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.users = [];
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_SEARCH_ERROR]: (state, action) => {
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
    [GET_USERS_PAGE_SEARCH_REQUEST]: (state, action) => {
        return state.merge(Map({
            allUsersLoading: true,
            allUsers: [],
            allUsersError: [],
        }));
    },
    [GET_USERS_PAGE_SEARCH_SUCCESS]: (state, action) => {
        var newState = {
            allUsersLoading: false,
        };
        if (action.data.status === 1) {
            newState.allUsers = action.data.users;
            newState.allUsersError = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.allUsers = [];
            newState.allUsersError = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USERS_PAGE_SEARCH_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            allUsersLoading: false,
            allUsersError: error,
        }));
    },
    [RESET_USER_SEARCH]: (state, action) => {
        return state.merge(Map(action.resetState));
    },
    [HANDLE_CHANGE_USER_SEARCH_FOR]: (state, action) => {
        return state.merge(Map({
            [action.name]: action.value,
        }));
    },
    [SET_USER_SEARCH_STATE]: (state, action) => {
        return state.merge(Map(action.data));
    }
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}