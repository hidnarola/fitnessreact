export const GET_USER_PROGRAMS_REQUEST = 'GET_USER_PROGRAMS_REQUEST';
export const GET_USER_PROGRAMS_SUCCESS = 'GET_USER_PROGRAMS_SUCCESS';
export const GET_USER_PROGRAMS_ERROR = 'GET_USER_PROGRAMS_ERROR';

export const SET_SELECTED_DAY_FOR_PROGRAM = 'SET_SELECTED_DAY_FOR_PROGRAM';

export const ADD_USER_PROGRAM_MASTER_REQUEST = 'ADD_USER_PROGRAM_MASTER_REQUEST';
export const ADD_USER_PROGRAM_MASTER_SUCCESS = 'ADD_USER_PROGRAM_MASTER_SUCCESS';
export const ADD_USER_PROGRAM_MASTER_ERROR = 'ADD_USER_PROGRAM_MASTER_ERROR';

export const DELETE_USER_PROGRAM_REQUEST = 'DELETE_USER_PROGRAM_REQUEST';
export const DELETE_USER_PROGRAM_SUCCESS = 'DELETE_USER_PROGRAM_SUCCESS';
export const DELETE_USER_PROGRAM_ERROR = 'DELETE_USER_PROGRAM_ERROR';

export const GET_USER_PROGRAM_REQUEST = 'GET_USER_PROGRAM_REQUEST';
export const GET_USER_PROGRAM_SUCCESS = 'GET_USER_PROGRAM_SUCCESS';
export const GET_USER_PROGRAM_ERROR = 'GET_USER_PROGRAM_ERROR';

export const DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST = 'DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST';
export const DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS = 'DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS';
export const DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR = 'DELETE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR';

export const ADD_USER_PROGRAM_WORKOUT_TITLE_REQUEST = 'ADD_USER_PROGRAM_WORKOUT_TITLE_REQUEST';
export const ADD_USER_PROGRAM_WORKOUT_TITLE_SUCCESS = 'ADD_USER_PROGRAM_WORKOUT_TITLE_SUCCESS';
export const ADD_USER_PROGRAM_WORKOUT_TITLE_ERROR = 'ADD_USER_PROGRAM_WORKOUT_TITLE_ERROR';

export const GET_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST = 'GET_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST';
export const GET_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS = 'GET_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS';
export const GET_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR = 'GET_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR';

export const CHANGE_PROGRAM_WORKOUT_MAIN_TYPE = 'CHANGE_PROGRAM_WORKOUT_MAIN_TYPE';
export const CHANGE_PROGRAM_WORKOUT_MAIN_TYPE_DETAILS = 'CHANGE_PROGRAM_WORKOUT_MAIN_TYPE_DETAILS';

export const CHANGE_USERS_PROGRAM_WORKOUT_FORM_ACTION = 'CHANGE_USERS_PROGRAM_WORKOUT_FORM_ACTION';

export const ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST = 'ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST';
export const ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS = 'ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS';
export const ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR = 'ADD_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR';

export const UPDATE_USER_PROGRAM_WORKOUT_TITLE_REQUEST = 'UPDATE_USER_PROGRAM_WORKOUT_TITLE_REQUEST';
export const UPDATE_USER_PROGRAM_WORKOUT_TITLE_SUCCESS = 'UPDATE_USER_PROGRAM_WORKOUT_TITLE_SUCCESS';
export const UPDATE_USER_PROGRAM_WORKOUT_TITLE_ERROR = 'UPDATE_USER_PROGRAM_WORKOUT_TITLE_ERROR';

export const UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST = 'UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST';
export const UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS = 'UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS';
export const UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR = 'UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR';

export const DELETE_USER_PROGRAM_SINGLE_EXERCISE_REQUEST = 'DELETE_USER_PROGRAM_SINGLE_EXERCISE_REQUEST';
export const DELETE_USER_PROGRAM_SINGLE_EXERCISE_SUCCESS = 'DELETE_USER_PROGRAM_SINGLE_EXERCISE_SUCCESS';
export const DELETE_USER_PROGRAM_SINGLE_EXERCISE_ERROR = 'DELETE_USER_PROGRAM_SINGLE_EXERCISE_ERROR';

export const DELETE_USER_PROGRAM_WHOLE_EXERCISE_REQUEST = 'DELETE_USER_PROGRAM_WHOLE_EXERCISE_REQUEST';
export const DELETE_USER_PROGRAM_WHOLE_EXERCISE_SUCCESS = 'DELETE_USER_PROGRAM_WHOLE_EXERCISE_SUCCESS';
export const DELETE_USER_PROGRAM_WHOLE_EXERCISE_ERROR = 'DELETE_USER_PROGRAM_WHOLE_EXERCISE_ERROR';

