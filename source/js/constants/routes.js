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
    STATSTRENGTH: `${publicPath}stats/strength`,
    STATSCARDIO: `${publicPath}stats/cardio`,
    STATSNUTRITION: `${publicPath}stats/nutrition`,
    STATSBODY: `${publicPath}stats/body`,

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

    SCHEDULE_WORKOUT: `${publicPath}schedule_workout`,
    ADD_SCHEDULE_WORKOUT: `${publicPath}schedule_workout/add`,

    // Nutrition Routes
    NUTRITION: `${publicPath}nutrition`,
    NUTRITION_ADD: `${publicPath}nutrition/add`,
    NUTRITION_RECIPE_DETAILS: `${publicPath}nutrition/recipe`,
    NUTRITIONPREFERENCE: `${publicPath}nutrition/preference`,
    NUTRITIONSHOP: `${publicPath}nutrition/shoppinglist`,

    //Calendar Routes
    CALENDAR: `${publicPath}calendar`,

    GOALS: `${publicPath}goals`,

    ALL_NOTIFICATIONS: `${publicPath}notifications`,
    MESSENGER: `${publicPath}messenger`,

};
