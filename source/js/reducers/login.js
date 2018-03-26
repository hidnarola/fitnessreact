import { Map } from "immutable";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR } from "../actions/login";

const initialState = Map({
    loading: false,
    error: null,
    user: null,
    token: null,
    refreshToken: null
});

const actionMap = {
    [LOGIN_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            user: null,
            token: null,
            refreshToken: null
        }));
    },
    [LOGIN_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            user: action.data.user,
            token: action.data.token,
            refreshToken: action.data.refresh_token
        }));
    },
    [LOGIN_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            user: null,
            token: null,
            refreshToken: null
        }));
    },
    [LOGOUT_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            user: null,
            token: null,
            refreshToken: null
        }));
    },
    [LOGOUT_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            user: null,
            token: null,
            refreshToken: null
        }));
    },
    [LOGOUT_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            user: null,
            token: null,
            refreshToken: null
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}