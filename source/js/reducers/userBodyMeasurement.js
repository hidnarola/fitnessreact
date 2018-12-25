import { Map } from "immutable";
import {
    GET_USER_BODY_MEASUREMENT_REQUEST,
    GET_USER_BODY_MEASUREMENT_SUCCESS,
    GET_USER_BODY_MEASUREMENT_ERROR,
    SAVE_USER_BODY_MEASUREMENT_REQUEST,
    SAVE_USER_BODY_MEASUREMENT_SUCCESS,
    SAVE_USER_BODY_MEASUREMENT_ERROR,
    GET_USER_BODY_MEASUREMENT_LOG_DATES_REQUEST,
    GET_USER_BODY_MEASUREMENT_LOG_DATES_SUCCESS,
    GET_USER_BODY_MEASUREMENT_LOG_DATES_ERROR,
    SAVE_USER_BODY_FAT_REQUEST,
    SAVE_USER_BODY_FAT_SUCCESS,
    SAVE_USER_BODY_FAT_ERROR,
    GET_PROGRESS_PHOTOS_BY_DATE_REQUEST,
    GET_PROGRESS_PHOTOS_BY_DATE_SUCCESS,
    GET_PROGRESS_PHOTOS_BY_DATE_ERROR
} from "../actions/userBodyMeasurement";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
    loading: false,
    error: [],
    measurement: null,
    bodyFat: null,
    userProgressPhotos: [],
    loadingProgressPhotos: false,
    loadingLogDates: false,
    errorLogDates: null,
    logDates: [],
});

const actionMap = {
    [GET_USER_BODY_MEASUREMENT_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            loadingProgressPhotos: true,
            measurement: null,
            bodyFat: null,
            error: [],
        }));
    },
    [GET_USER_BODY_MEASUREMENT_SUCCESS]: (state, action) => {
        let newState = { loading: false, loadingProgressPhotos: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.measurement = action.data.measurement;
            newState.bodyFat = action.data.body_fat_log;
            newState.userProgressPhotos = action.data.user_progress_photos;
        } else {
            let msg = (action.data.message) ? action.data.message : "Something went wrong! please try again later.";
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_BODY_MEASUREMENT_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            loadingProgressPhotos: false,
            error: error,
        }));
    },
    [GET_USER_BODY_MEASUREMENT_LOG_DATES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loadingLogDates: true,
            errorLogDates: null,
            logDates: [],
        }));
    },
    [GET_USER_BODY_MEASUREMENT_LOG_DATES_SUCCESS]: (state, action) => {
        let newState = { loadingLogDates: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.logDates = action.data.logdates;
        } else {
            let msg = "Log dates are not found. Please try later";
            newState.errorLogDates = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_USER_BODY_MEASUREMENT_LOG_DATES_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loadingLogDates: false,
            errorLogDates: error,
        }));
    },
    [SAVE_USER_BODY_MEASUREMENT_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            loadingProgressPhotos: true,
            error: [],
        }));
    },
    [SAVE_USER_BODY_MEASUREMENT_SUCCESS]: (state, action) => {
        let newState = { loading: false, loadingProgressPhotos: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.measurement = action.data.measurement;
        } else {
            let msg = (action.data.message) ? action.data.message : "Something went wrong! please try again later.";
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [SAVE_USER_BODY_MEASUREMENT_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            loadingProgressPhotos: false,
            error: error,
        }));
    },
    [SAVE_USER_BODY_FAT_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            loadingProgressPhotos: true,
            error: [],
        }));
    },
    [SAVE_USER_BODY_FAT_SUCCESS]: (state, action) => {
        let newState = { loading: false, loadingProgressPhotos: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.bodyFat = action.data.body_fat_log;
        } else {
            let msg = (action.data.message) ? action.data.message : "Something went wrong! please try again later.";
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [SAVE_USER_BODY_FAT_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loading: false,
            loadingProgressPhotos: false,
            error: error,
        }));
    },
    [GET_PROGRESS_PHOTOS_BY_DATE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loadingProgressPhotos: true,
            error: [],
        }));
    },
    [GET_PROGRESS_PHOTOS_BY_DATE_SUCCESS]: (state, action) => {
        let newState = { loadingProgressPhotos: false };
        if (action.data && action.data.status && action.data.status === 1) {
            newState.userProgressPhotos = action.data.data;
        } else {
            let msg = (action.data.message) ? action.data.message : "Something went wrong! please try again later.";
            newState.error = [msg];
        }
        return state.merge(Map(newState));
    },
    [GET_PROGRESS_PHOTOS_BY_DATE_ERROR]: (state, action) => {
        let error = [];
        if (action.error.status && action.error.status === VALIDATION_FAILURE_STATUS && action.error.response.message) {
            error = generateValidationErrorMsgArr(action.error.response.message);
        } else if (action.error && action.error.message) {
            error = [action.error.message];
        } else {
            error = ['Something went wrong! please try again later'];
        }
        return state.merge(Map({
            loadingProgressPhotos: false,
            error: error,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    if (action && action.type) {
        var fn = actionMap[action.type];
        return fn ? fn(state, action) : state;
    }
    return state;
}
