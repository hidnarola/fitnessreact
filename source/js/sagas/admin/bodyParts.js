import { takeLatest, put, call } from 'redux-saga/effects';
import {
    BODY_PARTS_ADD_REQUEST,
    bodyPartAddError,
    bodyPartAddSuccess,
    bodyPartListSuccess,
    bodyPartListError,
    BODY_PARTS_LIST_REQUEST,
    bodyPartDeleteSuccess,
    bodyPartDeleteError,
    BODY_PARTS_DELETE_REQUEST,
    bodyPartSelectOneSuccess,
    bodyPartSelectOneError,
    BODY_PARTS_SELECT_ONE_REQUEST,
    bodyPartUpdateSuccess,
    bodyPartUpdateError,
    BODY_PARTS_UPDATE_REQUEST
} from "../../actions/admin/bodyParts";
import api from 'api/admin/bodyParts';

function getAdminBodyPartsData() {
    return function* (action) {
        try {
            const data = yield call(() => api.getBodyParts());
            yield put(bodyPartListSuccess(data));
        } catch (error) {
            yield put(bodyPartListError(error));
        }
    }
}

function getAdminBodyPartData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.getBodyPart(_id));
            yield put(bodyPartSelectOneSuccess(data));
        } catch (error) {
            yield put(bodyPartSelectOneError(error));
        }
    }
}

function postAdminBodyPartData() {
    return function* (action) {
        try {
            const bodyPartData = action.bodyPartData;
            const data = yield call(() => api.addBodyPart(bodyPartData));
            yield put(bodyPartAddSuccess(data));
        } catch (error) {
            yield put(bodyPartAddError(error));
        }
    }
}

function putAdminBodyPartData() {
    return function* (action) {
        try {
            const _id = action._id;
            const bodyPartData = action.bodyPartData;
            const data = yield call(() => api.updateBodyPart(_id, bodyPartData));
            yield put(bodyPartUpdateSuccess(data));
        } catch (error) {
            yield put(bodyPartUpdateError(error));
        }
    }
}

function deleteAdminBodyPartData() {
    return function* (action) {
        try {
            const _id = action._id;
            const data = yield call(() => api.deleteBodyPart(_id));
            yield put(bodyPartDeleteSuccess(data));
        } catch (error) {
            yield put(bodyPartDeleteError(error));
        }
    }
}

export function* watchAdminBodyParts() {
    yield takeLatest(BODY_PARTS_LIST_REQUEST, getAdminBodyPartsData());
    yield takeLatest(BODY_PARTS_SELECT_ONE_REQUEST, getAdminBodyPartData());
    yield takeLatest(BODY_PARTS_ADD_REQUEST, postAdminBodyPartData());
    yield takeLatest(BODY_PARTS_UPDATE_REQUEST, putAdminBodyPartData());
    yield takeLatest(BODY_PARTS_DELETE_REQUEST, deleteAdminBodyPartData());
}

export default [
    watchAdminBodyParts(),
]