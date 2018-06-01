import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/postLikes';
import {
    toggleLikeOnPostSuccess,
    toggleLikeOnPostError,
    TOGGLE_LIKE_ON_POST_REQUEST
} from '../actions/postLikes';

function postLikeOnPostData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.toggleLikeOnPost(requestData));
            yield put(toggleLikeOnPostSuccess(data));
        } catch (error) {
            yield put(toggleLikeOnPostError(error));
        }
    }
}

export function* watchLikeOnPostData() {
    yield takeLatest(TOGGLE_LIKE_ON_POST_REQUEST, postLikeOnPostData());
}

export default [
    watchLikeOnPostData()
];