import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "reducers/user";
import userBodyMeasurement from "reducers/userBodyMeasurement";
import dashboard from "reducers/dashboard";
import nutritions from "reducers/nutritions";
import userEquipments from "reducers/userEquipments";
import userExercisePreferences from "reducers/userExercisePreferences";
import userNutritionPreferences from "reducers/userNutritionPreferences";
import userNutritions from "reducers/userNutritions";
import new_nutrition from "reducers/new_nutrition";
import userExerciseTypes from "reducers/userExerciseTypes";
import userBodyparts from "reducers/userBodyparts";
import userExercises from "reducers/userExercises";
import userFitnessTests from "reducers/userFitnessTests";
import userShoppingList from "reducers/userShoppingList";
import userScheduleWorkouts from "reducers/userScheduleWorkouts";
import userPrograms from "reducers/userPrograms";
import userProgramsRating from "reducers/userProgramsRating";
import userTimeline from "reducers/userTimeline";
import userPersonalGoals from "reducers/userPersonalGoals";
import userSecondaryGoals from "reducers/userSecondaryGoals";
import userPrimaryGoals from "reducers/userPrimaryGoals";
import userSearch from "reducers/userSearch";
import userGalleryPhotos from "reducers/userGalleryPhotos";
import userNotifications from "reducers/userNotifications";
import userMessages from "reducers/userMessages";
import userBadges from "reducers/userBadges";
import userProgress from "reducers/userProgress";
import userStats from "reducers/userStats";
import timelineWidgets from "reducers/timelineWidgets";
import postLikes from "reducers/postLikes";
import postComments from "reducers/postComments";
import profile from "reducers/profile";
import userChangePassword from "reducers/changePassword";
import friends from "reducers/friends";
import follows from "reducers/follows";
import login from "reducers/login";
import healthLabels from "reducers/healthLabels";
import dietLabels from "reducers/dietLabels";
import userProgressPhotos from "reducers/userProgressPhotos";
import pageLoader from "reducers/pageLoader";
import adminEquipments from "reducers/admin/equipments";
import adminEquipmentCategories from "reducers/admin/equipmentCategories";
import adminExercises from "reducers/admin/exercises";
import adminBodyParts from "reducers/admin/bodyParts";
import adminExerciseTypes from "reducers/admin/exerciseTypes";
import adminUsers from "reducers/admin/users";
import adminBadgeCategories from "reducers/admin/badgeCategories";
import adminBadgeTasks from "reducers/admin/badgeTasks";
import adminBadges from "reducers/admin/badges";
import adminFitnessTests from "reducers/admin/fitnessTests";
import adminProfile from "reducers/admin/profile";
import adminChangePassword from "reducers/admin/changePassword";
import admin from "reducers/admin/admin";
import adminDashboard from "reducers/admin/dashboard";
import meal from "reducers/meal";
import userMeal from "../reducers/user_meal";
import userFavouriteBadges from "reducers/userFavouriteBadges";

export default combineReducers({
  user,
  userBodyMeasurement,
  dashboard,
  nutritions,
  userEquipments,
  userExercisePreferences,
  userNutritionPreferences,
  userNutritions,
  new_nutrition,
  userExerciseTypes,
  userBodyparts,
  userExercises,
  userFitnessTests,
  userShoppingList,
  userScheduleWorkouts,
  userPrograms,
  userProgramsRating,
  userStats,
  userTimeline,
  userPersonalGoals,
  userSecondaryGoals,
  userPrimaryGoals,
  userSearch,
  userGalleryPhotos,
  userNotifications,
  userMessages,
  userBadges,
  userProgress,
  timelineWidgets,
  postLikes,
  postComments,
  profile,
  userChangePassword,
  friends,
  follows,
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
  adminProfile,
  adminChangePassword,
  admin,
  adminDashboard,
  meal,
  userMeal,
  userFavouriteBadges,
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
});
