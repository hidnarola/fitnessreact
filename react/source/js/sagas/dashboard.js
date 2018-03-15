import { delay } from 'redux-saga'
import { takeLatest, call, put  } from 'redux-saga/effects';

import {    
    GET_DASHBOARD_START,GET_DASHBOARD_ERROR,GET_DASHBOARD_SUCCESS
} from '../actions/dashboard';

import api from 'api/newapi';

 
//----------------------------------------------------------------------------------------

function makeDashboardReq() {
    return function* (options) { // eslint-disable-line consistent-return
        try {
            const data = yield call(() => api.getAPI(options.id));
            const action = { type: GET_DASHBOARD_SUCCESS, data };
            // yield delay(3000);
            yield put(action);
        } catch (error) {
            const action = { type: GET_DASHBOARD_ERROR, error };
            yield put(action);
        }
    };
}

export function* fetchDashboardData(){
    yield takeLatest(GET_DASHBOARD_START,makeDashboardReq())
}
 
export default [
    fetchDashboardData()
];
