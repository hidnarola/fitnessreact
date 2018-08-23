import { takeLatest, call } from "redux-saga/effects";
import { GET_USER_STATS_REQUEST, getUserStatsSuccess, getUserStatsError } from "../actions/userStats";
import api from "../api/userStats";

function getUserStatsData(action) {
    return function* () {
        try {
            let requestData = action.requestData;
            let data = yield call(() => api.getUserStatsData(requestData));
            yield put(getUserStatsSuccess(data));
        } catch (error) {
            yield put(getUserStatsError(error));
        }
    }
}

export function* watchUserStatsData() {
    yield takeLatest(GET_USER_STATS_REQUEST, getUserStatsData());
}

export default [
    watchUserStatsData
];