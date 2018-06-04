import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'api/postComments';
import { commentOnPostSuccess, commentOnPostError, COMMENT_ON_POST_REQUEST } from '../actions/postComments';

function postCommentOnPostData() {
    return function* (action) {
        try {
            let requestData = action.requestData;
            const data = yield call(() => api.commentOnPost(requestData));
            yield put(commentOnPostSuccess(data));
        } catch (error) {
            yield put(commentOnPostError(error));
        }
    }
}

export function* watchCommentOnPostData() {
    yield takeLatest(COMMENT_ON_POST_REQUEST, postCommentOnPostData());
}

export default [
    watchCommentOnPostData()
];