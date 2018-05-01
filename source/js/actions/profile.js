export const GET_PROFILE_DETAILS_REQUEST = 'GET_PROFILE_DETAILS_REQUEST'
export const GET_PROFILE_DETAILS_SUCCESS = 'GET_PROFILE_DETAILS_SUCCESS'
export const GET_PROFILE_DETAILS_ERROR = 'GET_PROFILE_DETAILS_ERROR'

export function getProfileDetailsRequest(username) {
    return {
        type: GET_PROFILE_DETAILS_REQUEST,
        username
    }
}

export function getProfileDetailsSuccess(data) {
    return {
        type: GET_PROFILE_DETAILS_SUCCESS,
        data
    }
}

export function getProfileDetailsError(error) {
    return {
        type: GET_PROFILE_DETAILS_ERROR,
        error
    }
}