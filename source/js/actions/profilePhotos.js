export const GET_PROFILE_PHOTOS_START = 'GET_PROFILE_PHOTOS_START';
export const GET_PROFILE_PHOTOS_SUCCESS = 'GET_PROFILE_PHOTOS_SUCCESS';
export const GET_PROFILE_PHOTOS_ERROR = 'GET_PROFILE_PHOTOS_ERROR';

export function getProfilePhotosData() {
    return {
        type: GET_PROFILE_PHOTOS_START
    }
}

export function profilePhotosSuccess(data) {
    return {
        type: GET_PROFILE_PHOTOS_SUCCESS,
        data
    }
}

export function profilePhotosError(error) {
    return {
        type: GET_PROFILE_PHOTOS_ERROR,
        error
    }
}