import { Map } from "immutable";
import {
    ADD_USER_GALLERY_PHOTO_REQUEST,
    ADD_USER_GALLERY_PHOTO_SUCCESS,
    ADD_USER_GALLERY_PHOTO_ERROR,
    GET_USER_GALLERY_PHOTO_REQUEST,
    GET_USER_GALLERY_PHOTO_SUCCESS,
    GET_USER_GALLERY_PHOTO_ERROR
} from "../actions/userGalleryPhotos";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    galleryPhotos: [],
});

const actionMap = {
    [GET_USER_GALLERY_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [GET_USER_GALLERY_PHOTO_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            galleryPhotos: action.data.user_gallery_photos,
        }));
    },
    [GET_USER_GALLERY_PHOTO_ERROR]: (state, action) => {
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
    [ADD_USER_GALLERY_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: [],
        }));
    },
    [ADD_USER_GALLERY_PHOTO_SUCCESS]: (state, action) => {
        var newState = {
            loading: false,
        };
        if (action.data.status === 1) {
            newState.error = [];
        } else {
            var msg = (action.data.message) ? action.data.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [ADD_USER_GALLERY_PHOTO_ERROR]: (state, action) => {
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
}

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}