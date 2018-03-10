export const publicPath = '/';

export const routeCodes = {
    HOME: publicPath,
    PEOPLE: `${ publicPath }people`,

    // Dashboard Routes
    DASHBOARD:`${ publicPath }dashboard`,
    
    WORKOUTWARMUP:`${ publicPath }dashboard`,
    WORKOUT:`${ publicPath }dashboard`,
    WORKOUTCOOLDOWN:`${ publicPath }dashboard`,

    
    // Registration Routes
    REGISTERUSER:`${ publicPath }registration`,
    
    // Stats all pages
    STATSPAGE:`${ publicPath }stats`,
    STATSTRENGTH:`${publicPath}stats/strength`,
    STATSCARDIO:`${publicPath}stats/cardio`,
    STATSNUTRITION:`${publicPath}stats/nutrition`,
    STATSBODY:`${publicPath}stats/body`,

    // Profile All Pages
    PROFILE:`${publicPath}profile`,
    PROFILEFITHUB:`${publicPath}profile/fithub`,
    PROFILEPHOTOS:`${publicPath}profile/photos`,
    PROFILEFRIENDS:`${publicPath}profile/friends`,

    // Badges Pages
    BADGES:`${publicPath}badges`,
    BADGESTRACKING:`${publicPath}badges/tracking`,
    BADGESINCOMPLETE:`${publicPath}badges/incomplete`,
    BADGESCOMPLETE:`${publicPath}badges/complete`,

    FITNESSBODY:`${ publicPath }fitnessBody`,

    //Exercise Pages
    EXERCISE:`${ publicPath }exercise`,
    EXERCISESETTING:`${ publicPath }exercise/setting`,
    EXERCISEEQP:`${ publicPath }exercise/equipment`,
    EXERCISEFITNESS:`${ publicPath }exercise/fitness`,

    // Nutrition Routes
    NUTRITION:`${ publicPath }nutrition`,
    NUTRITIONSHOP:`${ publicPath }nutrition/shoppinglist`,
    NUTRITIONMEAL:`${ publicPath }nutrition/nutritionmeal`,

    //Calendar Routes
    CALENDAR:`${ publicPath }calendar`,

    GOALS:`${ publicPath }goals`


};
