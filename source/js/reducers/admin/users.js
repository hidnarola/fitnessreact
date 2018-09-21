import { Map } from "immutable";
import _ from "lodash";
import {
    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_ERROR,
    USERS_DELETE_REQUEST,
    USERS_DELETE_SUCCESS,
    USERS_DELETE_ERROR,
    USERS_SELECT_ONE_REQUEST,
    USERS_SELECT_ONE_SUCCESS,
    USERS_SELECT_ONE_ERROR,
    USERS_UPDATE_REQUEST,
    USERS_UPDATE_SUCCESS,
    USERS_UPDATE_ERROR,
    USERS_FILTER_REQUEST,
    USERS_FILTER_SUCCESS,
    USERS_FILTER_ERROR
} from "../../actions/admin/users";
import { VALIDATION_FAILURE_STATUS } from "../../constants/consts";
import { generateValidationErrorMsgArr } from "../../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    user: null,
    users: [],

    filteredLoading: false,
    filteredUsers: [],
    filteredTotalPages: 0,
    filteredError: [],
});

const actionMap = {
    [USERS_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: [],
            users: action.data.users,
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_LIST_ERROR]: (state, action) => {
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
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_FILTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            filteredLoading: true,
            filteredUsers: [],
            filteredTotalPages: 0,
            filteredError: [],
        }));
    },
    [USERS_FILTER_SUCCESS]: (state, action) => {
        let newState = { filteredLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.filteredUsers = action.data.filtered_users;
            newState.filteredTotalPages = action.data.filtered_total_pages;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.filteredError = [msg];
        }
        return state.merge(Map(newState));
    },
    [USERS_FILTER_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later.'];
        }
        return state.merge(Map({
            filteredLoading: false,
            filteredError: error
        }));
    },
    [USERS_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_SELECT_ONE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: [],
            users: [],
            user: action.data.user,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_SELECT_ONE_ERROR]: (state, action) => {
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
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: [],
            users: [],
            user: action.data.user,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_UPDATE_ERROR]: (state, action) => {
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
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_DELETE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: [],
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_DELETE_ERROR]: (state, action) => {
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
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}