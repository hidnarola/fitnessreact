import { Map } from "immutable";
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

const initialState = Map({
    loading: false,
    error: null,
    user: null,
    users: [],
    filteredUsers: [],
    filteredTotalPages: 0,
});

const actionMap = {
    [USERS_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            users: action.data.users,
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_LIST_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
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
            loading: true,
            error: null,
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_FILTER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            users: [],
            user: null,
            filteredUsers: action.data.filtered_users,
            filteredTotalPages: action.data.filtered_total_pages,
        }));
    },
    [USERS_FILTER_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
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
    [USERS_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_SELECT_ONE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            users: [],
            user: action.data.user,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_SELECT_ONE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
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
            error: null,
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            users: [],
            user: action.data.user,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_UPDATE_ERROR]: (state, action) => {
        let { error } = action.error;
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
            error: null,
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_DELETE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            users: [],
            user: null,
            filteredUsers: [],
            filteredTotalPages: 0,
        }));
    },
    [USERS_DELETE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
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
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}