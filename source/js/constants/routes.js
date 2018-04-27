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

    // Recipe Routes
    RECEIP:`${publicPath}receip`,

    // Badges Pages
    BADGES:`${publicPath}badges`,
    BADGESTRACKING:`${publicPath}badges/tracking`,
    BADGESINCOMPLETE:`${publicPath}badges/incomplete`,
    BADGESCOMPLETE:`${publicPath}badges/complete`,

    BODY:`${ publicPath }body`,

    //Exercise Pages
    EXERCISE:`${ publicPath }exercise`,
    EXERCISEPREFERENCE:`${ publicPath }exercise/preference`,
    EXERCISEEQP:`${ publicPath }exercise/equipment`,
    EXERCISEFITNESS:`${ publicPath }exercise/fitness`,

    // Nutrition Routes
    NUTRITION:`${ publicPath }nutrition`,
    NUTRITIONPREFERENCE:`${ publicPath }nutrition/preference`,
    NUTRITIONSHOP:`${ publicPath }nutrition/shoppinglist`,
    NUTRITIONMEAL:`${ publicPath }nutrition/nutritionmeal`,

    //Calendar Routes
    CALENDAR:`${ publicPath }calendar`,

    GOALS:`${ publicPath }goals`


};
