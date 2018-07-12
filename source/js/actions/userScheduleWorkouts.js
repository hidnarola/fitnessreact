export const SET_SELECTED_SLOT_FROM_CALENDAR = 'SET_SELECTED_SLOT_FROM_CALENDAR';

export const GET_USERS_WORKOUT_SCHEDULES_REQUEST = 'GET_USERS_WORKOUT_SCHEDULES_REQUEST';
export const GET_USERS_WORKOUT_SCHEDULES_SUCCESS = 'GET_USERS_WORKOUT_SCHEDULES_SUCCESS';
export const GET_USERS_WORKOUT_SCHEDULES_ERROR = 'GET_USERS_WORKOUT_SCHEDULES_ERROR';

export const GET_EXERCISES_NAME_REQUEST = 'GET_EXERCISES_NAME_REQUEST';
export const GET_EXERCISES_NAME_SUCCESS = 'GET_EXERCISES_NAME_SUCCESS';
export const GET_EXERCISES_NAME_ERROR = 'GET_EXERCISES_NAME_ERROR';

export const ADD_USERS_WORKOUT_SCHEDULE_REQUEST = 'ADD_USERS_WORKOUT_SCHEDULE_REQUEST';
export const ADD_USERS_WORKOUT_SCHEDULE_SUCCESS = 'ADD_USERS_WORKOUT_SCHEDULE_SUCCESS';
export const ADD_USERS_WORKOUT_SCHEDULE_ERROR = 'ADD_USERS_WORKOUT_SCHEDULE_ERROR';

export const CHANGE_USERS_WORKOUT_SCHEDULE_REQUEST = 'CHANGE_USERS_WORKOUT_SCHEDULE_REQUEST';
export const CHANGE_USERS_WORKOUT_SCHEDULE_SUCCESS = 'CHANGE_USERS_WORKOUT_SCHEDULE_SUCCESS';
export const CHANGE_USERS_WORKOUT_SCHEDULE_ERROR = 'CHANGE_USERS_WORKOUT_SCHEDULE_ERROR';

export const COPY_USER_WORKOUT_SCHEDULE = 'COPY_USER_WORKOUT_SCHEDULE';

export const DELETE_USERS_WORKOUT_SCHEDULE_REQUEST = 'DELETE_USERS_WORKOUT_SCHEDULE_REQUEST';
export const DELETE_USERS_WORKOUT_SCHEDULE_SUCCESS = 'DELETE_USERS_WORKOUT_SCHEDULE_SUCCESS';
export const DELETE_USERS_WORKOUT_SCHEDULE_ERROR = 'DELETE_USERS_WORKOUT_SCHEDULE_ERROR';

export const DELETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST = 'DELETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST';
export const DELETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS = 'DELETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS';
export const DELETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR = 'DELETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR';

export const COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST = 'COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST';
export const COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS = 'COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS';
export const COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR = 'COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR';

export const INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST = 'INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST';
export const INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS = 'INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS';
export const INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR = 'INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR';

export const CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_REQUEST = 'CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_REQUEST';
export const CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_SUCCESS = 'CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_SUCCESS';
export const CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_ERROR = 'CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_ERROR';

export const SELECT_USERS_WORKOUT_SCHEDULE_FOR_EDIT = 'SELECT_USERS_WORKOUT_SCHEDULE_FOR_EDIT';

export const GET_PROGRAMS_NAME_REQUEST = 'GET_PROGRAMS_NAME_REQUEST';
export const GET_PROGRAMS_NAME_SUCCESS = 'GET_PROGRAMS_NAME_SUCCESS';
export const GET_PROGRAMS_NAME_ERROR = 'GET_PROGRAMS_NAME_ERROR';

export const USER_ASSIGN_PROGRAM_REQUEST = 'USER_ASSIGN_PROGRAM_REQUEST';
export const USER_ASSIGN_PROGRAM_SUCCESS = 'USER_ASSIGN_PROGRAM_SUCCESS';
export const USER_ASSIGN_PROGRAM_ERROR = 'USER_ASSIGN_PROGRAM_ERROR';

export function setSelectedSlotFromCalendar(slotInfo = null) {
    return {
        type: SET_SELECTED_SLOT_FROM_CALENDAR,
        slotInfo,
    }
}

export function getUsersWorkoutSchedulesRequest(requestData) {
    return {
        type: GET_USERS_WORKOUT_SCHEDULES_REQUEST,
        requestData,
    }
}

