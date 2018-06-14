import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import app from 'reducers/app';
import user from 'reducers/user';
import userBodyMeasurement from 'reducers/userBodyMeasurement';
import people from 'reducers/people';
import dashboardnew from 'reducers/dashboard';
import nutritions from 'reducers/nutritions';
import userEquipments from 'reducers/userEquipments';
import userExercisePreferences from 'reducers/userExercisePreferences';
import userNutritionPreferences from 'reducers/userNutritionPreferences';
import userNutritions from 'reducers/userNutritions';
import userExerciseTypes from 'reducers/userExerciseTypes';
import userBodyparts from 'reducers/userBodyparts';
import userExercises from 'reducers/userExercises';
import userFitnessTests from 'reducers/userFitnessTests';
import userShoppingList from 'reducers/userShoppingList';
import userWorkouts from 'reducers/userWorkouts';
import userTimeline from 'reducers/userTimeline';
import userPersonalGoals from 'reducers/userPersonalGoals';
import userSecondaryGoals from 'reducers/userSecondaryGoals';
import userPrimaryGoals from 'reducers/userPrimaryGoals';
import userSearch from 'reducers/userSearch';
import userGalleryPhotos from 'reducers/userGalleryPhotos';
import postLikes from 'reducers/postLikes';
import postComments from 'reducers/postComments';
import profile from 'reducers/profile';
import friends from 'reducers/friends';
import login from 'reducers/login';
import healthLabels from 'reducers/healthLabels';
import dietLabels from 'reducers/dietLabels';
import userProgressPhotos from 'reducers/userProgressPhotos';
import pageLoader from 'reducers/pageLoader';
import adminEquipments from 'reducers/admin/equipments';
import adminEquipmentCategories from 'reducers/admin/equipmentCategories';
import adminExercises from 'reducers/admin/exercises';
import adminBodyParts from 'reducers/admin/bodyParts';
import adminExerciseTypes from 'reducers/admin/exerciseTypes';
import adminUsers from 'reducers/admin/users';
import adminBadgeCategories from 'reducers/admin/badgeCategories';
import adminBadgeTasks from 'reducers/admin/badgeTasks';
import adminBadges from 'reducers/admin/badges';
import adminFitnessTests from 'reducers/admin/fitnessTests';

export default combineReducers({
    app,
    user,
    userBodyMeasurement,
    people,
    dashboardnew,
    nutritions,
    userEquipments,
    userExercisePreferences,
    userNutritionPreferences,
    userNutritions,
    userExerciseTypes,
    userBodyparts,
    userExercises,
    userFitnessTests,
    userShoppingList,
    userWorkouts,
    userTimeline,
    userPersonalGoals,
    userSecondaryGoals,
    userPrimaryGoals,
    userSearch,
    userGalleryPhotos,
    postLikes,
    postComments,
    profile,
    friends,
    login,
    healthLabels,
    dietLabels,
    userProgressPhotos,
    pageLoader,
    adminEquipments,
    adminEquipmentCategories,
    adminExercises,
    adminBodyParts,
    adminExerciseTypes,
    adminUsers,
    adminBadgeCategories,
    adminBadgeTasks,
    adminBadges,
    adminFitnessTests,
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    form: formReducer
});
