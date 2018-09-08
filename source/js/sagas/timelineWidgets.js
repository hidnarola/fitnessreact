import { takeLatest, call, put } from "redux-saga/effects";
import api from "../api/timelineWidgets";
import {
    GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST,
    getTimelineWidgetsAndWidgetsDataSuccess,
    getTimelineWidgetsAndWidgetsDataError,
    SAVE_TIMELINE_WIDGETS_REQUEST,
    saveTimelineWidgetsSuccess,
    saveTimelineWidgetsError,
    CHANGE_TIMELINE_BODY_FAT_WIDGET_REQUEST,
    changeTimelineBodyFatWidgetSuccess,
    changeTimelineBodyFatWidgetError,
    changeTimelineMuscleInnerDataSuccess,
    changeTimelineMuscleInnerDataError,
    CHANGE_TIMELINE_MUSCLE_INNER_DATA_REQUEST
} from "../actions/timelineWidgets";

function getWidgetsAndWidgetsData() {
    return function* (action) {
        try {
            const username = action.username;
            const data = yield call(() => api.getWidgetsAndWidgetsData(username));
            yield put(getTimelineWidgetsAndWidgetsDataSuccess(data));
        } catch (error) {
            yield put(getTimelineWidgetsAndWidgetsDataError(error));
        }
    }
}

function saveTimelineWidgetsData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.saveTimelineWidgetsData(requestData));
            yield put(saveTimelineWidgetsSuccess(data));
        } catch (error) {
            yield put(saveTimelineWidgetsError(error));
        }
    }
}

function changeTimelineBodyFatWidgetData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.changeTimelineBodyFatWidget(requestData));
            yield put(changeTimelineBodyFatWidgetSuccess(data));
        } catch (error) {
            yield put(changeTimelineBodyFatWidgetError(error));
        }
    }
}

function changeTimelineMuscleInnerData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.changeTimelineMuscleInnerData(requestData));
            yield put(changeTimelineMuscleInnerDataSuccess(data));
        } catch (error) {
            yield put(changeTimelineMuscleInnerDataError(error));
        }
    }
}

export function* watchTimelineWidgetsData() {
    yield takeLatest(GET_TIMELINE_WIDGETS_AND_WIDGETS_DATA_REQUEST, getWidgetsAndWidgetsData());
    yield takeLatest(SAVE_TIMELINE_WIDGETS_REQUEST, saveTimelineWidgetsData());
    yield takeLatest(CHANGE_TIMELINE_BODY_FAT_WIDGET_REQUEST, changeTimelineBodyFatWidgetData());
    yield takeLatest(CHANGE_TIMELINE_MUSCLE_INNER_DATA_REQUEST, changeTimelineMuscleInnerData());
}

export default [
    watchTimelineWidgetsData()
];