export const DELETE_USER_PROGRAM_BULK_EXERCISE_REQUEST = 'DELETE_USER_PROGRAM_BULK_EXERCISE_REQUEST';
export const DELETE_USER_PROGRAM_BULK_EXERCISE_SUCCESS = 'DELETE_USER_PROGRAM_BULK_EXERCISE_SUCCESS';
export const DELETE_USER_PROGRAM_BULK_EXERCISE_ERROR = 'DELETE_USER_PROGRAM_BULK_EXERCISE_ERROR';

export const COPY_USER_PROGRAM_WORKOUT_SCHEDULE = 'COPY_USER_PROGRAM_WORKOUT_SCHEDULE';

export const PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST = 'PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST';
export const PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS = 'PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS';
export const PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR = 'PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR';

export const UPDATE_USER_PROGRAM_MASTER_REQUEST = 'UPDATE_USER_PROGRAM_MASTER_REQUEST';
export const UPDATE_USER_PROGRAM_MASTER_SUCCESS = 'UPDATE_USER_PROGRAM_MASTER_SUCCESS';
export const UPDATE_USER_PROGRAM_MASTER_ERROR = 'UPDATE_USER_PROGRAM_MASTER_ERROR';

export const GET_WORKOUTS_LIST_BY_PROGRAM_DAY_REQUEST = 'GET_WORKOUTS_LIST_BY_PROGRAM_DAY_REQUEST';
export const GET_WORKOUTS_LIST_BY_PROGRAM_DAY_SUCCESS = 'GET_WORKOUTS_LIST_BY_PROGRAM_DAY_SUCCESS';
export const GET_WORKOUTS_LIST_BY_PROGRAM_DAY_ERROR = 'GET_WORKOUTS_LIST_BY_PROGRAM_DAY_ERROR';

export const REORDER_PROGRAM_WORKOUT_EXERCISES = 'REORDER_PROGRAM_WORKOUT_EXERCISES';

export const REORDER_PROGRAM_WORKOUT_EXERCISES_REQUEST = 'REORDER_PROGRAM_WORKOUT_EXERCISES_REQUEST';
export const REORDER_PROGRAM_WORKOUT_EXERCISES_SUCCESS = 'REORDER_PROGRAM_WORKOUT_EXERCISES_SUCCESS';
export const REORDER_PROGRAM_WORKOUT_EXERCISES_ERROR = 'REORDER_PROGRAM_WORKOUT_EXERCISES_ERROR';

export const SET_USER_PROGRAM_STATE = 'SET_USER_PROGRAM_STATE';

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

