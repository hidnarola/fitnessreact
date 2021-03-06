import { Map } from "immutable";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import {
  USER_MEAL_ADD_REQUEST,
  USER_MEAL_ADD_SUCCESS,
  USER_MEAL_ADD_ERROR,
  GET_USER_MEALS_LOG_DATES_REQUEST,
  GET_USER_MEALS_LOG_DATES_SUCCESS,
  GET_USER_MEALS_LOG_DATES_ERROR,
  GET_USER_MEAL_REQUEST,
  GET_USER_MEAL_SUCCESS,
  GET_USER_MEAL_ERROR,
  USER_MEAL_UPDATE_REQUEST,
  USER_MEAL_UPDATE_SUCCESS,
  USER_MEAL_UPDATE_ERROR,
  CUT_USER_MEAL_SCHEDULE,
  COPY_USER_MEAL_SCHEDULE,
  SET_SCHEDULE_MEALS_STATE,
  SET_MEAL_DATA_IN_IDB,
  SET_USER_MEAL
} from "../actions/user_meal";

const initialState = Map({
  userMeal: null,
  saveError: [],
  loading: false,

  logDates: [],
  logDatesError: [],

  loading_user_meals: true,
  user_meals: [],
  meals_proximates: [],
  user_meals_Errors: [],
  updateMeal: null,
  updateMealErrors: [],
  cutMeal: null,
  cutMealData: null,
  cutMealDetailId: null,
  copiedMealId: null,
  copiedMealDetailId: null
});

const actionMap = {
  [USER_MEAL_ADD_REQUEST]: (state, action) => {
    console.log("reducer request => ");
    return state.merge(
      Map({
        loading: true,
        userMeal: null,
        saveError: []
      })
    );
  },

  [USER_MEAL_ADD_SUCCESS]: (state, action) => {
    let newState = { loading: false };
    if (action.data && action.data.status && action.data.status === 1) {
      newState.userMeal = action.data.meal;
    } else {
      let msg = action.data.message
        ? action.data.message
        : "Something went wrong! please try again later";
      newState.saveError = [msg];
    }
    return state.merge(Map(newState));
  },

  [USER_MEAL_ADD_ERROR]: (state, action) => {
    let error = [];
    if (
      action.error.status &&
      action.error.status === VALIDATION_FAILURE_STATUS &&
      action.error.response.message
    ) {
      error = generateValidationErrorMsgArr(action.error.response.message);
    } else if (action.error && action.error.message) {
      error = [action.error.message];
    } else {
      error = ["Something went wrong! please try again later"];
    }
    return state.merge(
      Map({
        loading: false,
        saveError: error
      })
    );
  },

  [USER_MEAL_UPDATE_REQUEST]: (state, action) => {
    console.log("reducer request => ");
    return state.merge(
      Map({
        loading: true,
        updateMeal: null,
        updateMealErrors: []
      })
    );
  },

  [USER_MEAL_UPDATE_SUCCESS]: (state, action) => {
    let newState = { loading: false };
    if (action.data && action.data.status && action.data.status === 1) {
      newState.updateMeal = action.data.meal;
    } else {
      let msg = action.data.message
        ? action.data.message
        : "Something went wrong! please try again later";
      newState.updateMealErrors = [msg];
    }
    return state.merge(Map(newState));
  },

  [USER_MEAL_UPDATE_ERROR]: (state, action) => {
    let error = [];
    if (
      action.error.status &&
      action.error.status === VALIDATION_FAILURE_STATUS &&
      action.error.response.message
    ) {
      error = generateValidationErrorMsgArr(action.error.response.message);
    } else if (action.error && action.error.message) {
      error = [action.error.message];
    } else {
      error = ["Something went wrong! please try again later"];
    }
    return state.merge(
      Map({
        loading: false,
        updateMealErrors: error
      })
    );
  },

  [GET_USER_MEALS_LOG_DATES_REQUEST]: (state, action) => {
    console.log("reducer request => ");
    return state.merge(
      Map({
        loading: true,
        logDates: [],
        logDatesError: []
      })
    );
  },

  [GET_USER_MEALS_LOG_DATES_SUCCESS]: (state, action) => {
    let newState = { loading: false };
    if (action.data && action.data.status && action.data.status === 1) {
      newState.logDates = action.data.logdates;
    } else {
      let msg = action.data.message
        ? action.data.message
        : "Something went wrong! please try again later";
      newState.logDatesError = [msg];
    }
    return state.merge(Map(newState));
  },

  [GET_USER_MEALS_LOG_DATES_ERROR]: (state, action) => {
    let error = [];
    if (
      action.error.status &&
      action.error.status === VALIDATION_FAILURE_STATUS &&
      action.error.response.message
    ) {
      error = generateValidationErrorMsgArr(action.error.response.message);
    } else if (action.error && action.error.message) {
      error = [action.error.message];
    } else {
      error = ["Something went wrong! please try again later"];
    }
    return state.merge(
      Map({
        loading: false,
        logDatesError: error
      })
    );
  },

  [GET_USER_MEAL_REQUEST]: (state, action) => {
    console.log("reducer request => ");
    return state.merge(
      Map({
        loading_user_meals: true,
        user_meals: []
      })
    );
  },

  [GET_USER_MEAL_SUCCESS]: (state, action) => {
    console.log("SUCCESS ===>", action);
    let newState = { loading_user_meals: false };
    if (action.data && action.data.status && action.data.status === 1) {
      newState.user_meals = action.data.meals;
      newState.meals_proximates = action.data.proximatesIncluded
        ? action.data.proximatesIncluded
        : [];
    } else {
      let msg = action.data.message
        ? action.data.message
        : "Something went wrong! please try again later";
      newState.user_meals_Errors = [msg];
    }
    return state.merge(Map(newState));
  },

  [GET_USER_MEAL_ERROR]: (state, action) => {
    let error = [];
    if (
      action.error.status &&
      action.error.status === VALIDATION_FAILURE_STATUS &&
      action.error.response.message
    ) {
      error = generateValidationErrorMsgArr(action.error.response.message);
    } else if (action.error && action.error.message) {
      error = [action.error.message];
    } else {
      error = ["Something went wrong! please try again later"];
    }
    return state.merge(
      Map({
        loading_user_meals: false,
        user_meals_Errors: error
      })
    );
  },

  [CUT_USER_MEAL_SCHEDULE]: (state, action) => {
    return state.merge(
      Map({
        cutMeal: action.mealId,
        cutMealDetailId: action.mealDetailId,
        cutMealData: action.mealData
      })
    );
  },

  [COPY_USER_MEAL_SCHEDULE]: (state, action) => {
    return state.merge(
      Map({
        copiedMealId: action.mealId,
        copiedMealDetailId: action.mealDetailId
      })
    );
  },

  [SET_SCHEDULE_MEALS_STATE]: (state, action) => {
    return state.merge(Map(action.stateData));
  },

  [SET_MEAL_DATA_IN_IDB]: (state, action) => {
    console.log("Call Offline mode");
    return state.merge(
      Map({
        logDates: action.data.meals,
        logDatesError: action.data.error
      })
    );
  },

  [SET_USER_MEAL]: (state, action) => {
    console.log("Call SET USER MEAL");
    return state.merge(
      Map({
        user_meals: action.data
      })
    );
  }
};

export default function reducer(state = initialState, action = {}) {
  if (action && action.type) {
    var fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
  }
  return state;
}
