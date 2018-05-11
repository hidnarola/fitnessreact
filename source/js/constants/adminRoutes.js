export const adminRootRoute = '/admin';

export const adminRouteCodes = {
    LOGIN: adminRootRoute,
    DASHBOARD: `${adminRootRoute}/dashboard`,
    PROFILE: `${adminRootRoute}/profile`,

    USERS: `${adminRootRoute}/users`,
    USERS_SAVE: `${adminRootRoute}/users/save`,

    EXERCISE_TYPE: `${adminRootRoute}/exercise_type`,

    EXERCISE: `${adminRootRoute}/exercise`,
    EXERCISE_SAVE: `${adminRootRoute}/exercise/save`,

    FITNESS_TESTS: `${adminRootRoute}/fitness_test`,

    EQUIPMENTS: `${adminRootRoute}/equipments`,
    EQUIPMENTS_SAVE: `${adminRootRoute}/equipments/save`,

    PAYMENTS: `${adminRootRoute}/payments`,
    OPTIONS: `${adminRootRoute}/options`,

    BADGES: `${adminRootRoute}/badges`,
    BADGES_SAVE: `${adminRootRoute}/badges/save`,

    BADGE_CATEGORIES: `${adminRootRoute}/badge_categories`,
    BADGE_TASKS: `${adminRootRoute}/badge_tasks`,

    COUPONS: `${adminRootRoute}/coupons`,
}