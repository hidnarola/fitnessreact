import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/userProgramsRating';
import { saveUserProgramsRatingSuccess, saveUserProgramsRatingError, SAVE_USER_PROGRAMS_RATING_REQUEST } from '../actions/userProgramsRating';

function saveUserProgramsRatingData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.saveUserProgramsRating(requestData));
            yield put(saveUserProgramsRatingSuccess(data));
        } catch (error) {
            yield put(saveUserProgramsRatingError(error));
        }
    }
}

export function* watchUserProgramsRatingData() {
    yield takeLatest(SAVE_USER_PROGRAMS_RATING_REQUEST, saveUserProgramsRatingData());
}

export default [
    watchUserProgramsRatingData()
];