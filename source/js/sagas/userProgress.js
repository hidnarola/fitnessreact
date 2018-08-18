import { takeLatest, call, put } from "redux-saga/effects";
import api from "api/userProgress";
import {
    GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_REQUEST,
    getUserProgressByCategoryAndDateSuccess,
    getUserProgressByCategoryAndDateError,
} from "../actions/userProgress";

function getUserProgressByCategoryAndDateData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            let data = yield call(() => api.getUserProgressByCategoryAndDate(requestData));
            yield put(getUserProgressByCategoryAndDateSuccess(data));
        } catch (error) {
            yield put(getUserProgressByCategoryAndDateError(error));
        }
    }
}

export function* watchUserProgressData() {
    yield takeLatest(GET_USER_PROGRESS_BY_CATEGORY_AND_DATE_REQUEST, getUserProgressByCategoryAndDateData());

}

export default [
    watchUserProgressData()
];