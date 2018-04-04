import { all } from 'redux-saga/effects';

import peopleSagas from 'sagas/people';
import dashboardSagas from 'sagas/dashboard';
import nutritionSagas from 'sagas/nutrition';
import exerciseFitness from 'sagas/exercise/fitness'
import exerciseEquipments from 'sagas/exercise/equipments'
import friends from 'sagas/friends';
import profilePhotos from 'sagas/profilePhotos';
import login from 'sagas/login'
import adminNutritionSagas from 'sagas/admin/nutritions';
import adminEquipmentSagas from 'sagas/admin/equipments';
import adminEquipmentCategorySagas from 'sagas/admin/equipmentCategories';
import adminExerciseSagas from 'sagas/admin/exercises';
import adminBodyPartSagas from 'sagas/admin/bodyParts';
import adminExerciseTypeSagas from 'sagas/admin/exerciseTypes';
import adminUserSagas from 'sagas/admin/users';

export default function* rootSaga() {
  yield all([
    ...peopleSagas,
    ...dashboardSagas,
    ...nutritionSagas,
    ...exerciseFitness,
    ...exerciseEquipments,
    ...friends,
    ...profilePhotos,
    ...login,
    ...adminNutritionSagas,
    ...adminEquipmentSagas,
    ...adminEquipmentCategorySagas,
    ...adminExerciseSagas,
    ...adminBodyPartSagas,
    ...adminExerciseTypeSagas,
    ...adminUserSagas,
  ]);
}
