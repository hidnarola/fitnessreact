export const LOCALSTORAGE_ID_TOKEN_KEY = 'id_token';
export const LOCALSTORAGE_ACCESS_TOKEN_KEY = 'access_token';
export const LOCALSTORAGE_REFRESH_TOKEN_KEY = 'refreshToken';
export const LOCALSTORAGE_EXPIRES_AT_KEY = 'expires_at';
export const LOCALSTORAGE_ROLE_KEY = 'role';
export const LOCALSTORAGE_USERNAME_KEY = 'username';
export const LOCALSTORAGE_USER_DETAILS_KEY = 'id_data_token';
export const FITASSIST_USER_DETAILS_TOKEN_KEY = '697BE4E2355E75EA41F62BAB675F1';

export const AUTH_STATE_ACTION_LOGIN = 'login';
export const AUTH_STATE_ACTION_SIGNUP = 'signup';

export const AUTH_STATE_ACTION_LOGIN_KEY = 'com.auth0.auth.{"action":"login"}';
export const AUTH_STATE_ACTION_SIGNUP_KEY = 'com.auth0.auth.{"action":"signup"}';

export const USER_ROLE = 'fitassist-user';
export const ADMIN_ROLE = 'fitassist-admin'

var baseUrl = 'http://' + window.location.hostname;
if (window.location.port) {
    baseUrl += ':' + window.location.port;
}
baseUrl += '/';

export const BASE_URL = baseUrl;
export const SERVER_BASE_URL = 'http://' + window.location.hostname + ':3300/';

// amit's system url of api
// export const SERVER_BASE_URL = 'http://192.168.100.19:3300/';

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

export const USER_STATUS_ACTIVE = 1;
export const USER_STATUS_INACTIVE = 0;

export const USER_STATUS_ACTIVE_STR = 'Active';
export const USER_STATUS_INACTIVE_STR = 'Inactive';

export const STATUS_ACTIVE = 1;
export const STATUS_INACTIVE = 0;

export const STATUS_ACTIVE_STR = 'Active';
export const STATUS_INACTIVE_STR = 'Inactive';

export const RECIPE_DIFFICULTY_EASY = 'easy';
export const RECIPE_DIFFICULTY_MEDIUM = 'medium';
export const RECIPE_DIFFICULTY_HARD = 'hard';

export const RECIPE_TYPE_VEGETARIAN = 'vegetarian';
export const RECIPE_TYPE_VEGAN = 'vegan';
export const RECIPE_TYPE_DAIRY_FREE = 'dairy-free';
export const RECIPE_TYPE_KOSHER = 'kosher';
export const RECIPE_TYPE_ISLAM = 'islam';
export const RECIPE_TYPE_COELIAC = 'coeliac';
export const RECIPE_TYPE_PALEO = 'paleo';
export const RECIPE_TYPE_PASCATERIAN = 'pescaterian';

export const GOAL_GAIN_MUSCLE = 'gain_muscle';
export const GOAL_IMPROVE_MOBILITY = 'improve_mobility';
export const GOAL_LOSE_FAT = 'lose_fat';
export const GOAL_GAIN_STRENGTH = 'gain_strength';
export const GOAL_GAIN_POWER = 'gain_power';
export const GOAL_INCREASE_ENDURANCE = 'increase_endurance';

export const TASKS_UNITS_KMS = 'kms';
export const TASKS_UNITS_KGS = 'kgs';

export const TASKS_UNITS_KMS_STR = 'Kilometers';
export const TASKS_UNITS_KGS_STR = 'Kilograms';

export const TIME_TYPE_STANDARD = 'standard';
export const TIME_TYPE_TIME_WINDOW = 'time_window';

export const WORKOUT_SCHEDULE_TYPE_AUTO = 1;
export const WORKOUT_SCHEDULE_TYPE_MANUAL = 2;

export const WORKOUT_SCHEDULE_TYPE_AUTO_STR = 'Automatic';
export const WORKOUT_SCHEDULE_TYPE_MANUAL_STR = 'Manual';

export const DAY_DRIVE_BREAKFAST = 'breakfast';
export const DAY_DRIVE_LUNCH = 'lunch';
export const DAY_DRIVE_DINNER = 'dinner';
export const DAY_DRIVE_SNACKS = 'snacks';
export const DAY_DRIVE_PRE_LUNCH_SNACKS = 'pre_lunch_snacks';
export const DAY_DRIVE_POST_LUNCH_SNACKS = 'after_lunch_snacks';

export const FRIEND_APPROVED = 2;
export const FRIEND_PENDING = 1;

export const FRIENDSHIP_STATUS_SELF = 'self';
export const FRIENDSHIP_STATUS_FRIEND = 'friend';
export const FRIENDSHIP_STATUS_REQUEST_RECEIVED = 'request_received';
export const FRIENDSHIP_STATUS_REQUEST_SENT = 'request_sent';
export const FRIENDSHIP_STATUS_UNKNOWN = 'unknown';

export const OK_STATUS = 200;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const MEDIA_ERROR_STATUS = 415;
export const VALIDATION_FAILURE_STATUS = 417;
export const DATABASE_ERROR_STATUS = 422;
export const INTERNAL_SERVER_ERROR = 500;

export const SESSION_EXPIRED_URL_TYPE = 'session_expired';

export const WORKOUT_INTENSITY_LABEL_EASY = 'Easy';
export const WORKOUT_INTENSITY_LABEL_LOW = 'Low';
export const WORKOUT_INTENSITY_LABEL_MODERATE = 'Moderate';
export const WORKOUT_INTENSITY_LABEL_HARD = 'Hard';
export const WORKOUT_INTENSITY_LABEL_MAXIMAL = 'Maximal';

export const EXPERIENCE_LEVEL_1_LABEL = 'Novice';
export const EXPERIENCE_LEVEL_2_LABEL = 'Advance Learner';
export const EXPERIENCE_LEVEL_3_LABEL = 'Competent Learner';
export const EXPERIENCE_LEVEL_4_LABEL = 'Skilled Learner';
export const EXPERIENCE_LEVEL_5_LABEL = 'Expert';

