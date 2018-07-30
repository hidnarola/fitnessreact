import { SCHEDULED_WORKOUT_TYPE_WARMUP } from "../constants/consts";

export const SET_SELECTED_SLOT_FROM_CALENDAR = 'SET_SELECTED_SLOT_FROM_CALENDAR';

export const GET_USERS_WORKOUT_SCHEDULES_REQUEST = 'GET_USERS_WORKOUT_SCHEDULES_REQUEST';
export const GET_USERS_WORKOUT_SCHEDULES_SUCCESS = 'GET_USERS_WORKOUT_SCHEDULES_SUCCESS';
export const GET_USERS_WORKOUT_SCHEDULES_ERROR = 'GET_USERS_WORKOUT_SCHEDULES_ERROR';

export const GET_USERS_WORKOUT_SCHEDULE_REQUEST = 'GET_USERS_WORKOUT_SCHEDULE_REQUEST';
export const GET_USERS_WORKOUT_SCHEDULE_SUCCESS = 'GET_USERS_WORKOUT_SCHEDULE_SUCCESS';
export const GET_USERS_WORKOUT_SCHEDULE_ERROR = 'GET_USERS_WORKOUT_SCHEDULE_ERROR';

export const GET_EXERCISES_NAME_REQUEST = 'GET_EXERCISES_NAME_REQUEST';
export const GET_EXERCISES_NAME_SUCCESS = 'GET_EXERCISES_NAME_SUCCESS';
export const GET_EXERCISES_NAME_ERROR = 'GET_EXERCISES_NAME_ERROR';

export const ADD_USERS_WORKOUT_SCHEDULE_REQUEST = 'ADD_USERS_WORKOUT_SCHEDULE_REQUEST';
export const ADD_USERS_WORKOUT_SCHEDULE_SUCCESS = 'ADD_USERS_WORKOUT_SCHEDULE_SUCCESS';
export const ADD_USERS_WORKOUT_SCHEDULE_ERROR = 'ADD_USERS_WORKOUT_SCHEDULE_ERROR';

export const UPDATE_USERS_WORKOUT_SCHEDULE_REQUEST = 'UPDATE_USERS_WORKOUT_SCHEDULE_REQUEST';
export const UPDATE_USERS_WORKOUT_SCHEDULE_SUCCESS = 'UPDATE_USERS_WORKOUT_SCHEDULE_SUCCESS';
export const UPDATE_USERS_WORKOUT_SCHEDULE_ERROR = 'UPDATE_USERS_WORKOUT_SCHEDULE_ERROR';

export const CHANGE_USERS_WORKOUT_SCHEDULE_REQUEST = 'CHANGE_USERS_WORKOUT_SCHEDULE_REQUEST';
export const CHANGE_USERS_WORKOUT_SCHEDULE_SUCCESS = 'CHANGE_USERS_WORKOUT_SCHEDULE_SUCCESS';
export const CHANGE_USERS_WORKOUT_SCHEDULE_ERROR = 'CHANGE_USERS_WORKOUT_SCHEDULE_ERROR';

export const COPY_USER_WORKOUT_SCHEDULE = 'COPY_USER_WORKOUT_SCHEDULE';

export const DELETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST = 'DELETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST';
export const DELETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS = 'DELETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS';
export const DELETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR = 'DELETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR';

export const DELETE_USER_WHOLE_EXERCISE_REQUEST = 'DELETE_USER_WHOLE_EXERCISE_REQUEST';
export const DELETE_USER_WHOLE_EXERCISE_SUCCESS = 'DELETE_USER_WHOLE_EXERCISE_SUCCESS';
export const DELETE_USER_WHOLE_EXERCISE_ERROR = 'DELETE_USER_WHOLE_EXERCISE_ERROR';

export const DELETE_USER_SINGLE_EXERCISE_REQUEST = 'DELETE_USER_SINGLE_EXERCISE_REQUEST';
export const DELETE_USER_SINGLE_EXERCISE_SUCCESS = 'DELETE_USER_SINGLE_EXERCISE_SUCCESS';
export const DELETE_USER_SINGLE_EXERCISE_ERROR = 'DELETE_USER_SINGLE_EXERCISE_ERROR';

export const COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST = 'COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST';
export const COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS = 'COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS';
export const COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR = 'COMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR';

export const INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST = 'INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_REQUEST';
export const INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS = 'INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_SUCCESS';
export const INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR = 'INCOMPLETE_USERS_BULK_WORKOUT_SCHEDULE_ERROR';

export const GET_PROGRAMS_NAME_REQUEST = 'GET_PROGRAMS_NAME_REQUEST';
export const GET_PROGRAMS_NAME_SUCCESS = 'GET_PROGRAMS_NAME_SUCCESS';
export const GET_PROGRAMS_NAME_ERROR = 'GET_PROGRAMS_NAME_ERROR';

export const USER_ASSIGN_PROGRAM_REQUEST = 'USER_ASSIGN_PROGRAM_REQUEST';
export const USER_ASSIGN_PROGRAM_SUCCESS = 'USER_ASSIGN_PROGRAM_SUCCESS';
export const USER_ASSIGN_PROGRAM_ERROR = 'USER_ASSIGN_PROGRAM_ERROR';

export const ADD_USER_WORKOUT_TITLE_REQUEST = 'ADD_USER_WORKOUT_TITLE_REQUEST';
export const ADD_USER_WORKOUT_TITLE_SUCCESS = 'ADD_USER_WORKOUT_TITLE_SUCCESS';
export const ADD_USER_WORKOUT_TITLE_ERROR = 'ADD_USER_WORKOUT_TITLE_ERROR';

