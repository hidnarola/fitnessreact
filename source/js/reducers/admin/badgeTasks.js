import { Map } from "immutable";
import {
    BADGE_TASKS_ADD_REQUEST,
    BADGE_TASKS_ADD_SUCCESS,
    BADGE_TASKS_ADD_ERROR,
    BADGE_TASKS_LIST_REQUEST,
    BADGE_TASKS_LIST_SUCCESS,
    BADGE_TASKS_LIST_ERROR,
    BADGE_TASKS_DELETE_REQUEST,
    BADGE_TASKS_DELETE_SUCCESS,
    BADGE_TASKS_DELETE_ERROR,
    BADGE_TASKS_SELECT_ONE_REQUEST,
    BADGE_TASKS_SELECT_ONE_SUCCESS,
    BADGE_TASKS_SELECT_ONE_ERROR,
    BADGE_TASKS_UPDATE_REQUEST,
    BADGE_TASKS_UPDATE_SUCCESS,
    BADGE_TASKS_UPDATE_ERROR,
    BADGE_TASKS_FILTER_REQUEST,
    BADGE_TASKS_FILTER_SUCCESS,
    BADGE_TASKS_FILTER_ERROR
} from "../../actions/admin/badgeTasks";

const initialState = Map({
    loading: false,
    error: null,
    badgeTasks: [],
    filteredBudgeTasks: [],
    filteredTotalPages: 0,
    badgeTask: null,
});

const actionMap = {
    [BADGE_TASKS_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_TASKS_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badgeTasks: action.data.badge_tasks,
        }));
    },
    [BADGE_TASKS_LIST_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGE_TASKS_FILTER_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_TASKS_FILTER_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            filteredBudgeTasks: action.data.filtered_badge_tasks,
            filteredTotalPages: action.data.filtered_total_pages,
        }));
    },
    [BADGE_TASKS_FILTER_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGE_TASKS_SELECT_ONE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_TASKS_SELECT_ONE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badgeTask: action.data.badge_task,
        }));
    },
    [BADGE_TASKS_SELECT_ONE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGE_TASKS_ADD_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_TASKS_ADD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badgeTask: action.data.badge_task
        }));
    },
    [BADGE_TASKS_ADD_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGE_TASKS_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_TASKS_UPDATE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            badgeTask: action.data.badge_task
        }));
    },
    [BADGE_TASKS_UPDATE_ERROR]: (state, action) => {
        let error = 'Server error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
        }));
    },
    [BADGE_TASKS_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [BADGE_TASKS_DELETE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [BADGE_TASKS_DELETE_ERROR]: (state, action) => {
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
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}