export const FITNESS_TEST_CAT_STRENGTH = 'strength';
export const FITNESS_TEST_CAT_FLEXIBILITY = 'flexibility';
export const FITNESS_TEST_CAT_POSTURE = 'posture';
export const FITNESS_TEST_CAT_CARDIO = 'cardio';

export const FITNESS_TEST_SUB_CAT_UPPER_BODY = 'upper_body';
export const FITNESS_TEST_SUB_CAT_SIDE = 'side';
export const FITNESS_TEST_SUB_CAT_LOWER_BODY = 'lower_body';
export const FITNESS_TEST_SUB_CAT_CARDIO = 'cardio';

export const FITNESS_TEST_FORMAT_MAX_REP = 'max_rep';
export const FITNESS_TEST_FORMAT_MULTISELECT = 'multiselect';
export const FITNESS_TEST_FORMAT_TEXT_FIELD = 'text_field';
export const FITNESS_TEST_FORMAT_A_OR_B = 'a_or_b';

export const FITNESS_TEST_FORMAT_MAX_REP_STR = 'Max Reps';
export const FITNESS_TEST_FORMAT_MULTISELECT_STR = 'Multiselect';
export const FITNESS_TEST_FORMAT_TEXT_FIELD_STR = 'Text Field';
export const FITNESS_TEST_FORMAT_A_OR_B_STR = 'A or B';

export const MAX_REPS_CONST_1 = 1.0278;
export const MAX_REPS_CONST_2 = 0.0278;

export const RECIPE_API_APP_ID = 'b55ed2b8';
export const RECIPE_API_APP_KEY = '791594812dac61912e88ba6af2dd73b7';
export const RECIPE_API_SEARCH_URL = `https://api.edamam.com/search?app_id=${RECIPE_API_APP_ID}&app_key=${RECIPE_API_APP_KEY}`;

export const ACCESS_LEVEL_PRIVATE = '1';
export const ACCESS_LEVEL_FRIENDS = '2';
export const ACCESS_LEVEL_PUBLIC = '3';
export const ACCESS_LEVEL_FRIENDS_OF_FRIENDS = '4';
export const ACCESS_LEVEL_NONE = '5';

export const ACCESS_LEVEL_PRIVATE_STR = 'Only Me';
export const ACCESS_LEVEL_FRIENDS_STR = 'Friends';
export const ACCESS_LEVEL_PUBLIC_STR = 'Public';
export const ACCESS_LEVEL_FRIENDS_OF_FRIENDS_STR = 'Friends Of Friends';
export const ACCESS_LEVEL_NONE_STR = 'No one';

export const POST_TYPE_TIMELINE = 'timeline';
export const POST_TYPE_GALLERY = 'gallery';
export const POST_TYPE_PROGRESS_PHOTO = 'progress_photo';

export const WORKOUT_LOCATION_HOME = 'home';
export const WORKOUT_LOCATION_GYM = 'gym';

export const MEASUREMENT_UNIT_KEY_PERCENTAGE = 'percentage';
export const MEASUREMENT_UNIT_KEY_KCAL = 'kcal';
export const MEASUREMENT_UNIT_KEY_COUNT = 'count';
export const MEASUREMENT_UNIT_KEY_TIME = 'time';
export const MEASUREMENT_UNIT_KEY_LIGHT_MASS = 'light_mass';
export const MEASUREMENT_UNIT_KEY_HEAVY_MASS = 'heavy_mass';
export const MEASUREMENT_UNIT_KEY_MEASUREMENT = 'measurement';
export const MEASUREMENT_UNIT_KEY_SMALL_DISTANCE = 'small_distance';
export const MEASUREMENT_UNIT_KEY_LARGE_DISTANCE = 'large_distance';
export const MEASUREMENT_UNIT_KEY_HEART_RATE = 'heart_rate';

export const MEASUREMENT_UNIT_PERCENTAGE = 'percentage';
export const MEASUREMENT_UNIT_KCAL = 'kcal';
export const MEASUREMENT_UNIT_NUMBER = 'number';
export const MEASUREMENT_UNIT_GRAM = 'g';
export const MEASUREMENT_UNIT_MILIGRAM = 'mg';
export const MEASUREMENT_UNIT_KILOGRAM = 'kg';
export const MEASUREMENT_UNIT_POUND = 'lb';
export const MEASUREMENT_UNIT_INCH = 'inch';
export const MEASUREMENT_UNIT_CENTIMETER = 'cm';
export const MEASUREMENT_UNIT_METER = 'meter';
export const MEASUREMENT_UNIT_FEET = 'feet';
export const MEASUREMENT_UNIT_KILOMETER = 'km';
export const MEASUREMENT_UNIT_MILE = 'mile';
export const MEASUREMENT_UNIT_SECONDS = 'second';
export const MEASUREMENT_UNIT_MINUTES = 'minute';
export const MEASUREMENT_UNIT_HOURS = 'hour';
export const MEASUREMENT_UNIT_REPS = 'reps';
export const MEASUREMENT_UNIT_EFFORT = 'effort';
export const MEASUREMENT_UNIT_KMPH = 'kmph';
export const MEASUREMENT_UNIT_MPH = 'mph';
export const MEASUREMENT_UNIT_ONE_RM = 'one_rm';
export const MEASUREMENT_UNIT_REP_TIME = 'rep_time';
export const MEASUREMENT_UNIT_SET_TIME = 'set_time';
export const MEASUREMENT_UNIT_BPM = 'bpm';

