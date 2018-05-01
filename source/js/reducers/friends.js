import { Map } from "immutable";
import {
    GET_APPROVED_FRIENDS_REQUEST,
    GET_APPROVED_FRIENDS_SUCCESS,
    GET_APPROVED_FRIENDS_ERROR
} from "../actions/friends";

const initialState = Map({
    approvedLoading: false,
    approvedError: null,
    approvedFriends: [],
    pendingLoading: false,
    pendingError: null,
    pendingFriends: [],
});

const actionMap = {
    [GET_APPROVED_FRIENDS_REQUEST]: (state, action) => {
        return state.merge(Map({
            approvedLoading: true,
        }));
    },
    [GET_APPROVED_FRIENDS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            approvedLoading: false,
            approvedFriends: action.data.friends,
        }));
    },
    [GET_APPROVED_FRIENDS_ERROR]: (state, action) => {
        return state.merge(Map({
            approvedLoading: false,
            approvedError: action.error.message,
        }));
    },
    [GET_PENDING_FRIENDS_REQUEST]: (state, action) => {
        return state.merge(Map({
            pendingLoading: true,
        }));
    },
    [GET_PENDING_FRIENDS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            pendingLoading: false,
            pendingFriends: action.data.friends,
        }));
    },
    [GET_PENDING_FRIENDS_ERROR]: (state, action) => {
        return state.merge(Map({
            pendingLoading: false,
            pendingError: action.error.message,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}