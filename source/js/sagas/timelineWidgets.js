import { takeLatest, call, put } from "redux-saga/effects";
import api from "../api/timelineWidgets";
import {
    GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST,
    getTimelineWidgetsAndWidgetsDataSuccess,
    getTimelineWidgetsAndWidgetsDataError
} from "../actions/timelineWidgets";

function getWidgetsAndWidgetsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getWidgetsAndWidgetsData());
            yield put(getTimelineWidgetsAndWidgetsDataSuccess(data));
        } catch (error) {
            yield put(getTimelineWidgetsAndWidgetsDataError(error));
        }
    }
}

export function* watchTimelineWidgetsData() {
    yield takeLatest(GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST, getWidgetsAndWidgetsData());
}

export default [
    watchTimelineWidgetsData()
];