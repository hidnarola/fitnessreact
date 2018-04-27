import { Map } from "immutable";
import {
    GET_USER_EXERCISE_PREFERENCES_REQUEST,
    GET_USER_EXERCISE_PREFERENCES_SUCCESS,
    GET_USER_EXERCISE_PREFERENCES_ERROR,
    SAVE_USER_EXERCISE_PREFERENCES_REQUEST,
    SAVE_USER_EXERCISE_PREFERENCES_SUCCESS,
    SAVE_USER_EXERCISE_PREFERENCES_ERROR,
    SET_USER_EXERCISE_PREFERENCES_WORKOUT_INTENSITY,
    SET_USER_EXERCISE_PREFERENCES_EXERCISE_EXPERIENCE,
    SET_USER_EXERCISE_PREFERENCES_EXCLUDE_EXERCISE,
    SET_USER_EXERCISE_PREFERENCES_EXCLUDE_EXERCISE_TYPE,
    SET_USER_EXERCISE_PREFERENCES_EXISTING_INJURIES,
    SET_USER_EXERCISE_PREFERENCES_WORKOUT_SCHEDULE_TYPE,
    SET_USER_EXERCISE_PREFERENCES_TIME_SCHEDULE,
    RESET_USER_EXERCISE_PREFERENCES_REQUEST,
    RESET_USER_EXERCISE_PREFERENCES_SUCCESS,
    RESET_USER_EXERCISE_PREFERENCES_ERROR
} from "../actions/userExercisePreferences";

const initialState = Map({
    loading: false,
    error: null,
    workoutIntensity: 0,
    exerciseExperience: 0,
    excludeExercise: [],
    excludeExerciseType: [],
    existingInjuries: [],
    workoutscheduletype: 1,
    timeSchedule: {},
});

const actionMap = {
    [GET_USER_EXERCISE_PREFERENCES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_EXERCISE_PREFERENCES_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            workoutIntensity: action.data.exercise_preference.workoutIntensity,
            exerciseExperience: action.data.exercise_preference.exerciseExperience,
            excludeExercise: action.data.exercise_preference.excludeExercise,
            excludeExerciseType: action.data.exercise_preference.excludeExerciseType,
            existingInjuries: action.data.exercise_preference.existingInjuries,
            workoutscheduletype: action.data.exercise_preference.workoutscheduletype,
            timeSchedule: action.data.exercise_preference.timeSchedule,
        }));
    },
    [GET_USER_EXERCISE_PREFERENCES_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
    [SAVE_USER_EXERCISE_PREFERENCES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [SAVE_USER_EXERCISE_PREFERENCES_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [SAVE_USER_EXERCISE_PREFERENCES_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
    [RESET_USER_EXERCISE_PREFERENCES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [RESET_USER_EXERCISE_PREFERENCES_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
        }));
    },
    [RESET_USER_EXERCISE_PREFERENCES_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error.message,
        }));
    },
    [SET_USER_EXERCISE_PREFERENCES_WORKOUT_INTENSITY]: (state, action) => {
        return state.merge(Map({
            workoutIntensity: action.data,
        }));
    },
    [SET_USER_EXERCISE_PREFERENCES_EXERCISE_EXPERIENCE]: (state, action) => {
        return state.merge(Map({
            exerciseExperience: action.data,
        }));
    },
    [SET_USER_EXERCISE_PREFERENCES_EXCLUDE_EXERCISE]: (state, action) => {
        return state.merge(Map({
            excludeExercise: action.data,
        }));
    },
    [SET_USER_EXERCISE_PREFERENCES_EXCLUDE_EXERCISE_TYPE]: (state, action) => {
        return state.merge(Map({
            excludeExerciseType: action.data,
        }));
    },
    [SET_USER_EXERCISE_PREFERENCES_EXISTING_INJURIES]: (state, action) => {
        return state.merge(Map({
            existingInjuries: action.data,
        }));
    },
    [SET_USER_EXERCISE_PREFERENCES_WORKOUT_SCHEDULE_TYPE]: (state, action) => {
        return state.merge(Map({
            workoutscheduletype: action.data,
        }));
    },
    [SET_USER_EXERCISE_PREFERENCES_TIME_SCHEDULE]: (state, action) => {
        return state.merge(Map({
            timeSchedule: action.data,
        }));
    },
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}