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
    GET_USER_BODY_MEASUREMENT_LOG_DATES_ERROR
} from "../actions/userBodyMeasurement";

const initialState = Map({
    loading: false,
    error: null,
    measurement: null,
    loadingLogDates: false,
    errorLogDates: null,
    logDates: [],
});

const actionsMap = {
    [GET_USER_BODY_MEASUREMENT_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [GET_USER_BODY_MEASUREMENT_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            measurement: action.data.measurement,
        }));
    },
    [GET_USER_BODY_MEASUREMENT_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error,
        }));
    },
    [GET_USER_BODY_MEASUREMENT_LOG_DATES_REQUEST]: (state, action) => {
        return state.merge(Map({
            loadingLogDates: true,
        }));
    },
    [GET_USER_BODY_MEASUREMENT_LOG_DATES_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loadingLogDates: false,
            logDates: action.data.logdates,
        }));
    },
    [GET_USER_BODY_MEASUREMENT_LOG_DATES_ERROR]: (state, action) => {
        return state.merge(Map({
            loadingLogDates: false,
            errorLogDates: action.error,
        }));
    },
    [SAVE_USER_BODY_MEASUREMENT_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
        }));
    },
    [SAVE_USER_BODY_MEASUREMENT_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            measurement: action.data.measurement,
        }));
    },
    [SAVE_USER_BODY_MEASUREMENT_ERROR]: (state, action) => {
        return state.merge(Map({
            loading: false,
            error: action.error,
        }));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
