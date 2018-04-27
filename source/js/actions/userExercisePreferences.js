export const GET_USER_EXERCISE_PREFERENCES_REQUEST = 'GET_USER_EXERCISE_PREFERENCES_REQUEST';
export const GET_USER_EXERCISE_PREFERENCES_SUCCESS = 'GET_USER_EXERCISE_PREFERENCES_SUCCESS';
export const GET_USER_EXERCISE_PREFERENCES_ERROR = 'GET_USER_EXERCISE_PREFERENCES_ERROR';

export const SAVE_USER_EXERCISE_PREFERENCES_REQUEST = 'SAVE_USER_EXERCISE_PREFERENCES_REQUEST';
export const SAVE_USER_EXERCISE_PREFERENCES_SUCCESS = 'SAVE_USER_EXERCISE_PREFERENCES_SUCCESS';
export const SAVE_USER_EXERCISE_PREFERENCES_ERROR = 'SAVE_USER_EXERCISE_PREFERENCES_ERROR';

export const RESET_USER_EXERCISE_PREFERENCES_REQUEST = 'RESET_USER_EXERCISE_PREFERENCES_REQUEST';
export const RESET_USER_EXERCISE_PREFERENCES_SUCCESS = 'RESET_USER_EXERCISE_PREFERENCES_SUCCESS';
export const RESET_USER_EXERCISE_PREFERENCES_ERROR = 'RESET_USER_EXERCISE_PREFERENCES_ERROR';

export const SET_USER_EXERCISE_PREFERENCES_WORKOUT_INTENSITY = 'SET_USER_EXERCISE_PREFERENCES_WORKOUT_INTENSITY';
export const SET_USER_EXERCISE_PREFERENCES_EXERCISE_EXPERIENCE = 'SET_USER_EXERCISE_PREFERENCES_EXERCISE_EXPERIENCE';
export const SET_USER_EXERCISE_PREFERENCES_EXCLUDE_EXERCISE = 'SET_USER_EXERCISE_PREFERENCES_EXCLUDE_EXERCISE';
export const SET_USER_EXERCISE_PREFERENCES_EXCLUDE_EXERCISE_TYPE = 'SET_USER_EXERCISE_PREFERENCES_EXCLUDE_EXERCISE_TYPE';
export const SET_USER_EXERCISE_PREFERENCES_EXISTING_INJURIES = 'SET_USER_EXERCISE_PREFERENCES_EXISTING_INJURIES';
export const SET_USER_EXERCISE_PREFERENCES_WORKOUT_SCHEDULE_TYPE = 'SET_USER_EXERCISE_PREFERENCES_WORKOUT_SCHEDULE_TYPE';
export const SET_USER_EXERCISE_PREFERENCES_TIME_SCHEDULE = 'SET_USER_EXERCISE_PREFERENCES_TIME_SCHEDULE';

export function getUserExercisePreferencesRequest() {
    return {
        type: GET_USER_EXERCISE_PREFERENCES_REQUEST,
    }
}

export function getUserExercisePreferencesSuccess(data) {
    return {
        type: GET_USER_EXERCISE_PREFERENCES_SUCCESS,
        data
    }
}

export function getUserExercisePreferencesError(error) {
    return {
        type: GET_USER_EXERCISE_PREFERENCES_ERROR,
        error
    }
}

export function saveUserExercisePreferencesRequest(requestData) {
    return {
        type: SAVE_USER_EXERCISE_PREFERENCES_REQUEST,
        requestData
    }
}

export function saveUserExercisePreferencesSuccess(data) {
    return {
        type: SAVE_USER_EXERCISE_PREFERENCES_SUCCESS,
        data
    }
}

export function saveUserExercisePreferencesError(error) {
    return {
        type: SAVE_USER_EXERCISE_PREFERENCES_ERROR,
        error
    }
}

export function resetUserExercisePreferencesRequest() {
    return {
        type: RESET_USER_EXERCISE_PREFERENCES_REQUEST,
    }
}

export function resetUserExercisePreferencesSuccess(data) {
    return {
        type: RESET_USER_EXERCISE_PREFERENCES_SUCCESS,
        data
    }
}

export function resetUserExercisePreferencesError(error) {
    return {
        type: RESET_USER_EXERCISE_PREFERENCES_ERROR,
        error
    }
}

export function setUserExercisePreferencesWorkoutIntensity(data) {
    return {
        type: SET_USER_EXERCISE_PREFERENCES_WORKOUT_INTENSITY,
        data
    }
}

export function setUserExercisePreferencesExerciseExperience(data) {
    return {
        type: SET_USER_EXERCISE_PREFERENCES_EXERCISE_EXPERIENCE,
        data
    }
}

export function setUserExercisePreferencesExcludeExercise(data) {
    return {
        type: SET_USER_EXERCISE_PREFERENCES_EXCLUDE_EXERCISE,
        data
    }
}

export function setUserExercisePreferencesExcludeExerciseType(data) {
    return {
        type: SET_USER_EXERCISE_PREFERENCES_EXCLUDE_EXERCISE_TYPE,
        data
    }
}

export function setUserExercisePreferencesExistingInjuries(data) {
    return {
        type: SET_USER_EXERCISE_PREFERENCES_EXISTING_INJURIES,
        data
    }
}

export function setUserExercisePreferencesWorkoutScheduleType(data) {
    return {
        type: SET_USER_EXERCISE_PREFERENCES_WORKOUT_SCHEDULE_TYPE,
        data
    }
}

export function setUserExercisePreferencesTimeSchedule(data) {
    return {
        type: SET_USER_EXERCISE_PREFERENCES_TIME_SCHEDULE,
        data
    }
}