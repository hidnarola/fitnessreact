import { publicPath } from "./routes";

export const adminRootRoute = publicPath + 'admin/';

export const adminRouteCodes = {
    LOGIN: adminRootRoute,
    DASHBOARD: `${adminRootRoute}dashboard`,
    PROFILE: `${adminRootRoute}profile`,

    USERS: `${adminRootRoute}users`,
    USERS_SAVE: `${adminRootRoute}users/save`,

    EXERCISE: `${adminRootRoute}exercise`,
    EXERCISE_SAVE: `${adminRootRoute}exercise/save`,

    FITNESS_TESTS: `${adminRootRoute}fitness_test`,
    FITNESS_TESTS_SAVE: `${adminRootRoute}fitness_test/save`,

    EQUIPMENTS: `${adminRootRoute}equipments`,
    EQUIPMENTS_SAVE: `${adminRootRoute}equipments/save`,

    PAYMENTS: `${adminRootRoute}payments`,
    OPTIONS: `${adminRootRoute}options`,

    BADGES: `${adminRootRoute}badges`,
    BADGES_SAVE: `${adminRootRoute}badges/save`,

    COUPONS: `${adminRootRoute}coupons`,
}