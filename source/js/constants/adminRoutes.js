export const adminRootRoute = '/admin';

export const adminRouteCodes = {
    LOGIN: adminRootRoute,
    DASHBOARD: `${adminRootRoute}/dashboard`,
    PROFILE: `${adminRootRoute}/profile`,
    USERS: `${adminRootRoute}/users`,
    NUTRITIONS: `${adminRootRoute}/nutritions`,

    RECIPES: `${adminRootRoute}/recipes`,
    RECIPES_SAVE: `${adminRootRoute}/recipes/save`,

    EXERCISE: `${adminRootRoute}/exercise`,
    EXERCISE_SAVE: `${adminRootRoute}/exercise/save`,

    EQUIPMENTS: `${adminRootRoute}/equipments`,
    EQUIPMENTS_SAVE: `${adminRootRoute}/equipments/save`,

    PAYMENTS: `${adminRootRoute}/payments`,
    OPTIONS: `${adminRootRoute}/options`,
    BUDGES: `${adminRootRoute}/budges`,
    COUPONS: `${adminRootRoute}/coupons`,
}