import { Map } from "immutable";
import { GET_FRIENDS_START, GET_FRIENDS_SUCCESS, GET_FRIENDS_ERROR } from "../actions/friends";

const initialState = Map({
    loading: false,
    error: null,
    friends: null,
});

const actionMap = {
    [GET_FRIENDS_START]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            friends: null,
        }));
    },
    [GET_FRIENDS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            friends: action.data.friends,
        }));
    },
    [GET_FRIENDS_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
            friends: null,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}