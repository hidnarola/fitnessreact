export const GET_USER_PROGRAMS_REQUEST = 'GET_USER_PROGRAMS_REQUEST';
export const GET_USER_PROGRAMS_SUCCESS = 'GET_USER_PROGRAMS_SUCCESS';
export const GET_USER_PROGRAMS_ERROR = 'GET_USER_PROGRAMS_ERROR';

export const ADD_USER_PROGRAM_MASTER_REQUEST = 'ADD_USER_PROGRAM_MASTER_REQUEST';
export const ADD_USER_PROGRAM_MASTER_SUCCESS = 'ADD_USER_PROGRAM_MASTER_SUCCESS';
export const ADD_USER_PROGRAM_MASTER_ERROR = 'ADD_USER_PROGRAM_MASTER_ERROR';

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

export function addUserProgramMasterRequest(requestData) {
    return {
        type: ADD_USER_PROGRAM_MASTER_REQUEST,
        requestData,
    }
}

export function addUserProgramMasterSuccess(data) {
    return {
        type: ADD_USER_PROGRAM_MASTER_SUCCESS,
        data,
    }
}

export function addUserProgramMasterError(error) {
    return {
        type: ADD_USER_PROGRAM_MASTER_ERROR,
        error
    }
}