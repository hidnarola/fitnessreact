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

export const COPY_USER_WORKOUT_SCHEDULE = 'COPY_USER_WORKOUT_SCHEDULE';

export const DELETE_USERS_WORKOUT_SCHEDULE_REQUEST = 'DELETE_USERS_WORKOUT_SCHEDULE_REQUEST';
export const DELETE_USERS_WORKOUT_SCHEDULE_SUCCESS = 'DELETE_USERS_WORKOUT_SCHEDULE_SUCCESS';
export const DELETE_USERS_WORKOUT_SCHEDULE_ERROR = 'DELETE_USERS_WORKOUT_SCHEDULE_ERROR';

export const VIEW_USER_WORKOUT_SCHEDULE = 'VIEW_USER_WORKOUT_SCHEDULE';

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

export function viewUserWorkoutSchedule(selectedData) {
    return {
        type: VIEW_USER_WORKOUT_SCHEDULE,
        selectedData,
    }
}