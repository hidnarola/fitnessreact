import { Map } from "immutable";
import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    SET_PROFILE_STATE,
    GET_ADMIN_PROFILE_REQUEST,
    GET_ADMIN_PROFILE_SUCCESS,
    GET_ADMIN_PROFILE_ERROR
} from "../../actions/admin/profile";
import { VALIDATION_FAILURE_STATUS, FITASSIST_USER_DETAILS_TOKEN_KEY, LOCALSTORAGE_USER_DETAILS_KEY } from "../../constants/consts";
import { generateValidationErrorMsgArr } from "../../helpers/funs";
import jwt from "jwt-simple";

const initialState = Map({
    loading: false,
    user: null,
    error: [],
    saveLoading: false,
    saveError: [],
});

const actionMap = {
    [GET_ADMIN_PROFILE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            user: null,
            error: [],
        }));
    },
    [GET_ADMIN_PROFILE_SUCCESS]: (state, action) => {
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.user = action.data.admin;
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_ADMIN_PROFILE_ERROR]: (state, action) => {
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
    [UPDATE_PROFILE_REQUEST]: (state, action) => {
        return state.merge(Map({
            saveLoading: true,
            user: null,
            saveError: [],
        }));
    },
    [UPDATE_PROFILE_SUCCESS]: (state, action) => {
        let newState = { saveLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.user = action.data.admin;
            setSessionData(action.data.admin);
        } else {
            let msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later';
            newState.saveError = [msg];
        }
        return state.merge(Map(newState));
    },
    [UPDATE_PROFILE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            saveLoading: false,
            saveError: error,
        }));
    },
    [SET_PROFILE_STATE]: (state, action) => {
        return state.merge(Map(action.stateData));
    },
};

function setSessionData(user) {
    localStorage.setItem(LOCALSTORAGE_USER_DETAILS_KEY, jwt.encode(user, FITASSIST_USER_DETAILS_TOKEN_KEY));
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}