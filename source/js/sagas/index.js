import { all } from 'redux-saga/effects';

import userBodyMeasurement from 'sagas/userBodyMeasurement';
import peopleSagas from 'sagas/people';
import dashboardSagas from 'sagas/dashboard';
import nutritionSagas from 'sagas/nutrition';
import exerciseFitness from 'sagas/exercise/fitness'
import userEquipments from 'sagas/userEquipments'
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
import adminRecipeSagas from 'sagas/admin/recipes';
import adminIngredientSagas from 'sagas/admin/ingredients';

export default function* rootSaga() {
  yield all([
    ...userBodyMeasurement,
    ...peopleSagas,
    ...dashboardSagas,
    ...nutritionSagas,
    ...exerciseFitness,
    ...userEquipments,
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
    ...adminRecipeSagas,
    ...adminIngredientSagas,
  ]);
}
