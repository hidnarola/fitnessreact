import { Map } from "immutable";
import { GET_PROFILE_PHOTOS_START, GET_PROFILE_PHOTOS_SUCCESS, GET_PROFILE_PHOTOS_ERROR } from "../actions/profilePhotos";

const initialState = Map({
    loading: false,
    error: null,
    progressPhotos: null,
    galleryPhotos: null,
});

const actionMap = {
    [GET_PROFILE_PHOTOS_START]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            progressPhotos: null,
            galleryPhotos: null,
        }));
    },
    [GET_PROFILE_PHOTOS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: null,
            progressPhotos: action.data.progressPhotos,
            galleryPhotos: action.data.galleryPhotos,
        }));
    },
    [GET_PROFILE_PHOTOS_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
            progressPhotos: null,
            galleryPhotos: null,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}