import { all } from 'redux-saga/effects';

import userBodyMeasurement from 'sagas/userBodyMeasurement';
import dashboardSagas from 'sagas/dashboard';
import nutritionsSagas from 'sagas/nutritions';
import userEquipments from 'sagas/userEquipments';
import userExercisePreferences from 'sagas/userExercisePreferences';
import userNutritionPreferences from 'sagas/userNutritionPreferences';
import userNutritions from 'sagas/userNutritions';
import userExerciseTypes from 'sagas/userExerciseTypes';
import userBodyparts from 'sagas/userBodyparts';
import userExercises from 'sagas/userExercises';
import userFitnessTests from 'sagas/userFitnessTests';
import userShoppingList from 'sagas/userShoppingList';
import userScheduleWorkouts from 'sagas/userScheduleWorkouts';
import userPrograms from 'sagas/userPrograms';
import userTimeline from 'sagas/userTimeline';
import userPersonalGoals from 'sagas/userPersonalGoals';
import userSecondaryGoals from 'sagas/userSecondaryGoals';
import userPrimaryGoals from 'sagas/userPrimaryGoals';
import userSearch from 'sagas/userSearch';
import userGalleryPhotos from 'sagas/userGalleryPhotos';
import userNotifications from 'sagas/userNotifications';
import userBadges from 'sagas/userBadges';
import userProgress from 'sagas/userProgress';
import userStats from 'sagas/userStats';
import postLikes from 'sagas/postLikes';
import postComments from 'sagas/postComments';
import profile from 'sagas/profile';
import userChangePasswordSagas from 'sagas/changePassword';
import friends from 'sagas/friends';
import login from 'sagas/login';
import healthLabels from 'sagas/healthLabels';
import dietLabels from 'sagas/dietLabels';
import userProgressPhotos from 'sagas/userProgressPhotos';
import timelineWidgets from 'sagas/timelineWidgets';
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
import adminProfile from 'sagas/admin/profile';
import adminChangePasswordSagas from 'sagas/admin/changePassword';
import adminDashboardSaga from 'sagas/admin/dashboard';

export default function* rootSaga() {
  yield all([
    ...userBodyMeasurement,
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
    ...userScheduleWorkouts,
    ...userPrograms,
    ...userTimeline,
    ...userPersonalGoals,
    ...userSecondaryGoals,
    ...userPrimaryGoals,
    ...userSearch,
    ...userGalleryPhotos,
    ...userNotifications,
    ...userBadges,
    ...userProgress,
    ...userStats,
    ...postLikes,
    ...postComments,
    ...profile,
    ...userChangePasswordSagas,
    ...friends,
    ...login,
    ...healthLabels,
    ...dietLabels,
    ...userProgressPhotos,
    ...timelineWidgets,
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
    ...adminProfile,
    ...adminChangePasswordSagas,
    ...adminDashboardSaga,
  ]);
}
