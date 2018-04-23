import { Map } from "immutable";
import {
    BADGES_ADD_REQUEST,
    BADGES_ADD_SUCCESS,
    BADGES_ADD_ERROR,
    BADGES_LIST_REQUEST,
    BADGES_LIST_SUCCESS,
    BADGES_LIST_ERROR,
    BADGES_DELETE_REQUEST,
    BADGES_DELETE_SUCCESS,
    BADGES_DELETE_ERROR,
    BADGES_SELECT_ONE_REQUEST,
    BADGES_SELECT_ONE_SUCCESS,
    BADGES_SELECT_ONE_ERROR,
    BADGES_UPDATE_REQUEST,
    BADGES_UPDATE_SUCCESS,
    BADGES_UPDATE_ERROR,
    BADGES_FILTER_REQUEST,
    BADGES_FILTER_SUCCESS,
    BADGES_FILTER_ERROR
} from "../../actions/admin/badges";

const initialState = Map({
    loading: false,
    error: null,
    badges: [],
    filteredBadges: [],
    filteredTotalPages: 0,
    badge: null,
});

const actionMap = {
    [BADGES_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGES_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badges: action.data.badges,
        }));
    },
    [BADGES_LIST_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGES_FILTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGES_FILTER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            filteredBadges: action.data.filtered_badges,
            filteredTotalPages: action.data.filtered_total_pages,
        }));
    },
    [BADGES_FILTER_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGES_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGES_SELECT_ONE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badge: action.data.badge,
        }));
    },
    [BADGES_SELECT_ONE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGES_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGES_ADD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badge: action.data.badge
        }));
    },
    [BADGES_ADD_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGES_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGES_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badge: action.data.badge
        }));
    },
    [BADGES_UPDATE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGES_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGES_DELETE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [BADGES_DELETE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}