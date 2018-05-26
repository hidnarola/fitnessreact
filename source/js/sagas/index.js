import { all } from 'redux-saga/effects';

import userBodyMeasurement from 'sagas/userBodyMeasurement';
import peopleSagas from 'sagas/people';
import dashboardSagas from 'sagas/dashboard';
import nutritionsSagas from 'sagas/nutritions';
import userEquipments from 'sagas/userEquipments'
import userExercisePreferences from 'sagas/userExercisePreferences'
import userNutritionPreferences from 'sagas/userNutritionPreferences'
import userNutritions from 'sagas/userNutritions'
import userExerciseTypes from 'sagas/userExerciseTypes'
import userBodyparts from 'sagas/userBodyparts'
import userExercises from 'sagas/userExercises'
import userFitnessTests from 'sagas/userFitnessTests'
import userShoppingList from 'sagas/userShoppingList'
import userWorkouts from 'sagas/userWorkouts'
import userGalleryPhotos from 'sagas/userGalleryPhotos'
import profile from 'sagas/profile';
import friends from 'sagas/friends';
import login from 'sagas/login'
import healthLabels from 'sagas/healthLabels'
import dietLabels from 'sagas/dietLabels'
import userProgressPhotos from 'sagas/userProgressPhotos'
import adminEquipmentSagas from 'sagas/admin/equipments';
import adminEquipmentCategorySagas from 'sagas/admin/equipmentCategories';
import adminExerciseSagas from 'sagas/admin/exercises';
import adminBodyPartSagas from 'sagas/admin/bodyParts';
import adminExerciseTypeSagas from 'sagas/admin/exerciseTypes';
import adminUserSagas from 'sagas/admin/users';
import adminBadgeCategorySagas from 'sagas/admin/badgeCategories';
import adminBadgeTaskSagas from 'sagas/admin/badgeTasks';
import adminBadgeSagas from 'sagas/admin/badges';
import adminFitnessTestSagas from 'sagas/admin/fitnessTests';

export default function* rootSaga() {
  yield all([
    ...userBodyMeasurement,
    ...peopleSagas,
    ...dashboardSagas,
    ...nutritionsSagas,
    ...userEquipments,
    ...userExercisePreferences,
    ...userNutritionPreferences,
    ...userNutritions,
    ...userExerciseTypes,
    ...userBodyparts,
    ...userExercises,
    ...userFitnessTests,
    ...userShoppingList,
    ...userWorkouts,
    ...userGalleryPhotos,
    ...profile,
    ...friends,
    ...login,
    ...healthLabels,
    ...dietLabels,
    ...userProgressPhotos,
    ...adminEquipmentSagas,
    ...adminEquipmentCategorySagas,
    ...adminExerciseSagas,
    ...adminBodyPartSagas,
    ...adminExerciseTypeSagas,
    ...adminUserSagas,
    ...adminBadgeCategorySagas,
    ...adminBadgeTaskSagas,
    ...adminBadgeSagas,
    ...adminFitnessTestSagas,
  ]);
}
