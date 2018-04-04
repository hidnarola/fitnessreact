export const LOCALSTORAGE_USER_ITEM_KEY = 'user';
export const LOCALSTORAGE_TOKEN_ITEM_KEY = 'token';
export const LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY = 'refreshToken';
export const LOCALSTORAGE_ROLE_KEY = 'role';

export const USER_ROLE = 'fitassist-user';
export const ADMIN_ROLE = 'firassist-admin'

let baseUrl = 'http://no_base_url_set:3300/';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    baseUrl = 'http://localhost:3300/'
} else {
    // production code
    baseUrl = 'http://167.99.90.169:3300/'
}

export const SERVER_BASE_URL = baseUrl;

export const EXERCISE_MECHANICS_COMPOUND = 'compound';
export const EXERCISE_MECHANICS_ISOLATION = 'isolation';

export const exerciseMechanicsObj = {
    [EXERCISE_MECHANICS_COMPOUND]: 'Compound',
    [EXERCISE_MECHANICS_ISOLATION]: 'Isolation'
}

export const EXERCISE_DIFFICULTY_BEGINNER = 'beginner';
export const EXERCISE_DIFFICULTY_INTERMEDIATE = 'intermediate';
export const EXERCISE_DIFFICULTY_EXPERT = 'expert';

export const exerciseDifficultyLevelObj = {
    [EXERCISE_DIFFICULTY_BEGINNER]: 'Beginner',
    [EXERCISE_DIFFICULTY_INTERMEDIATE]: 'Intermediate',
    [EXERCISE_DIFFICULTY_EXPERT]: 'Expert',
}

export const GENDER_MALE = 'male';
export const GENDER_FEMALE = 'female';
export const GENDER_TRANSGENDER = 'transgender';

export const USER_STATUS_ACTIVE = 1;
export const USER_STATUS_INACTIVE = 0;

export const USER_STATUS_ACTIVE_STR = 'Active';
export const USER_STATUS_INACTIVE_STR = 'Inactive';
