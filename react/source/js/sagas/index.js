import { all } from 'redux-saga/effects';

import peopleSagas from 'sagas/people';
import dashboardSagas from 'sagas/dashboard';
import nutritionSagas from 'sagas/nutrition';

export default function* rootSaga() {
  yield all([
    ...peopleSagas,
    ...dashboardSagas,
    ...nutritionSagas,
  ]);
}