export const UPDATE_USER_WORKOUT_TITLE_REQUEST = 'UPDATE_USER_WORKOUT_TITLE_REQUEST';
export const UPDATE_USER_WORKOUT_TITLE_SUCCESS = 'UPDATE_USER_WORKOUT_TITLE_SUCCESS';
export const UPDATE_USER_WORKOUT_TITLE_ERROR = 'UPDATE_USER_WORKOUT_TITLE_ERROR';

export const CHANGE_WORKOUT_MAIN_TYPE = 'CHANGE_WORKOUT_MAIN_TYPE';

export const GET_EXERCISE_MEASUREMENT_REQUEST = 'GET_EXERCISE_MEASUREMENT_REQUEST';
export const GET_EXERCISE_MEASUREMENT_SUCCESS = 'GET_EXERCISE_MEASUREMENT_SUCCESS';
export const GET_EXERCISE_MEASUREMENT_ERROR = 'GET_EXERCISE_MEASUREMENT_ERROR';

export const PASTE_USERS_WORKOUT_SCHEDULE_REQUEST = 'PASTE_USERS_WORKOUT_SCHEDULE_REQUEST';
export const PASTE_USERS_WORKOUT_SCHEDULE_SUCCESS = 'PASTE_USERS_WORKOUT_SCHEDULE_SUCCESS';
export const PASTE_USERS_WORKOUT_SCHEDULE_ERROR = 'PASTE_USERS_WORKOUT_SCHEDULE_ERROR';

export const CHANGE_USERS_WORKOUT_FORM_ACTION = 'CHANGE_USERS_WORKOUT_FORM_ACTION';

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

export function getUsersWorkoutScheduleRequest(_id) {
    return {
        type: GET_USERS_WORKOUT_SCHEDULE_REQUEST,
        _id,
    }
}

export function getUsersWorkoutScheduleSuccess(data) {
    return {
        type: GET_USERS_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function getUsersWorkoutScheduleError(error) {
    return {
        type: GET_USERS_WORKOUT_SCHEDULE_ERROR,
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

export function updateUsersWorkoutScheduleRequest(requestData) {
    return {
        type: UPDATE_USERS_WORKOUT_SCHEDULE_REQUEST,
        requestData,
    }
}

export function updateUsersWorkoutScheduleSuccess(data) {
    return {
        type: UPDATE_USERS_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function updateUsersWorkoutScheduleError(error) {
    return {
        type: UPDATE_USERS_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}

export function pasteUsersWorkoutScheduleRequest(requestData) {
    return {
        type: PASTE_USERS_WORKOUT_SCHEDULE_REQUEST,
        requestData,
    }
}

export function pasteUsersWorkoutScheduleSuccess(data) {
    return {
        type: PASTE_USERS_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function pasteUsersWorkoutScheduleError(error) {
    return {
        type: PASTE_USERS_WORKOUT_SCHEDULE_ERROR,
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

export function addUserWorkoutTitleRequest(requestData) {
    return {
        type: ADD_USER_WORKOUT_TITLE_REQUEST,
        requestData,
    }
}

export function addUserWorkoutTitleSuccess(data) {
    return {
        type: ADD_USER_WORKOUT_TITLE_SUCCESS,
        data,
    }
}

export function addUserWorkoutTitleError(error) {
    return {
        type: ADD_USER_WORKOUT_TITLE_ERROR,
        error
    }
}

export function updateUserWorkoutTitleRequest(_id, requestData) {
    return {
        type: UPDATE_USER_WORKOUT_TITLE_REQUEST,
        requestData,
        _id,
    }
}

export function updateUserWorkoutTitleSuccess(data) {
    return {
        type: UPDATE_USER_WORKOUT_TITLE_SUCCESS,
        data,
    }
}

export function updateUserWorkoutTitleError(error) {
    return {
        type: UPDATE_USER_WORKOUT_TITLE_ERROR,
        error
    }
}

export function changeWorkoutMainType(mainType = SCHEDULED_WORKOUT_TYPE_WARMUP) {
    return {
        type: CHANGE_WORKOUT_MAIN_TYPE,
        mainType
    }
}

export function getExerciseMeasurementRequest() {
    return {
        type: GET_EXERCISE_MEASUREMENT_REQUEST,
    }
}

export function getExerciseMeasurementSuccess(data) {
    return {
        type: GET_EXERCISE_MEASUREMENT_SUCCESS,
        data,
    }
}

export function getExerciseMeasurementError(error) {
    return {
        type: GET_EXERCISE_MEASUREMENT_ERROR,
        error,
    }
}

export function deleteUserWholeExerciseRequest(requestData) {
    return {
        type: DELETE_USER_WHOLE_EXERCISE_REQUEST,
        requestData,
    }
}

export function deleteUserWholeExerciseSuccess(data) {
    return {
        type: DELETE_USER_WHOLE_EXERCISE_SUCCESS,
        data,
    }
}

export function deleteUserWholeExerciseError(error) {
    return {
        type: DELETE_USER_WHOLE_EXERCISE_ERROR,
        error,
    }
}

export function deleteUserSingleExerciseRequest(requestData) {
    return {
        type: DELETE_USER_SINGLE_EXERCISE_REQUEST,
        requestData,
    }
}

export function deleteUserSingleExerciseSuccess(data) {
    return {
        type: DELETE_USER_SINGLE_EXERCISE_SUCCESS,
        data,
    }
}

export function deleteUserSingleExerciseError(error) {
    return {
        type: DELETE_USER_SINGLE_EXERCISE_ERROR,
        error,
    }
}

export function changeUsersWorkoutFormAction(action = 'add', data = null) {
    return {
        type: CHANGE_USERS_WORKOUT_FORM_ACTION,
        action,
        data,
    }
}