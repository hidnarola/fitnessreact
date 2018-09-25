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
    USERS_FILTER_ERROR,
    SET_USERS_STATE,
    RESET_USERS_STATE,
    USERS_BLOCK_REQUEST,
    USERS_BLOCK_SUCCESS,
    USERS_BLOCK_ERROR,
    USERS_UNBLOCK_REQUEST,
    USERS_UNBLOCK_SUCCESS,
    USERS_UNBLOCK_ERROR
} from "../../actions/admin/users";
import { VALIDATION_FAILURE_STATUS } from "../../constants/consts";
import { generateValidationErrorMsgArr } from "../../helpers/funs";

const initialState = Map({
    loading: false,
    users: [],
    error: [],

    selectLoading: false,
    selectUser: null,
    selectUserPref: null,
    selectError: [],

    updateLoading: false,
    updateUser: null,
    updateError: [],

    deleteLoading: false,
    deleteUser: null,
    deleteError: [],

    filteredLoading: false,
    filteredUsers: [],
    filteredTotalPages: 0,
    filteredError: [],

    blockLoading: false,
    blockUser: null,
    blockError: [],

    unblockLoading: false,
    unblockUser: null,
    unblockError: [],
});

const actionMap = {
    [USERS_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            users: [],
            error: [],
        }));
    },
    [USERS_LIST_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.users = action.data.users;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
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
            selectLoading: true,
            selectUser: null,
            selectUserPref: null,
            selectError: [],
        }));
    },
    [USERS_SELECT_ONE_SUCCESS]: (state, action) => {
        let newState = { selectLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.selectUser = action.data.user;
            newState.selectUserPref = action.data.user_preferences;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.selectError = [msg];
        }
        return state.merge(Map(newState));
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
            selectLoading: false,
            selectError: error,
        }));
    },
    [USERS_UPDATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            updateLoading: true,
            updateUser: null,
            updateError: [],
        }));
    },
    [USERS_UPDATE_SUCCESS]: (state, action) => {
        let newState = { updateLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.updateUser = action.data.user;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.updateError = [msg];
        }
        return state.merge(Map(newState));
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
            updateLoading: false,
            updateError: error,
        }));
    },
    [USERS_DELETE_REQUEST]: (state, action) => {
        return state.merge(Map({
            deleteLoading: true,
            deleteUser: null,
            deleteError: [],
        }));
    },
    [USERS_DELETE_SUCCESS]: (state, action) => {
        let newState = { deleteLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.deleteUser = action.data.user;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.deleteError = [msg];
        }
        return state.merge(Map(newState));
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
            deleteLoading: false,
            deleteError: error,
        }));
    },
    [USERS_BLOCK_REQUEST]: (state, action) => {
        return state.merge(Map({
            blockLoading: true,
            blockUser: null,
            blockError: [],
        }));
    },
    [USERS_BLOCK_SUCCESS]: (state, action) => {
        let newState = { blockLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.blockUser = action.data.user;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.blockError = [msg];
        }
        return state.merge(Map(newState));
    },
    [USERS_BLOCK_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            blockLoading: false,
            blockError: error,
        }));
    },
    [USERS_UNBLOCK_REQUEST]: (state, action) => {
        return state.merge(Map({
            unblockLoading: true,
            unblockUser: null,
            unblockError: [],
        }));
    },
    [USERS_UNBLOCK_SUCCESS]: (state, action) => {
        let newState = { unblockLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.unblockUser = action.data.user;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.unblockError = [msg];
        }
        return state.merge(Map(newState));
    },
    [USERS_UNBLOCK_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            unblockLoading: false,
            unblockError: error,
        }));
    },
    [SET_USERS_STATE]: (state, action) => {
        return state.merge(Map(action.stateData));
    },
    [RESET_USERS_STATE]: (state, action) => {
        return initialState;
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}