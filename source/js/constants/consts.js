export const LOCALSTORAGE_USER_ITEM_KEY = 'user';
export const LOCALSTORAGE_TOKEN_ITEM_KEY = 'token';
export const LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY = 'refreshToken';
export const LOCALSTORAGE_ROLE_KEY = 'role';

export const USER_ROLE = 'fitassist-user';
export const ADMIN_ROLE = 'firassist-admin'

// export const SERVER_BASE_URL = 'http://192.168.1.186:3300/'
export const SERVER_BASE_URL = 'http://localhost:3300/'

export const EXERCISE_MECHANICS_COMPOUND = 'compound';
export const EXERCISE_MECHANICS_ISOLATION = 'isolation';

export const EXERCISE_DIFFICULTY_BEGINNER = 'beginner';
export const EXERCISE_DIFFICULTY_INTERMEDIATE = 'intermediate';
export const EXERCISE_DIFFICULTY_EXPERT = 'expert';

export const exerciseMechanicsObj = {
    [EXERCISE_MECHANICS_COMPOUND]: 'Compound',
    [EXERCISE_MECHANICS_ISOLATION]: 'Isolation'
}

export const exerciseDifficultyLevelObj = {
    [EXERCISE_DIFFICULTY_BEGINNER]: 'Beginner',
    [EXERCISE_DIFFICULTY_INTERMEDIATE]: 'Intermediate',
    [EXERCISE_DIFFICULTY_EXPERT]: 'Expert',
}