export const GOALS_DETAILS = [
    { value: 'weight_gain', label: 'Gain Weight', unitsKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: 'weight_loss', label: 'Loss Weight', unitsKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: 'body_fat_gain', label: 'Gain Body Fat', unitsKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: 'body_fat_loss', label: 'Loss Body Fat', unitsKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: 'body_fat_average', label: 'Target Average Body Fat', unitsKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: 'body_fat_most', label: 'Target Max Body Fat', unitsKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: 'body_fat_least', label: 'Target Least Body Fat ', unitsKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: 'neck_measurement_gain', label: 'Gain Neck', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'neck_measurement_loss', label: 'Loss Neck', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'shoulders_measurement_gain', label: 'Gain Shoulders', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'shoulders_measurement_loss', label: 'Loss Shoulders', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'chest_measurement_gain', label: 'Gain Chest', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'chest_measurement_loss', label: 'Loss Chest', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'upper_arm_measurement_gain', label: 'Gain Upper Arm', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'upper_arm_measurement_loss', label: 'Loss Upper Arm', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'waist_measurement_gain', label: 'Gain Waist', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'waist_measurement_loss', label: 'Loss Waist', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'forearm_measurement_gain', label: 'Gain Forearm', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'forearm_measurement_loss', label: 'Loss Forearm', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'hips_measurement_gain', label: 'Gain Hips', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'hips_measurement_loss', label: 'Loss Hips', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'thigh_measurement_gain', label: 'Gain Thigh', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'thigh_measurement_loss', label: 'Loss Thigh', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'calf_measurement_gain', label: 'Gain Calf', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'calf_measurement_loss', label: 'Loss Calf', unitsKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: 'weight_lifted_total', label: 'Lift Total Weight', unitsKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: 'weight_lifted_average', label: 'Lift Average Weight', unitsKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: 'weight_lifted_most', label: 'Lift Max Weight', unitsKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: 'weight_lifted_least', label: 'Lift Least Weight', unitsKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: 'workouts_total', label: 'Complete Total Workouts', unitsKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: 'workouts_average', label: 'Complete Average Workouts', unitsKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: 'running_distance_total', label: 'Run Total Distance', unitsKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: 'running_distance_average', label: 'Run Average Distance', unitsKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: 'running_distance_most', label: 'Run Max Distance', unitsKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: 'running_distance_least', label: 'Run Least Distance', unitsKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: 'running_time_average', label: 'Run Average Time', unitsKey: MEASUREMENT_UNIT_KEY_TIME },
    { value: 'running_time_total', label: 'Run Total Time', unitsKey: MEASUREMENT_UNIT_KEY_TIME },
    { value: 'running_elevation_total', label: 'Run Total Elevation', unitsKey: MEASUREMENT_UNIT_KEY_SMALL_DISTANCE },
    { value: 'running_elevation_average', label: 'Run Average Elevation', unitsKey: MEASUREMENT_UNIT_KEY_SMALL_DISTANCE },
    { value: 'cycle_distance_total', label: 'Cycling Total Distance', unitsKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: 'cycle_distance_average', label: 'Cycling Average Distance', unitsKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: 'cycle_distance_most', label: 'Cycling Max Distance', unitsKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: 'cycle_distance_least', label: 'Cycling Least Distance', unitsKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: 'cycle_time_total', label: 'Cycling Total Time', unitsKey: MEASUREMENT_UNIT_KEY_TIME },
    { value: 'cycle_time_average', label: 'Cycling Average Time', unitsKey: MEASUREMENT_UNIT_KEY_TIME },
    { value: 'cycle_elevation_total', label: 'Cycling Total Elevation', unitsKey: MEASUREMENT_UNIT_KEY_SMALL_DISTANCE },
    { value: 'cycle_elevation_average', label: 'Cycling Average Elevation', unitsKey: MEASUREMENT_UNIT_KEY_SMALL_DISTANCE },
    { value: 'steps_total', label: 'Walk Total Steps', unitsKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: 'steps_average', label: 'Walk Average Steps', unitsKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: 'steps_most', label: 'Walk Max Steps', unitsKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: 'steps_least', label: 'Walk Least Steps', unitsKey: MEASUREMENT_UNIT_KEY_COUNT },
];

export const MEASUREMENT_UNITS = [
    {
        key: MEASUREMENT_UNIT_KEY_PERCENTAGE,
        value: [
            { value: MEASUREMENT_UNIT_PERCENTAGE, label: "Percentage" },
        ],
    },
    {
        key: MEASUREMENT_UNIT_KEY_KCAL,
        value: [
            { value: MEASUREMENT_UNIT_KCAL, label: "Calories" },
        ],
    },
    {
        key: MEASUREMENT_UNIT_KEY_COUNT,
        value: [
            { value: MEASUREMENT_UNIT_NUMBER, label: "Counter" },
        ],
    },
    {
        key: MEASUREMENT_UNIT_KEY_TIME,
        value: [
            { value: MEASUREMENT_UNIT_MINUTES, label: "Minutes" },
        ],
    },
    {
        key: MEASUREMENT_UNIT_KEY_LIGHT_MASS,
        value: [
            { value: MEASUREMENT_UNIT_GRAM, label: "Grams" },
            { value: MEASUREMENT_UNIT_MILIGRAM, label: "Miligrams" },
        ],
    },
    {
        key: MEASUREMENT_UNIT_KEY_HEAVY_MASS,
        value: [
            { value: MEASUREMENT_UNIT_KILOGRAM, label: "Kilograms" },
            { value: MEASUREMENT_UNIT_POUND, label: "Pounds" },
        ],
    },
    {
        key: MEASUREMENT_UNIT_KEY_MEASUREMENT,
        value: [
            { value: MEASUREMENT_UNIT_INCH, label: "Inches" },
            { value: MEASUREMENT_UNIT_CENTIMETER, label: "Centimeters" },
        ],
    },
    {
        key: MEASUREMENT_UNIT_KEY_SMALL_DISTANCE,
        value: [
            { value: MEASUREMENT_UNIT_METER, label: "Meters" },
            { value: MEASUREMENT_UNIT_FEET, label: "Foot" },
        ],
    },
    {
        key: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE,
        value: [
            { value: MEASUREMENT_UNIT_KILOMETER, label: "Kilometers" },
            { value: MEASUREMENT_UNIT_MILE, label: "Miles" },
        ],
    },
    {
        key: MEASUREMENT_UNIT_KEY_HEART_RATE,
        value: [
            { value: MEASUREMENT_UNIT_BPM, label: "BPM" },
        ],
    },
]

export const SECONDARY_GOALS = [
    { value: GOAL_GAIN_MUSCLE, label: 'Gain Muscle' },
    { value: GOAL_IMPROVE_MOBILITY, label: 'Improve Mobility' },
    { value: GOAL_LOSE_FAT, label: 'Lose Fat' },
    { value: GOAL_GAIN_STRENGTH, label: 'Gain Strength' },
    { value: GOAL_INCREASE_ENDURANCE, label: 'Increase Endurance' },
]

