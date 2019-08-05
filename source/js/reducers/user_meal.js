import { Map } from 'immutable';
import { VALIDATION_FAILURE_STATUS } from '../constants/consts';
import { generateValidationErrorMsgArr } from '../helpers/funs';
import {
  USER_MEAL_ADD_REQUEST,
  USER_MEAL_ADD_SUCCESS,
  USER_MEAL_ADD_ERROR,
  GET_USER_MEALS_LOG_DATES_REQUEST,
  GET_USER_MEALS_LOG_DATES_SUCCESS,
  GET_USER_MEALS_LOG_DATES_ERROR,
} from '../actions/user_meal';

const initialState = Map({
  saveLoading: false,
  userMeal: null,
  saveError: [],

  loading: false,
  logDates: [],
  logDatesError: [],
});

const actionMap = {
  [USER_MEAL_ADD_REQUEST]: (state, action) => {
    console.log('reducer request => ');
    return state.merge(
      Map({
        saveLoading: true,
        userMeal: null,
        saveError: [],
      }),
    );
  },

  [USER_MEAL_ADD_SUCCESS]: (state, action) => {
    let newState = { saveLoading: false };
    if (action.data && action.data.status && action.data.status === 1) {
      newState.userMeal = action.data.meal;
    } else {
      let msg = action.data.message
        ? action.data.message
        : 'Something went wrong! please try again later';
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
      error = ['Something went wrong! please try again later'];
    }
    return state.merge(
      Map({
        saveLoading: false,
        saveError: error,
      }),
    );
  },

  [GET_USER_MEALS_LOG_DATES_REQUEST]: (state, action) => {
    console.log('reducer request => ');
    return state.merge(
      Map({
        loading: true,
        logDates: [],
        logDatesError: [],
      }),
    );
  },

  [GET_USER_MEALS_LOG_DATES_SUCCESS]: (state, action) => {
    let newState = { loading: false };
    if (action.data && action.data.status && action.data.status === 1) {
      newState.logDates = action.data.logdates;
    } else {
      let msg = action.data.message
        ? action.data.message
        : 'Something went wrong! please try again later';
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
      error = ['Something went wrong! please try again later'];
    }
    return state.merge(
      Map({
        loading: false,
        logDatesError: error,
      }),
    );
  },
};

export default function reducer(state = initialState, action = {}) {
  if (action && action.type) {
    var fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
  }
  return state;
}
