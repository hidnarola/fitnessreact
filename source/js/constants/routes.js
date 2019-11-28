export const publicPath = "/";

export const routeCodes = {
  HOME: publicPath,
  USERS: `${publicPath}users`,

  // Dashboard Routes
  DASHBOARD: `${publicPath}dashboard`,

  WORKOUTWARMUP: `${publicPath}dashboard`,
  WORKOUT: `${publicPath}dashboard`,
  WORKOUTCOOLDOWN: `${publicPath}dashboard`,

  // Stats all pages
  STATSPAGE: `${publicPath}stats`,
  // STATSTRENGTH: `${publicPath}stats/strength`,
  // STATSCARDIO: `${publicPath}stats/cardio`,

  // Profile All Pages
  PROFILE: `${publicPath}profile`,
  PROFILEPHOTOS: `${publicPath}profile/{username}/photos`,
  PROFILEFRIENDS: `${publicPath}profile/{username}/friends`,
  PROFILECALENDAR: `${publicPath}profile/{username}/calendar`,
  PROFILE_WORKOUT_DETAILS: `${publicPath}profile/:username/calendar/:id`,
  UPDATE_PROFILE: `${publicPath}update_profile`,
  PROFILE_SETTINGS: `${publicPath}profile_settings`,
  CHANGE_PASSWORD: `${publicPath}change_password`,

  POST: `${publicPath}post`,

  // Recipe Routes
  RECEIP: `${publicPath}receip`,

  // Badges Pages
  BADGES: `${publicPath}badges`,
  BADGESTRACKING: `${publicPath}badges/tracking`,
  BADGESINCOMPLETE: `${publicPath}badges/incomplete`,
  BADGESCOMPLETE: `${publicPath}badges/complete`,

  BODY: `${publicPath}body`,

  //Exercise Pages
  EXERCISE: `${publicPath}exercise`,
  EXERCISEPREFERENCE: `${publicPath}exercise/preference`,
  EXERCISEEQP: `${publicPath}exercise/equipment`,
  EXERCISEFITNESS: `${publicPath}exercise/fitness`,

  SCHEDULE_WORKOUT: `${publicPath}exercise/schedule_workout`,
  SAVE_SCHEDULE_WORKOUT: `${publicPath}exercise/schedule_workout/save/:id`,

  PROGRAMS: `${publicPath}exercise/programs`,
  PROGRAMS_PUBLIC: `${publicPath}exercise/programs/public`,
  PROGRAMS_RATING_VIEW: `${publicPath}exercise/programs/rating`,
  PROGRAM_MASTER_SAVE: `${publicPath}exercise/programs/save_program`,
  PROGRAM_SAVE: `${publicPath}exercise/programs/save`,
  PROGRAM_VIEW: `${publicPath}exercise/programs/view`,
  SAVE_PROGRAM_SCHEDULE_WORKOUT: `${publicPath}exercise/programs/save/:id/:workout_id`,
  VIEW_PROGRAM_SCHEDULE_WORKOUT: `${publicPath}exercise/programs/details/:id/:workout_id`,

  // Nutrition Routes
  NUTRITION: `${publicPath}nutrition`,
  NUTRITION_ADD: `${publicPath}nutrition/add`,
  NUTRITION_EDIT: `${publicPath}nutrition/edit`,
  NUTRITION_VIEW: `${publicPath}nutrition/view`,
  NUTRITION_RECIPE_DETAILS: `${publicPath}nutrition/recipe`,
  NUTRITIONPREFERENCE: `${publicPath}nutrition/preference`,
  NUTRITIONSHOP: `${publicPath}nutrition/shoppinglist`,

  //Calendar Route
  CALENDAR: `${publicPath}calendar`,
  CALENDAR_OVERVIEW: `${publicPath}calendar/overview`,

  //Progress Route
  PROGRESS: `${publicPath}progress`,
  PROGRESS_OVERVIEW: `${publicPath}progress/overview`,
  PROGRESS_EXERCISE: `${publicPath}progress/exercise`,
  PROGRESS_BODY: `${publicPath}progress/body`,
  PROGRESS_PHOTOS_VIEW: `${publicPath}progress/photos`,
  PROGRESS_BODY_FAT: `${publicPath}progress/body_fat`,
  PROGRESS_MOBILITY: `${publicPath}progress/mobility`,
  PROGRESS_MUSCLE: `${publicPath}progress/muscle`,
  PROGRESS_STRENGTH: `${publicPath}progress/strength`,
  PROGRESS_ENDURANCE: `${publicPath}progress/endurance`,
  PROGRESS_BADGES: `${publicPath}progress/badges`,

  ALL_NOTIFICATIONS: `${publicPath}notifications`,

  PROGRESS_PHOTOS: `${publicPath}progress_photos`,
  GALLERY_PHOTOS: `${publicPath}gallery_photos`,

  //User Goals
  GOALS: `${publicPath}goals`,

  //Locker
  LOCKER: `${publicPath}locker`,
  LOCKER_EXERCISE: `${publicPath}locker/exercise`,
  LOCKER_EXERCISE_CREATE: `${publicPath}locker/exercise/workout/create`,
  LOCKER_EXERCISE_WORKOUT_PLAN_CREATE: `${publicPath}locker/exercise/workoutplan/create`,
  LOCKER_EXERCISE_WORKOUT_PLAN: `${publicPath}locker/exercise/workoutplan/plan`,
  LOCKER_EXERCISE_WORKOUT_OVERVIEW: `${publicPath}locker/exercise/workoutplan/overview`,
  LOCKER_NUTRITION: `${publicPath}locker/nutrition`
};
