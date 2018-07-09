export const GET_USER_PROGRAMS_REQUEST = 'GET_USER_PROGRAMS_REQUEST';
export const GET_USER_PROGRAMS_SUCCESS = 'GET_USER_PROGRAMS_SUCCESS';
export const GET_USER_PROGRAMS_ERROR = 'GET_USER_PROGRAMS_ERROR';

export function getUserProgramsRequest() {
    return {
        type: GET_USER_PROGRAMS_REQUEST,
    }
}

export function getUserProgramsSuccess(data) {
    return {
        type: GET_USER_PROGRAMS_SUCCESS,
        data,
    }
}

export function getUserProgramsError(error) {
    return {
        type: GET_USER_PROGRAMS_ERROR,
        error
    }
}