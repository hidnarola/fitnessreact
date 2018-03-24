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
    PAYMENTS: `${adminRootRoute}/payments`,
    OPTIONS: `${adminRootRoute}/options`,
    BUDGES: `${adminRootRoute}/budges`,
    COUPONS: `${adminRootRoute}/coupons`,
}