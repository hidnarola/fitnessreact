import { Map } from "immutable";
import {
    ADD_USER_PROGRESS_PHOTO_REQUEST,
    ADD_USER_PROGRESS_PHOTO_SUCCESS,
    ADD_USER_PROGRESS_PHOTO_ERROR
} from "../actions/userProgressPhotos";

const initialState = Map({
    loading: false,
    error: null,
});

const actionMap = {
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
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}