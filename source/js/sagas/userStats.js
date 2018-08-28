import { takeLatest, call, put } from "redux-saga/effects";
import {
    GET_USER_STATS_REQUEST,
    getUserStatsSuccess,
    getUserStatsError,
    GET_USER_GRAPH_DATA_REQUEST,
    getUserGraphDataSuccess,
    getUserGraphDataError,
    getUserSingleStatsSuccess,
    getUserSingleStatsError,
    GET_USER_SINGLE_STATS_REQUEST,
} from "../actions/userStats";
import api from "../api/userStats";

function getUserStatsData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            let data = yield call(() => api.getUserStatsData(requestData));
            yield put(getUserStatsSuccess(data));
        } catch (error) {
            yield put(getUserStatsError(error));
        }
    }
}

function getUserGraphData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            let data = yield call(() => api.getUserGraphData(requestData));
            yield put(getUserGraphDataSuccess(data));
        } catch (error) {
            yield put(getUserGraphDataError(error));
        }
    }
}

function getUserSingleStatsData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            let data = yield call(() => api.getUserSingleStatsData(requestData));
            yield put(getUserSingleStatsSuccess(data));
        } catch (error) {
            yield put(getUserSingleStatsError(error));
        }
    }
}

export function* watchUserStatsData() {
    yield takeLatest(GET_USER_STATS_REQUEST, getUserStatsData());
    yield takeLatest(GET_USER_GRAPH_DATA_REQUEST, getUserGraphData());
    yield takeLatest(GET_USER_SINGLE_STATS_REQUEST, getUserSingleStatsData());
}

export default [
    watchUserStatsData()
];