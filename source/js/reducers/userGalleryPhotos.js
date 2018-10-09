import { Map } from "immutable";
import {
    ADD_USER_GALLERY_PHOTO_REQUEST,
    ADD_USER_GALLERY_PHOTO_SUCCESS,
    ADD_USER_GALLERY_PHOTO_ERROR,
    GET_USER_GALLERY_PHOTO_REQUEST,
    GET_USER_GALLERY_PHOTO_SUCCESS,
    GET_USER_GALLERY_PHOTO_ERROR,
    LOAD_MORE_USER_GALLERY_PHOTO_REQUEST,
    LOAD_MORE_USER_GALLERY_PHOTO_SUCCESS,
    LOAD_MORE_USER_GALLERY_PHOTO_ERROR
} from "../actions/userGalleryPhotos";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    galleryPhotos: [],
    photoLoadMoreLoading: false,
    photoStart: 0,
    photoLimit: 10,
    photoDataOver: false,
});

const actionMap = {
    [GET_USER_GALLERY_PHOTO_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            galleryPhotos: [],
            photoStart: action.start,
            photoLimit: action.offset,
            photoDataOver: false,
            error: [],
        }));
    },
    [GET_USER_GALLERY_PHOTO_SUCCESS]: (state, action) => {
        let prevPhotoLimit = state.get('photoLimit');
        let newState = { loading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.galleryPhotos = action.data.user_gallery_photos;
            if (action.data.user_gallery_photos && action.data.user_gallery_photos.length <= 0) {
                newState.photoDataOver = true;
            }
            if (action.data.total_records && (action.data.total_records <= 0 || action.data.total_records <= prevPhotoLimit)) {
                newState.photoDataOver = true;
            }
        } else {
            let msg = (action.message) ? action.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
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
    [LOAD_MORE_USER_GALLERY_PHOTO_REQUEST]: (state, action) => {
        var newState = {
            photoLoadMoreLoading: true,
            photoStart: action.start,
            photoLimit: action.offset,
            photoDataOver: false,
            error: [],
        }
        return state.merge(Map(newState));
    },
    [LOAD_MORE_USER_GALLERY_PHOTO_SUCCESS]: (state, action) => {
        let prevPhotos = state.get('galleryPhotos');
        let newState = { photoLoadMoreLoading: false };
        if (action.data && action.data.status && action.data.status === 1) {
            if (action.data.user_gallery_photos && action.data.user_gallery_photos.length > 0) {
                newState.galleryPhotos = prevPhotos.concat(action.data.user_gallery_photos);
                if (action.data.total_records && (action.data.total_records <= 0 || action.data.total_records <= newState.galleryPhotos.length)) {
                    newState.photoDataOver = true;
                }
            } else {
                newState.photoDataOver = true;
            }
        } else if (action.data && action.data.status && action.data.status === 2) {
            newState.photoDataOver = true;
        } else {
            let msg = (action.message) ? action.message : 'Something went wrong! please try again later.';
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [LOAD_MORE_USER_GALLERY_PHOTO_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        var newState = {
            photoLoadMoreLoading: false,
            error: error,
        }
        return state.merge(Map(newState));
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