export const BADGES_TASKS = [
    { value: "profile_update", label: "Profile Update", unitKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: "friends", label: "Friends", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "post", label: "Post", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "weight_gain", label: "Weight Gain", unitKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: "weight_loss", label: "Weight Loss", unitKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: "body_fat_gain", label: "Body Fat Gain", unitKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: "body_fat_loss", label: "Body Fat Loss", unitKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: "body_fat_average", label: "Body Fat Average", unitKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: "body_fat_most", label: "Body Fat Most", unitKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: "body_fat_least", label: "Body Fat Least", unitKey: MEASUREMENT_UNIT_KEY_PERCENTAGE },
    { value: "neck_measurement_gain", label: "Neck Measurement Gain", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "neck_measurement_loss", label: "Neck Measurement Loss", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "shoulders_measurement_gain", label: "Shoulders Measurement Gain", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "shoulders_measurement_loss", label: "Shoulders Measurement Loss", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "chest_measurement_gain", label: "Chest Measurement Gain", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "chest_measurement_loss", label: "Chest Measurement Loss", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "upper_arm_measurement_gain", label: "Upper Arm Measurement Gain", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "upper_arm_measurement_loss", label: "Upper Arm Measurement Loss", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "waist_measurement_gain", label: "Waist Measurement Gain", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "waist_measurement_loss", label: "Waist Measurement Loss", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "forearm_measurement_gain", label: "Forearm Measurement Gain", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "forearm_measurement_loss", label: "Forearm Measurement Loss", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "hips_measurement_gain", label: "Hips Measurement Gain", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "hips_measurement_loss", label: "Hips Measurement Loss", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "thigh_measurement_gain", label: "Thigh Measurement Gain", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "thigh_measurement_loss", label: "Thigh Measurement Loss", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "calf_measurement_gain", label: "Calf Measurement Gain", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "calf_measurement_loss", label: "Calf Measurement Loss", unitKey: MEASUREMENT_UNIT_KEY_MEASUREMENT },
    { value: "weight_lifted_total", label: "Weight Lifted Total", unitKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: "weight_lifted_average", label: "Weight Lifted Average", unitKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: "weight_lifted_most", label: "Weight Lifted Most", unitKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: "weight_lifted_least", label: "Weight Lifted Least", unitKey: MEASUREMENT_UNIT_KEY_HEAVY_MASS },
    { value: "workouts_total", label: "Workouts Total", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "workouts_average", label: "Workouts Average", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "reps_least", label: "Reps Least", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "reps_total", label: "Reps Total", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "reps_average", label: "Reps Average", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "reps_most", label: "Reps Most", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "sets_least", label: "Sets Least", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "sets_total", label: "Sets Total", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "sets_average", label: "Sets Average", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "sets_most", label: "Sets Most", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "running_distance_total", label: "Running Distance Total", unitKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: "running_distance_average", label: "Running Distance Average", unitKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: "running_distance_most", label: "Running Distance Most", unitKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: "running_distance_least", label: "Running Distance Least", unitKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: "running_time_average", label: "Running Time Average", unitKey: MEASUREMENT_UNIT_KEY_TIME },
    { value: "running_time_total", label: "Running Time Total", unitKey: MEASUREMENT_UNIT_KEY_TIME },
    { value: "running_elevation_total", label: "Running Elevation Total", unitKey: MEASUREMENT_UNIT_KEY_SMALL_DISTANCE },
    { value: "running_elevation_average", label: "Running Elevation Average", unitKey: MEASUREMENT_UNIT_KEY_SMALL_DISTANCE },
    // { value: "heart_rate_total", label: "Heart Rate Total", unitKey: MEASUREMENT_UNIT_KEY_HEART_RATE },
    // { value: "heart_rate_average", label: "Heart Rate Average", unitKey: MEASUREMENT_UNIT_KEY_HEART_RATE },
    // { value: "heart_rate_most", label: "Heart Rate Most", unitKey: MEASUREMENT_UNIT_KEY_HEART_RATE },
    // { value: "heart_rate_least", label: "Heart Rate Least", unitKey: MEASUREMENT_UNIT_KEY_HEART_RATE },
    // { value: "heart_rate_resting_total", label: "Heart Rate Resting Total", unitKey: MEASUREMENT_UNIT_KEY_HEART_RATE },
    // { value: "heart_rate_resting_average", label: "Heart Rate Resting Average", unitKey: MEASUREMENT_UNIT_KEY_HEART_RATE },
    // { value: "heart_rate_resting_most", label: "Heart Rate Resting Most", unitKey: MEASUREMENT_UNIT_KEY_HEART_RATE },
    // { value: "heart_rate_resting_least", label: "Heart Rate Resting Least", unitKey: MEASUREMENT_UNIT_KEY_HEART_RATE },
    { value: "cycle_distance_total", label: "Cycle Distance Total", unitKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: "cycle_distance_average", label: "Cycle Distance Average", unitKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: "cycle_distance_most", label: "Cycle Distance Most", unitKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: "cycle_distance_least", label: "Cycle Distance Least", unitKey: MEASUREMENT_UNIT_KEY_LARGE_DISTANCE },
    { value: "cycle_time_total", label: "Cycle Time Total", unitKey: MEASUREMENT_UNIT_KEY_TIME },
    { value: "cycle_time_average", label: "Cycle Time Average", unitKey: MEASUREMENT_UNIT_KEY_TIME },
    { value: "cycle_elevation_total", label: "Cycle Elevation Total", unitKey: MEASUREMENT_UNIT_KEY_SMALL_DISTANCE },
    { value: "cycle_elevation_average", label: "Cycle Elevation Average", unitKey: MEASUREMENT_UNIT_KEY_SMALL_DISTANCE },
    { value: "steps_total", label: "Steps Total", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "steps_average", label: "Steps Average", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "steps_most", label: "Steps Most", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "steps_least", label: "Steps Least", unitKey: MEASUREMENT_UNIT_KEY_COUNT },
    { value: "calories_total", label: "Calories Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "calories_average", label: "Calories Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "calories_most", label: "Calories Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "calories_least", label: "Calories Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "calories_excess", label: "Calories Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "saturated_total", label: "Saturated Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "saturated_average", label: "Saturated Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "saturated_most", label: "Saturated Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "saturated_least", label: "Saturated Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "saturated_excess", label: "Saturated Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "trans_total", label: "Trans Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "trans_average", label: "Trans Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "trans_most", label: "Trans Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "trans_least", label: "Trans Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "trans_excess", label: "Trans Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "folate_total", label: "Folate Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "folate_average", label: "Folate Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "folate_most", label: "Folate Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "folate_least", label: "Folate Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "folate_excess", label: "Folate Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "potassium_total", label: "Potassium Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "potassium_average", label: "Potassium Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "potassium_most", label: "Potassium Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "potassium_least", label: "Potassium Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "potassium_excess", label: "Potassium Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "magnesium_total", label: "Magnesium Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "magnesium_average", label: "Magnesium Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "magnesium_most", label: "Magnesium Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "magnesium_least", label: "Magnesium Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "magnesium_excess", label: "Magnesium Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "sodium_total", label: "Sodium Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "sodium_average", label: "Sodium Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "sodium_most", label: "Sodium Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "sodium_least", label: "Sodium Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "sodium_excess", label: "Sodium Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "protein_total", label: "Protein Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "protein_average", label: "Protein Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "protein_most", label: "Protein Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "protein_least", label: "Protein Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "protein_excess", label: "Protein Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "calcium_total", label: "Calcium Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "calcium_average", label: "Calcium Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "calcium_most", label: "Calcium Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "calcium_least", label: "Calcium Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "calcium_excess", label: "Calcium Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "carbs_total", label: "Carbs Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "carbs_average", label: "Carbs Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "carbs_most", label: "Carbs Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "carbs_least", label: "Carbs Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "carbs_excess", label: "Carbs Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "cholesterol_total", label: "Cholesterol Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "cholesterol_average", label: "Cholesterol Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "cholesterol_most", label: "Cholesterol Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "cholesterol_least", label: "Cholesterol Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "cholesterol_excess", label: "Cholesterol Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "polyunsaturated_total", label: "Polyunsaturated Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "polyunsaturated_average", label: "Polyunsaturated Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "polyunsaturated_most", label: "Polyunsaturated Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "polyunsaturated_least", label: "Polyunsaturated Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "polyunsaturated_excess", label: "Polyunsaturated Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "monounsaturated_total", label: "Monounsaturated Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "monounsaturated_average", label: "Monounsaturated Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "monounsaturated_most", label: "Monounsaturated Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "monounsaturated_least", label: "Monounsaturated Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "monounsaturated_excess", label: "Monounsaturated Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "iron_total", label: "Iron Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "iron_average", label: "Iron Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "iron_most", label: "Iron Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "iron_least", label: "Iron Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "iron_excess", label: "Iron Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "fiber_total", label: "Fiber Total", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "fiber_average", label: "Fiber Average", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "fiber_most", label: "Fiber Most", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "fiber_least", label: "Fiber Least", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
    { value: "fiber_excess", label: "Fiber Excess", unitKey: MEASUREMENT_UNIT_KEY_LIGHT_MASS },
]

export const TIME_WINDOW_TYPE_DAY = 'day';
export const TIME_WINDOW_TYPE_WEEK = 'week';
export const TIME_WINDOW_TYPE_MONTH = 'month';
export const TIME_WINDOW_TYPE_YEAR = 'year';

export const TIME_WINDOW_TYPES = [
    { value: TIME_WINDOW_TYPE_DAY, label: 'Day' },
    { value: TIME_WINDOW_TYPE_WEEK, label: 'Week' },
    { value: TIME_WINDOW_TYPE_MONTH, label: 'Month' },
    { value: TIME_WINDOW_TYPE_YEAR, label: 'Year' },
]

export const NOTIFICATION_TYPE_FRIEND_REQUEST_APPROVED = 'friend_request_approved';
export const NOTIFICATION_TYPE_BADGE_AWARDED = 'badge_awarded';
export const NOTIFICATION_TYPE_LIKE_POST = 'like_post';
export const NOTIFICATION_TYPE_COMMENT_POST = 'comment_post';

export const SCHEDULED_WORKOUT_TYPE_EXERCISE = 'exercise';
export const SCHEDULED_WORKOUT_TYPE_CIRCUIT = 'circuit';
export const SCHEDULED_WORKOUT_TYPE_SUPERSET = 'superset';
export const SCHEDULED_WORKOUT_TYPE_WARMUP = 'warmup';
export const SCHEDULED_WORKOUT_TYPE_COOLDOWN = 'cooldown';
export const SCHEDULED_WORKOUT_TYPE_RESTDAY = 'restday';

export const EXE_CAT_CARDIO = 'cardio';
export const EXE_CAT_STRENGTH = 'strength';
export const EXE_CAT_FLEXIBILITY = 'flexibility';
export const EXE_CAT_BALANCE = 'balance';
export const EXE_CAT_CARDIO_STR = 'Cardio';
export const EXE_CAT_STRENGTH_STR = 'Strength';
export const EXE_CAT_FLEXIBILITY_STR = 'Flexibility';
export const EXE_CAT_BALANCE_STR = 'Balance';

export const EXE_SCAT_RUNNING = 'running';
export const EXE_SCAT_SWIMMING = 'swimming';
export const EXE_SCAT_WALKING = 'walking';
export const EXE_SCAT_CYCLING = 'cycling';
export const EXE_SCAT_ROWING = 'rowing';
export const EXE_SCAT_YOGA = 'yoga';
export const EXE_SCAT_PILATES = 'pilates';
export const EXE_SCAT_AEROBICS = 'aerobics';
export const EXE_SCAT_BOXING = 'boxing';
export const EXE_SCAT_MARTIAL_ARTS = 'martial_arts';
export const EXE_SCAT_SKATING = 'skating';
export const EXE_SCAT_OTHER = 'other';
export const EXE_SCAT_ELLIPTICAL = 'elliptical';
export const EXE_SCAT_STAIR_CLIMBER = 'stair_climber';
export const EXE_SCAT_JUMPING_ROPE = 'jumping_rope';
export const EXE_SCAT_SPRINTS = 'sprints';
export const EXE_SCAT_BENCH_PRESS = 'bench_press';
export const EXE_SCAT_DIPS = 'dips';
export const EXE_SCAT_CLEANS = 'cleans';
export const EXE_SCAT_DEADLIFT = 'deadlift';
export const EXE_SCAT_SQUATS = 'squats';
export const EXE_SCAT_PULLUPS = 'pullups';
export const EXE_SCAT_SHOULDER_PRESS = 'shoulder_press';
export const EXE_SCAT_BENT_OVER_ROW = 'bent_over_row';
export const EXE_SCAT_BODYWEIGHT = 'bodyweight';
export const EXE_SCAT_BICEP_CURLS = 'bicep_curls';
export const EXE_SCAT_TRICEP_EXTENSION = 'tricep_extension';
export const EXE_SCAT_PULL_DOWN = 'pull_down';
export const EXE_SCAT_MACHINES = 'machines';
export const EXE_SCAT_STRONG_MAN = 'strong_man';
export const EXE_SCAT_ISOMETRIC_STRETCHING = 'isometric_stretching';
export const EXE_SCAT_ACTIVE_ISOLATED_STRETCHING = 'active_isolated_stretching';
export const EXE_SCAT_BALLISTIC_STRETCHING = 'ballistic_stretching';
export const EXE_SCAT_DYNAMIC_STRETCHING = 'dynamic_stretching';
export const EXE_SCAT_PASSIVE_STRETCHING = 'passive_stretching';
export const EXE_SCAT_STATIC_STRETCHING = 'static_stretching';

export const EXE_SCAT_RUNNING_STR = 'Running';
export const EXE_SCAT_SWIMMING_STR = 'Swimming';
export const EXE_SCAT_WALKING_STR = 'Walking';
export const EXE_SCAT_CYCLING_STR = 'Cycling';
export const EXE_SCAT_ROWING_STR = 'Rowing';
export const EXE_SCAT_YOGA_STR = 'Yoga';
export const EXE_SCAT_PILATES_STR = 'Pilates';
export const EXE_SCAT_AEROBICS_STR = 'Aerobics';
export const EXE_SCAT_BOXING_STR = 'Boxing';
export const EXE_SCAT_MARTIAL_ARTS_STR = 'Martial Arts';
export const EXE_SCAT_SKATING_STR = 'Skating';
export const EXE_SCAT_OTHER_STR = 'Other';
export const EXE_SCAT_ELLIPTICAL_STR = 'Elliptical';
export const EXE_SCAT_STAIR_CLIMBER_STR = 'Stair Climber';
export const EXE_SCAT_JUMPING_ROPE_STR = 'Jumping Rope';
export const EXE_SCAT_SPRINTS_STR = 'Sprints';
export const EXE_SCAT_BENCH_PRESS_STR = 'Bench Press';
export const EXE_SCAT_DIPS_STR = 'Dips';
export const EXE_SCAT_CLEANS_STR = 'Cleans';
export const EXE_SCAT_DEADLIFT_STR = 'Deadlift';
export const EXE_SCAT_SQUATS_STR = 'Squats';
export const EXE_SCAT_PULLUPS_STR = 'Pullups';
export const EXE_SCAT_SHOULDER_PRESS_STR = 'Shoulder Press';
export const EXE_SCAT_BENT_OVER_ROW_STR = 'Bent Over Row';
export const EXE_SCAT_BODYWEIGHT_STR = 'Bodyweight';
export const EXE_SCAT_BICEP_CURLS_STR = 'Bicep Curls';
export const EXE_SCAT_TRICEP_EXTENSION_STR = 'Tricep Extension';
export const EXE_SCAT_PULL_DOWN_STR = 'Pull down';
export const EXE_SCAT_MACHINES_STR = 'Machines';
export const EXE_SCAT_STRONG_MAN_STR = 'Strong Man';
export const EXE_SCAT_ISOMETRIC_STRETCHING_STR = 'Isometric Stretching';
export const EXE_SCAT_ACTIVE_ISOLATED_STRETCHING_STR = 'Active Isolated Stretching';
export const EXE_SCAT_BALLISTIC_STRETCHING_STR = 'Ballistic Stretching';
export const EXE_SCAT_DYNAMIC_STRETCHING_STR = 'Dynamic Stretching';
export const EXE_SCAT_PASSIVE_STRETCHING_STR = 'Passive Stretching';
export const EXE_SCAT_STATIC_STRETCHING_STR = 'Static Stretching';

export const EXE_CATS = [
    { value: EXE_CAT_CARDIO, label: EXE_CAT_CARDIO_STR },
    { value: EXE_CAT_STRENGTH, label: EXE_CAT_STRENGTH_STR },
    { value: EXE_CAT_FLEXIBILITY, label: EXE_CAT_FLEXIBILITY_STR },
    { value: EXE_CAT_BALANCE, label: EXE_CAT_BALANCE_STR },
];

export const EXE_SCATS = [
    { value: EXE_SCAT_RUNNING, label: EXE_SCAT_RUNNING_STR },
    { value: EXE_SCAT_SWIMMING, label: EXE_SCAT_SWIMMING_STR },
    { value: EXE_SCAT_WALKING, label: EXE_SCAT_WALKING_STR },
    { value: EXE_SCAT_CYCLING, label: EXE_SCAT_CYCLING_STR },
    { value: EXE_SCAT_ROWING, label: EXE_SCAT_ROWING_STR },
    { value: EXE_SCAT_YOGA, label: EXE_SCAT_YOGA_STR },
    { value: EXE_SCAT_PILATES, label: EXE_SCAT_PILATES_STR },
    { value: EXE_SCAT_AEROBICS, label: EXE_SCAT_AEROBICS_STR },
    { value: EXE_SCAT_BOXING, label: EXE_SCAT_BOXING_STR },
    { value: EXE_SCAT_MARTIAL_ARTS, label: EXE_SCAT_MARTIAL_ARTS_STR },
    { value: EXE_SCAT_SKATING, label: EXE_SCAT_SKATING_STR },
    { value: EXE_SCAT_OTHER, label: EXE_SCAT_OTHER_STR },
    { value: EXE_SCAT_ELLIPTICAL, label: EXE_SCAT_ELLIPTICAL_STR },
    { value: EXE_SCAT_STAIR_CLIMBER, label: EXE_SCAT_STAIR_CLIMBER_STR },
    { value: EXE_SCAT_JUMPING_ROPE, label: EXE_SCAT_JUMPING_ROPE_STR },
    { value: EXE_SCAT_SPRINTS, label: EXE_SCAT_SPRINTS_STR },
    { value: EXE_SCAT_BENCH_PRESS, label: EXE_SCAT_BENCH_PRESS_STR },
    { value: EXE_SCAT_DIPS, label: EXE_SCAT_DIPS_STR },
    { value: EXE_SCAT_CLEANS, label: EXE_SCAT_CLEANS_STR },
    { value: EXE_SCAT_DEADLIFT, label: EXE_SCAT_DEADLIFT_STR },
    { value: EXE_SCAT_SQUATS, label: EXE_SCAT_SQUATS_STR },
    { value: EXE_SCAT_PULLUPS, label: EXE_SCAT_PULLUPS_STR },
    { value: EXE_SCAT_SHOULDER_PRESS, label: EXE_SCAT_SHOULDER_PRESS_STR },
    { value: EXE_SCAT_BENT_OVER_ROW, label: EXE_SCAT_BENT_OVER_ROW_STR },
    { value: EXE_SCAT_BODYWEIGHT, label: EXE_SCAT_BODYWEIGHT_STR },
    { value: EXE_SCAT_BICEP_CURLS, label: EXE_SCAT_BICEP_CURLS_STR },
    { value: EXE_SCAT_TRICEP_EXTENSION, label: EXE_SCAT_TRICEP_EXTENSION_STR },
    { value: EXE_SCAT_PULL_DOWN, label: EXE_SCAT_PULL_DOWN_STR },
    { value: EXE_SCAT_MACHINES, label: EXE_SCAT_MACHINES_STR },
    { value: EXE_SCAT_STRONG_MAN, label: EXE_SCAT_STRONG_MAN_STR },
    { value: EXE_SCAT_ISOMETRIC_STRETCHING, label: EXE_SCAT_ISOMETRIC_STRETCHING_STR },
    { value: EXE_SCAT_ACTIVE_ISOLATED_STRETCHING, label: EXE_SCAT_ACTIVE_ISOLATED_STRETCHING_STR },
    { value: EXE_SCAT_BALLISTIC_STRETCHING, label: EXE_SCAT_BALLISTIC_STRETCHING_STR },
    { value: EXE_SCAT_DYNAMIC_STRETCHING, label: EXE_SCAT_DYNAMIC_STRETCHING_STR },
    { value: EXE_SCAT_PASSIVE_STRETCHING, label: EXE_SCAT_PASSIVE_STRETCHING_STR },
    { value: EXE_SCAT_STATIC_STRETCHING, label: EXE_SCAT_STATIC_STRETCHING_STR },
];

export const EXE_CAT_SCAT = [
    {
        key: EXE_CAT_CARDIO,
        value: [
            { value: EXE_SCAT_RUNNING, label: EXE_SCAT_RUNNING_STR },
            { value: EXE_SCAT_SWIMMING, label: EXE_SCAT_SWIMMING_STR },
            { value: EXE_SCAT_WALKING, label: EXE_SCAT_WALKING_STR },
            { value: EXE_SCAT_CYCLING, label: EXE_SCAT_CYCLING_STR },
            { value: EXE_SCAT_ROWING, label: EXE_SCAT_ROWING_STR },
            { value: EXE_SCAT_YOGA, label: EXE_SCAT_YOGA_STR },
            { value: EXE_SCAT_PILATES, label: EXE_SCAT_PILATES_STR },
            { value: EXE_SCAT_AEROBICS, label: EXE_SCAT_AEROBICS_STR },
            { value: EXE_SCAT_BOXING, label: EXE_SCAT_BOXING_STR },
            { value: EXE_SCAT_MARTIAL_ARTS, label: EXE_SCAT_MARTIAL_ARTS_STR },
            { value: EXE_SCAT_SKATING, label: EXE_SCAT_SKATING_STR },
            { value: EXE_SCAT_OTHER, label: EXE_SCAT_OTHER_STR },
            { value: EXE_SCAT_ELLIPTICAL, label: EXE_SCAT_ELLIPTICAL_STR },
            { value: EXE_SCAT_STAIR_CLIMBER, label: EXE_SCAT_STAIR_CLIMBER_STR },
            { value: EXE_SCAT_JUMPING_ROPE, label: EXE_SCAT_JUMPING_ROPE_STR },
            { value: EXE_SCAT_SPRINTS, label: EXE_SCAT_SPRINTS_STR },
        ],
    },
    {
        key: EXE_CAT_STRENGTH,
        value: [
            { value: EXE_SCAT_BENCH_PRESS, label: EXE_SCAT_BENCH_PRESS_STR },
            { value: EXE_SCAT_DIPS, label: EXE_SCAT_DIPS_STR },
            { value: EXE_SCAT_CLEANS, label: EXE_SCAT_CLEANS_STR },
            { value: EXE_SCAT_DEADLIFT, label: EXE_SCAT_DEADLIFT_STR },
            { value: EXE_SCAT_SQUATS, label: EXE_SCAT_SQUATS_STR },
            { value: EXE_SCAT_PULLUPS, label: EXE_SCAT_PULLUPS_STR },
            { value: EXE_SCAT_SHOULDER_PRESS, label: EXE_SCAT_SHOULDER_PRESS_STR },
            { value: EXE_SCAT_BENT_OVER_ROW, label: EXE_SCAT_BENT_OVER_ROW_STR },
            { value: EXE_SCAT_BODYWEIGHT, label: EXE_SCAT_BODYWEIGHT_STR },
            { value: EXE_SCAT_BICEP_CURLS, label: EXE_SCAT_BICEP_CURLS_STR },
            { value: EXE_SCAT_TRICEP_EXTENSION, label: EXE_SCAT_TRICEP_EXTENSION_STR },
            { value: EXE_SCAT_PULL_DOWN, label: EXE_SCAT_PULL_DOWN_STR },
            { value: EXE_SCAT_MACHINES, label: EXE_SCAT_MACHINES_STR },
            { value: EXE_SCAT_STRONG_MAN, label: EXE_SCAT_STRONG_MAN_STR },
        ],
    },
    {
        key: EXE_CAT_FLEXIBILITY,
        value: [
            { value: EXE_SCAT_ISOMETRIC_STRETCHING, label: EXE_SCAT_ISOMETRIC_STRETCHING_STR },
            { value: EXE_SCAT_ACTIVE_ISOLATED_STRETCHING, label: EXE_SCAT_ACTIVE_ISOLATED_STRETCHING_STR },
            { value: EXE_SCAT_BALLISTIC_STRETCHING, label: EXE_SCAT_BALLISTIC_STRETCHING_STR },
            { value: EXE_SCAT_DYNAMIC_STRETCHING, label: EXE_SCAT_DYNAMIC_STRETCHING_STR },
            { value: EXE_SCAT_PASSIVE_STRETCHING, label: EXE_SCAT_PASSIVE_STRETCHING_STR },
            { value: EXE_SCAT_STATIC_STRETCHING, label: EXE_SCAT_STATIC_STRETCHING_STR },
        ],
    },
    {
        key: EXE_CAT_BALANCE,
        value: [],
    },
];

export const EXE_MEASUREMENT_UNITS = [
    {
        value: MEASUREMENT_UNIT_SECONDS,
        label: 'Seconds',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_MINUTES,
        label: 'Minutes',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_HOURS,
        label: 'Hours',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_METER,
        label: 'Meter',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_FEET,
        label: 'Foot',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_KILOMETER,
        label: 'KM',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_MILE,
        label: 'Mile',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_REPS,
        label: 'Reps',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_EFFORT,
        label: 'Effort',
        validation: [
            { required: true },
            { min: 0 },
            { max: 100 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_KMPH,
        label: 'KMPH',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_MPH,
        label: 'MPH',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_POUND,
        label: 'LB',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_KILOGRAM,
        label: 'KG',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_ONE_RM,
        label: '% of 1rm',
        validation: [
            { required: true },
            { min: 0 },
            { max: 100 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_REP_TIME,
        label: 'Rep Time',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
    {
        value: MEASUREMENT_UNIT_SET_TIME,
        label: 'Set Time',
        validation: [
            { required: true },
            { min: 0 },
        ],
    },
];

export const EXE_REST_TIME_UNITS = [
    { value: MEASUREMENT_UNIT_SECONDS, label: 'Seconds' },
    { value: MEASUREMENT_UNIT_MINUTES, label: 'Minutes' },
];

export const BADGE_TYPE_TRACKING = 'tracking';
export const BADGE_TYPE_IN_COMPLETE = 'incomplete';
export const BADGE_TYPE_COMPLETE = 'complete';

export const BADGE_TYPE_TRACKING_STR = 'Tracking';
export const BADGE_TYPE_IN_COMPLETE_STR = 'Incomplete';
export const BADGE_TYPE_COMPLETE_STR = 'Complete';

export const PROGRESS_BODY_FAT = 'bodyfat';
export const PROGRESS_MOBILITY = 'mobility';
export const PROGRESS_MUSCLE = 'muscle';
export const PROGRESS_STRENGTH = 'strength';
export const PROGRESS_ENDURANCE = 'endurance';

export const PROGRESS_BODY_FAT_STR = 'Body Fat';
export const PROGRESS_MOBILITY_STR = 'Mobility';
export const PROGRESS_MUSCLE_STR = 'Muscle';
export const PROGRESS_STRENGTH_STR = 'Strength';
export const PROGRESS_ENDURANCE_STR = 'Endurance';

export const BADGE_CAT_PROFILE = 'PROFILE';
export const BADGE_CAT_BODY_MASS = 'BODY_MASS';
export const BADGE_CAT_BODY_FAT = 'BODY_FAT';
export const BADGE_CAT_BODY_MEASUREMENT = 'BODY_MEASUREMENT';
export const BADGE_CAT_WEIGHT_LIFTED = 'WEIGHT_LIFTED';
export const BADGE_CAT_WORKOUTS = 'WORKOUTS';
export const BADGE_CAT_RUNNING = 'RUNNING';
export const BADGE_CAT_HEART_RATE = 'HEART_RATE';
export const BADGE_CAT_CYCLE = 'CYCLE';
export const BADGE_CAT_STEPS = 'STEPS';
export const BADGE_CAT_CALORIES = 'CALORIES';
export const BADGE_CAT_NUTRITIONS = 'NUTRITIONS';

export const STATS_STRENGTH = 'strength';
export const STATS_CARDIO = 'cardio';

export const WIDGETS_TYPE_DASHBOARD = 'dashboard';
export const WIDGETS_TYPE_TIMELINE = 'timeline';

export const WIDGET_TODAYS_WORKOUT = 'workout';
export const WIDGET_ACTIVITY_FEED = 'activityFeed';
export const WIDGET_BADGES = 'badges';
export const WIDGET_BODY_FAT = 'bodyFat';
export const WIDGET_MUSCLE = 'muscle';
export const WIDGET_PROGRESS_PHOTO = 'progressPhoto';

export const MUSCLE_WIDGET_NECK = 'neck';
export const MUSCLE_WIDGET_SHOULDER = 'shoulders';
export const MUSCLE_WIDGET_CHEST = 'chest';
export const MUSCLE_WIDGET_UPPER_ARM = 'upperArm';
export const MUSCLE_WIDGET_WAIST = 'waist';
export const MUSCLE_WIDGET_FOREARM = 'forearm';
export const MUSCLE_WIDGET_HIPS = 'hips';
export const MUSCLE_WIDGET_THIGH = 'thigh';
export const MUSCLE_WIDGET_CALF = 'calf';
export const MUSCLE_WIDGET_HEART_RATE = 'heartRate';
export const MUSCLE_WIDGET_WEIGHT = 'weight';
export const MUSCLE_WIDGET_HEIGHT = 'height';