import { all } from 'redux-saga/effects';

import userBodyMeasurement from 'sagas/userBodyMeasurement';
import peopleSagas from 'sagas/people';
import dashboardSagas from 'sagas/dashboard';
import nutritionsSagas from 'sagas/nutritions';
import exerciseFitness from 'sagas/exercise/fitness'
import userEquipments from 'sagas/userEquipments'
import userExercisePreferences from 'sagas/userExercisePreferences'
import userNutritionPreferences from 'sagas/userNutritionPreferences'
import userExerciseTypes from 'sagas/userExerciseTypes'
import userBodyparts from 'sagas/userBodyparts'
import userExercises from 'sagas/userExercises'
import profile from 'sagas/profile';
import friends from 'sagas/friends';
import login from 'sagas/login'
import healthLabels from 'sagas/healthLabels'
import dietLabels from 'sagas/dietLabels'
import userProgressPhotos from 'sagas/userProgressPhotos'
// import adminNutritionSagas from 'sagas/admin/nutritions';
import adminEquipmentSagas from 'sagas/admin/equipments';
import adminEquipmentCategorySagas from 'sagas/admin/equipmentCategories';
import adminExerciseSagas from 'sagas/admin/exercises';
import adminBodyPartSagas from 'sagas/admin/bodyParts';
import adminExerciseTypeSagas from 'sagas/admin/exerciseTypes';
import adminUserSagas from 'sagas/admin/users';
// import adminRecipeSagas from 'sagas/admin/recipes';
// import adminIngredientSagas from 'sagas/admin/ingredients';
import adminBadgeCategorySagas from 'sagas/admin/badgeCategories';
import adminBadgeTaskSagas from 'sagas/admin/badgeTasks';
import adminBadgeSagas from 'sagas/admin/badges';

export default function* rootSaga() {
  yield all([
    ...userBodyMeasurement,
    ...peopleSagas,
    ...dashboardSagas,
    ...nutritionsSagas,
    ...exerciseFitness,
    ...userEquipments,
    ...userExercisePreferences,
    ...userNutritionPreferences,
    ...userExerciseTypes,
    ...userBodyparts,
    ...userExercises,
    ...profile,
    ...friends,
    ...login,
    ...healthLabels,
    ...dietLabels,
    ...userProgressPhotos,
    // ...adminNutritionSagas,
    ...adminEquipmentSagas,
    ...adminEquipmentCategorySagas,
    ...adminExerciseSagas,
    ...adminBodyPartSagas,
    ...adminExerciseTypeSagas,
    ...adminUserSagas,
    // ...adminRecipeSagas,
    // ...adminIngredientSagas,
    ...adminBadgeCategorySagas,
    ...adminBadgeTaskSagas,
    ...adminBadgeSagas,
  ]);
}