export function getUsersWorkoutSchedulesSuccess(data) {
    return {
        type: GET_USERS_WORKOUT_SCHEDULES_SUCCESS,
        data,
    }
}

export function getUsersWorkoutSchedulesError(error) {
    return {
        type: GET_USERS_WORKOUT_SCHEDULES_ERROR,
        error,
    }
}

export function getExercisesNameRequest() {
    return {
        type: GET_EXERCISES_NAME_REQUEST,
    }
}

export function getExercisesNameSuccess(data) {
    return {
        type: GET_EXERCISES_NAME_SUCCESS,
        data,
    }
}

export function getExercisesNameError(error) {
    return {
        type: GET_EXERCISES_NAME_ERROR,
        error,
    }
}

export function addUsersWorkoutScheduleRequest(requestData) {
    return {
        type: ADD_USERS_WORKOUT_SCHEDULE_REQUEST,
        requestData,
    }
}

export function addUsersWorkoutScheduleSuccess(data) {
    return {
        type: ADD_USERS_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function addUsersWorkoutScheduleError(error) {
    return {
        type: ADD_USERS_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}

export function changeUsersWorkoutScheduleRequest(_id, requestData) {
    return {
        type: CHANGE_USERS_WORKOUT_SCHEDULE_REQUEST,
        _id,
        requestData,
    }
}

export function changeUsersWorkoutScheduleSuccess(data) {
    return {
        type: CHANGE_USERS_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function changeUsersWorkoutScheduleError(error) {
    return {
        type: CHANGE_USERS_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}

export function copyUserWorkoutSchedule(selectedData) {
    return {
        type: COPY_USER_WORKOUT_SCHEDULE,
        selectedData,
    }
}

export function deleteUsersWorkoutScheduleRequest(_id) {
    return {
        type: DELETE_USERS_WORKOUT_SCHEDULE_REQUEST,
        _id,
    }
}

export function deleteUsersWorkoutScheduleSuccess(data) {
    return {
        type: DELETE_USERS_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function deleteUsersWorkoutScheduleError(error) {
    return {
        type: DELETE_USERS_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}

export function deleteUsersBulkWorkoutScheduleRequest(requestData) {
    return {
        type: DELETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST,
        requestData,
    }
}

export function deleteUsersBulkWorkoutScheduleSuccess(data) {
    return {
        type: DELETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function deleteUsersBulkWorkoutScheduleError(error) {
    return {
        type: DELETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}

export function completeUsersBulkWorkoutScheduleRequest(requestData) {
    return {
        type: COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST,
        requestData,
    }
}

export function completeUsersBulkWorkoutScheduleSuccess(data) {
    return {
        type: COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function completeUsersBulkWorkoutScheduleError(error) {
    return {
        type: COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}

export function changeUsersWorkoutScheduleCompleteRequest(_id, isCompleted) {
    return {
        type: CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_REQUEST,
        _id,
        isCompleted,
    }
}

export function changeUsersWorkoutScheduleCompleteSuccess(data) {
    return {
        type: CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_SUCCESS,
        data,
    }
}

export function changeUsersWorkoutScheduleCompleteError(error) {
    return {
        type: CHANGE_USERS_WORKOUT_SCHEDULE_COMPLETE_ERROR,
        error,
    }
}

export function selectUsersWorkoutScheduleForEdit(selectedData) {
    return {
        type: SELECT_USERS_WORKOUT_SCHEDULE_FOR_EDIT,
        selectedData,
    }
}

export function getProgramsNameRequest() {
    return {
        type: GET_PROGRAMS_NAME_REQUEST,
    }
}

export function getProgramsNameSuccess(data) {
    return {
        type: GET_PROGRAMS_NAME_SUCCESS,
        data,
    }
}

export function getProgramsNameError(error) {
    return {
        type: GET_PROGRAMS_NAME_ERROR,
        error,
    }
}

export function userAssignProgramRequest(requestData) {
    return {
        type: USER_ASSIGN_PROGRAM_REQUEST,
        requestData,
    }
}

export function userAssignProgramSuccess(data) {
    return {
        type: USER_ASSIGN_PROGRAM_SUCCESS,
        data,
    }
}

export function userAssignProgramError(error) {
    return {
        type: USER_ASSIGN_PROGRAM_ERROR,
        error,
    }
}