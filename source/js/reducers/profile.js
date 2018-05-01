import { Map } from "immutable";
import { GET_PROFILE_DETAILS_REQUEST, GET_PROFILE_DETAILS_SUCCESS, GET_PROFILE_DETAILS_ERROR } from "../actions/profile";

const initialState = Map({
    loading: false,
    error: null,
    profile: null,
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
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}