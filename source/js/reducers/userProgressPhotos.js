import { Map } from "immutable";
import {
    ADD_USER_PROGRESS_PHOTO_REQUEST,
    ADD_USER_PROGRESS_PHOTO_SUCCESS,
    ADD_USER_PROGRESS_PHOTO_ERROR,
    GET_USER_PROGRESS_PHOTO_REQUEST,
    GET_USER_PROGRESS_PHOTO_SUCCESS,
    GET_USER_PROGRESS_PHOTO_ERROR,
    GET_USER_LATEST_PROGRESS_PHOTO_REQUEST,
    GET_USER_LATEST_PROGRESS_PHOTO_SUCCESS,
    GET_USER_LATEST_PROGRESS_PHOTO_ERROR
} from "../actions/userProgressPhotos";

const initialState = Map({
    loading: false,
    error: null,
    progressPhotos: [],
});

const actionMap = {
    [GET_USER_PROGRESS_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_PROGRESS_PHOTO_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            progressPhotos: action.data.user_progress_photos,
        }));
    },
    [GET_USER_PROGRESS_PHOTO_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
    [GET_USER_LATEST_PROGRESS_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_LATEST_PROGRESS_PHOTO_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            progressPhotos: action.data.user_progress_photos,
        }));
    },
    [GET_USER_LATEST_PROGRESS_PHOTO_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
    [ADD_USER_PROGRESS_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [ADD_USER_PROGRESS_PHOTO_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [ADD_USER_PROGRESS_PHOTO_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}