export function setSelectedDayForProgram(day = null) {
    return {
        type: SET_SELECTED_DAY_FOR_PROGRAM,
        day
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

export function addUserProgramWorkoutTitleRequest(requestData) {
    return {
        type: ADD_USER_PROGRAM_WORKOUT_TITLE_REQUEST,
        requestData,
    }
}

export function addUserProgramWorkoutTitleSuccess(data) {
    return {
        type: ADD_USER_PROGRAM_WORKOUT_TITLE_SUCCESS,
        data,
    }
}

export function addUserProgramWorkoutTitleError(error) {
    return {
        type: ADD_USER_PROGRAM_WORKOUT_TITLE_ERROR,
        error
    }
}

export function getUsersProgramWorkoutScheduleRequest(_id) {
    return {
        type: GET_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
        _id,
    }
}

export function getUsersProgramWorkoutScheduleSuccess(data) {
    return {
        type: GET_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function getUsersProgramWorkoutScheduleError(error) {
    return {
        type: GET_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}

export function changeProgramWorkoutMainType(mainType = SCHEDULED_WORKOUT_TYPE_WARMUP) {
    return {
        type: CHANGE_PROGRAM_WORKOUT_MAIN_TYPE,
        mainType
    }
}

export function changeProgramWorkoutMainTypeDetails(mainType = SCHEDULED_WORKOUT_TYPE_WARMUP) {
    return {
        type: CHANGE_PROGRAM_WORKOUT_MAIN_TYPE_DETAILS,
        mainType
    }
}

export function changeUsersProgramWorkoutFormAction(action = 'add', data = null) {
    return {
        type: CHANGE_USERS_PROGRAM_WORKOUT_FORM_ACTION,
        action,
        data,
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

export function updateUserProgramWorkoutTitleRequest(_id, requestData) {
    return {
        type: UPDATE_USER_PROGRAM_WORKOUT_TITLE_REQUEST,
        requestData,
        _id,
    }
}

export function updateUserProgramWorkoutTitleSuccess(data) {
    return {
        type: UPDATE_USER_PROGRAM_WORKOUT_TITLE_SUCCESS,
        data,
    }
}

export function updateUserProgramWorkoutTitleError(error) {
    return {
        type: UPDATE_USER_PROGRAM_WORKOUT_TITLE_ERROR,
        error
    }
}

export function updateUsersProgramWorkoutScheduleRequest(requestData) {
    return {
        type: UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
        requestData,
    }
}

export function updateUsersProgramWorkoutScheduleSuccess(data) {
    return {
        type: UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function updateUsersProgramWorkoutScheduleError(error) {
    return {
        type: UPDATE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}

export function deleteUserProgramSingleExerciseRequest(requestData) {
    return {
        type: DELETE_USER_PROGRAM_SINGLE_EXERCISE_REQUEST,
        requestData,
    }
}

export function deleteUserProgramSingleExerciseSuccess(data) {
    return {
        type: DELETE_USER_PROGRAM_SINGLE_EXERCISE_SUCCESS,
        data,
    }
}

export function deleteUserProgramSingleExerciseError(error) {
    return {
        type: DELETE_USER_PROGRAM_SINGLE_EXERCISE_ERROR,
        error,
    }
}

export function deleteUserProgramWholeExerciseRequest(requestData) {
    return {
        type: DELETE_USER_PROGRAM_WHOLE_EXERCISE_REQUEST,
        requestData,
    }
}

export function deleteUserProgramWholeExerciseSuccess(data) {
    return {
        type: DELETE_USER_PROGRAM_WHOLE_EXERCISE_SUCCESS,
        data,
    }
}

export function deleteUserProgramWholeExerciseError(error) {
    return {
        type: DELETE_USER_PROGRAM_WHOLE_EXERCISE_ERROR,
        error,
    }
}

export function copyUserProgramWorkoutSchedule(selectedData) {
    return {
        type: COPY_USER_PROGRAM_WORKOUT_SCHEDULE,
        selectedData,
    }
}

export function pasteUsersProgramWorkoutScheduleRequest(requestData) {
    return {
        type: PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_REQUEST,
        requestData,
    }
}

export function pasteUsersProgramWorkoutScheduleSuccess(data) {
    return {
        type: PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_SUCCESS,
        data,
    }
}

export function pasteUsersProgramWorkoutScheduleError(error) {
    return {
        type: PASTE_USERS_PROGRAM_WORKOUT_SCHEDULE_ERROR,
        error,
    }
}

export function updateUserProgramMasterRequest(_id, requestData) {
    return {
        type: UPDATE_USER_PROGRAM_MASTER_REQUEST,
        requestData,
        _id,
    }
}

export function updateUserProgramMasterSuccess(data) {
    return {
        type: UPDATE_USER_PROGRAM_MASTER_SUCCESS,
        data,
    }
}

export function updateUserProgramMasterError(error) {
    return {
        type: UPDATE_USER_PROGRAM_MASTER_ERROR,
        error
    }
}

export function getWorkoutsListByProgramDayRequest(requestData) {
    return {
        type: GET_WORKOUTS_LIST_BY_PROGRAM_DAY_REQUEST,
        requestData,
    }
}

export function getWorkoutsListByProgramDaySuccess(data) {
    return {
        type: GET_WORKOUTS_LIST_BY_PROGRAM_DAY_SUCCESS,
        data
    }
}

export function getWorkoutsListByProgramDayError(error) {
    return {
        type: GET_WORKOUTS_LIST_BY_PROGRAM_DAY_ERROR,
        error
    }
}

export function deleteUserProgramBulkExerciseRequest(requestData) {
    return {
        type: DELETE_USER_PROGRAM_BULK_EXERCISE_REQUEST,
        requestData,
    }
}

export function deleteUserProgramBulkExerciseSuccess(data) {
    return {
        type: DELETE_USER_PROGRAM_BULK_EXERCISE_SUCCESS,
        data,
    }
}

export function deleteUserProgramBulkExerciseError(error) {
    return {
        type: DELETE_USER_PROGRAM_BULK_EXERCISE_ERROR,
        error,
    }
}

export function reorderProgramWorkoutExercises(newOrder) {
    return {
        type: REORDER_PROGRAM_WORKOUT_EXERCISES,
        newOrder,
    }
}

export function reorderProgramWorkoutExercisesRequest(requestData) {
    return {
        type: REORDER_PROGRAM_WORKOUT_EXERCISES_REQUEST,
        requestData,
    }
}

export function reorderProgramWorkoutExercisesSuccess(data) {
    return {
        type: REORDER_PROGRAM_WORKOUT_EXERCISES_SUCCESS,
        data
    }
}

export function reorderProgramWorkoutExercisesError(error) {
    return {
        type: REORDER_PROGRAM_WORKOUT_EXERCISES_ERROR,
        error
    }
}

export function setUserProgramState(stateData) {
    return {
        type: SET_USER_PROGRAM_STATE,
        stateData
    }
}