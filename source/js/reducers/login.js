import { Map } from "immutable";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR, FREE_LOGIN_LOGOUT_STATE } from "../actions/login";
import { VALIDATION_FAILURE_STATUS, LOCALSTORAGE_ACCESS_TOKEN_KEY, LOCALSTORAGE_ROLE_KEY, FITASSIST_USER_DETAILS_TOKEN_KEY, LOCALSTORAGE_USER_DETAILS_KEY, LOCALSTORAGE_USERNAME_KEY, LOCALSTORAGE_REFRESH_TOKEN_KEY } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import jwt from "jwt-simple";

const initialState = Map({
    loading: false,
    userDetails: null,
    error: [],
});

const actionMap = {
    [LOGIN_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            userDetails: null,
            error: [],
        }));
    },
    [LOGIN_SUCCESS]: (state, action) => {
        let newState = {
            loading: false,
        }
        if (action.data && action.data.status && action.data.status === 1) {
            let metaData = action.metaData;
            setSessionData(action.data, metaData);
            newState.userDetails = action.data.user;
        } else {
            let msg = (user.data.message) ? user.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [LOGIN_ERROR]: (state, action) => {
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
    [LOGOUT_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            userDetails: null,
            error: [],
        }));
    },
    [LOGOUT_SUCCESS]: (state, action) => {
        destroySessionData();
        return state.merge(Map({
            loading: false,
            userDetails: null,
            error: [],
        }));
    },
    [LOGOUT_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            userDetails: null,
            error: [],
        }));
    },
    [FREE_LOGIN_LOGOUT_STATE]: (state, action) => {
        return initialState;
    },
};

function setSessionData(data, metaData) {
    localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN_KEY, data.token);
    localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN_KEY, data.refresh_token);
    localStorage.setItem(LOCALSTORAGE_ROLE_KEY, metaData.encodedRole);
    localStorage.setItem(LOCALSTORAGE_USER_DETAILS_KEY, jwt.encode(data.user, FITASSIST_USER_DETAILS_TOKEN_KEY));
}

function destroySessionData() {
    localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_KEY);
    localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
    localStorage.removeItem(LOCALSTORAGE_USER_DETAILS_KEY);
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}