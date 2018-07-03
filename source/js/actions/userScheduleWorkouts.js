export const SET_SELECTED_SLOT_FROM_CALENDAR = 'SET_SELECTED_SLOT_FROM_CALENDAR';

export const GET_USERS_WORKOUT_SCHEDULES_REQUEST = 'GET_USERS_WORKOUT_SCHEDULES_REQUEST';
export const GET_USERS_WORKOUT_SCHEDULES_SUCCESS = 'GET_USERS_WORKOUT_SCHEDULES_SUCCESS';
export const GET_USERS_WORKOUT_SCHEDULES_ERROR = 'GET_USERS_WORKOUT_SCHEDULES_ERROR';

export const GET_EXERCISES_NAME_REQUEST = 'GET_EXERCISES_NAME_REQUEST';
export const GET_EXERCISES_NAME_SUCCESS = 'GET_EXERCISES_NAME_SUCCESS';
export const GET_EXERCISES_NAME_ERROR = 'GET_EXERCISES_NAME_ERROR';

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