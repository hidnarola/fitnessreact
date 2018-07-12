export const GET_USER_PROGRAMS_REQUEST = 'GET_USER_PROGRAMS_REQUEST';
export const GET_USER_PROGRAMS_SUCCESS = 'GET_USER_PROGRAMS_SUCCESS';
export const GET_USER_PROGRAMS_ERROR = 'GET_USER_PROGRAMS_ERROR';

export const ADD_USER_PROGRAM_MASTER_REQUEST = 'ADD_USER_PROGRAM_MASTER_REQUEST';
export const ADD_USER_PROGRAM_MASTER_SUCCESS = 'ADD_USER_PROGRAM_MASTER_SUCCESS';
export const ADD_USER_PROGRAM_MASTER_ERROR = 'ADD_USER_PROGRAM_MASTER_ERROR';

export const GET_USER_PROGRAM_REQUEST = 'GET_USER_PROGRAM_REQUEST';
export const GET_USER_PROGRAM_SUCCESS = 'GET_USER_PROGRAM_SUCCESS';
export const GET_USER_PROGRAM_ERROR = 'GET_USER_PROGRAM_ERROR';

export const DELETE_USER_PROGRAM_REQUEST = 'DELETE_USER_PROGRAM_REQUEST';
export const DELETE_USER_PROGRAM_SUCCESS = 'DELETE_USER_PROGRAM_SUCCESS';
export const DELETE_USER_PROGRAM_ERROR = 'DELETE_USER_PROGRAM_ERROR';

export const SET_SELECTED_DAY_FOR_PROGRAM = 'SET_SELECTED_DAY_FOR_PROGRAM';

export const ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST = 'ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST';
export const ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS = 'ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS';
export const ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR = 'ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR';

export const COPY_USER_PROGRAM_WORKOUT_SCHEDULE = 'COPY_USER_PROGRAM_WORKOUT_SCHEDULE';

export const DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST = 'DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST';
export const DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS = 'DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS';
export const DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR = 'DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR';

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

export function getUserProgramRequest(_id) {
    return {
        type: GET_USER_PROGRAM_REQUEST,
        _id
    }
}

export function getUserProgramSuccess(data) {
    return {
        type: GET_USER_PROGRAM_SUCCESS,
        data,
    }
}

export function getUserProgramError(error) {
    return {
        type: GET_USER_PROGRAM_ERROR,
        error
    }
}

export function deleteUserProgramRequest(_id) {
    return {
        type: DELETE_USER_PROGRAM_REQUEST,
        _id
    }
}

export function deleteUserProgramSuccess(data) {
    return {
        type: DELETE_USER_PROGRAM_SUCCESS,
        data,
    }
}

export function deleteUserProgramError(error) {
    return {
        type: DELETE_USER_PROGRAM_ERROR,
        error
    }
}

export function setSelectedDayForProgram(day = null) {
    return {
        type: SET_SELECTED_DAY_FOR_PROGRAM,
        day
    }
}

export function addUsersProgramWorkoutScheduleRequest(requestData) {
    return {
        type: ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
        requestData,
    }
}

export function addUsersProgramWorkoutScheduleSuccess(data) {
    return {
        type: ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function addUsersProgramWorkoutScheduleError(error) {
    return {
        type: ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}

export function copyUserProgramWorkoutSchedule(selectedData) {
    return {
        type: COPY_USER_PROGRAM_WORKOUT_SCHEDULE,
        selectedData,
    }
}

export function deleteUsersProgramWorkoutScheduleRequest(requestData) {
    return {
        type: DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
        requestData,
    }
}

export function deleteUsersProgramWorkoutScheduleSuccess(data) {
    return {
        type: DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function deleteUsersProgramWorkoutScheduleError(error) {
    return {
        type: DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}