export const publicPath = '/';

export const routeCodes = {
    HOME: publicPath,
    PEOPLE: `${publicPath}people`,
    USERS: `${publicPath}users`,

    // Dashboard Routes
    DASHBOARD: `${publicPath}dashboard`,

    WORKOUTWARMUP: `${publicPath}dashboard`,
    WORKOUT: `${publicPath}dashboard`,
    WORKOUTCOOLDOWN: `${publicPath}dashboard`,


    // Registration Routes
    REGISTERUSER: `${publicPath}registration`,

    // Stats all pages
    STATSPAGE: `${publicPath}stats`,
    // STATSTRENGTH: `${publicPath}stats/strength`,
    // STATSCARDIO: `${publicPath}stats/cardio`,

    // Profile All Pages
    PROFILE: `${publicPath}profile`,
    PROFILEPHOTOS: `${publicPath}profile/{username}/photos`,
    PROFILEFRIENDS: `${publicPath}profile/{username}/friends`,
    UPDATE_PROFILE: `${publicPath}update_profile`,
    PROFILE_SETTINGS: `${publicPath}profile_settings`,

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
    VIEW_SCHEDULE_WORKOUT: `${publicPath}exercise/schedule_workout/details/:id`,

    PROGRAMS: `${publicPath}exercise/programs`,
    PROGRAM_SAVE: `${publicPath}exercise/programs/save`,
    SAVE_PROGRAM_SCHEDULE_WORKOUT: `${publicPath}exercise/programs/save/:id/:workout_id`,
    VIEW_PROGRAM_SCHEDULE_WORKOUT: `${publicPath}exercise/programs/details/:id/:workout_id`,

    // Nutrition Routes
    NUTRITION: `${publicPath}nutrition`,
    NUTRITION_ADD: `${publicPath}nutrition/add`,
    NUTRITION_RECIPE_DETAILS: `${publicPath}nutrition/recipe`,
    NUTRITIONPREFERENCE: `${publicPath}nutrition/preference`,
    NUTRITIONSHOP: `${publicPath}nutrition/shoppinglist`,

    //Calendar Route
    CALENDAR: `${publicPath}calendar`,

    //Progress Route
    PROGRESS: `${publicPath}progress`,
    PROGRESS_BODY_FAT: `${publicPath}progress/body_fat`,
    PROGRESS_MOBILITY: `${publicPath}progress/mobility`,
    PROGRESS_MUSCLE: `${publicPath}progress/muscle`,
    PROGRESS_STRENGTH: `${publicPath}progress/strength`,
    PROGRESS_ENDURANCE: `${publicPath}progress/endurance`,

    ALL_NOTIFICATIONS: `${publicPath}notifications`,
};
