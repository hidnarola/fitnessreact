import { Map } from 'immutable';
import {
  MEAL_ADD_REQUEST,
  MEAL_ADD_SUCCESS,
  MEAL_ADD_ERROR,
  MEAL_SEARCH_REQUEST,
  MEAL_SEARCH_SUCCESS,
  MEAL_SEARCH_ERROR,
  RECENT_MEAL_REQUEST,
  RECENT_MEAL_SUCCESS,
  RECENT_MEAL_ERROR,
  ADD_MEAL_TO_FAVOURITE_REQUEST,
  ADD_MEAL_TO_FAVOURITE_SUCCESS,
  ADD_MEAL_TO_FAVOURITE_ERROR,
  HANDLE_CHANGE_MEAL_SEARCH_VALUE,
  MEAL_REQUEST_BY_ID,
  MEAL_REQUEST_BY_ID_SUCCESS,
  MEAL_REQUEST_BY_ID_ERROR,
  SET_RECENT_MEALS,
} from '../actions/meal';
import { VALIDATION_FAILURE_STATUS } from '../constants/consts';
import { generateValidationErrorMsgArr, ts, te } from '../helpers/funs';

const initialState = Map({
  saveLoading: false,
  meal: null,
  saveError: [],

  searchMeals: [],
  searchMealValue: '',
  searchLoading: false,
  searchError: [],

  recentMealsLoading: false,
  recentMeals: [],
  recentMealsError: [],

  addtoFavouriteLoading: false,
  addtoFavouriteError: [],
  addtoFavouriteSuccessMessage: '',

  mealDetails: null,
  mealDetailsLoading: false,
  mealDetailsError: [],
});

const actionMap = {
  [ADD_MEAL_TO_FAVOURITE_REQUEST]: (state, action) => {
    console.log('reducer request => ');
    return state.merge(
      Map({
        addtoFavouriteLoading: true,
        addtoFavouriteError: [],
        addtoFavouriteSuccessMessage: '',
      }),
    );
  },
  [ADD_MEAL_TO_FAVOURITE_SUCCESS]: (state, action) => {
    let newState = { addtoFavouriteLoading: false };
    if (action.data && action.data.status && action.data.status === 1) {
      if (
        action.data.meal &&
        action.data.meal.length > 0 &&
        action.data.meal[0] &&
        action.data.meal[0].meals
      ) {
        newState.recentMeals = action.data.meal[0].meals;
        console.log('action.data => ', JSON.stringify(action.data));
        newState.addtoFavouriteSuccessMessage = action.data.message;
      } else if (action.data.meal && action.data.meal) {
        newState.recentMeals = [];
      }
    } else {
      let msg = action.data.message
        ? action.data.message
        : 'Something went wrong! please try again later';
      newState.addtoFavouriteError = [msg];
    }
    return state.merge(Map(newState));
  },
  [ADD_MEAL_TO_FAVOURITE_ERROR]: (state, action) => {
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
        addtoFavouriteLoading: false,
        addtoFavouriteError: error,
      }),
    );
  },
  [RECENT_MEAL_REQUEST]: (state, action) => {
    console.log('reducer request => ');
    return state.merge(
      Map({
        recentMealsLoading: true,
        recentMeals: null,
        recentMealsError: [],
      }),
    );
  },

  [RECENT_MEAL_SUCCESS]: (state, action) => {
    let newState = { recentMealsLoading: false };
    if (action.data && action.data.status && action.data.status === 1) {
      if (
        action.data.userMeals &&
        action.data.userMeals.length > 0 &&
        action.data.userMeals[0] &&
        action.data.userMeals[0].meals &&
        action.data.userMeals[0].meals.length > 0
      ) {
        newState.recentMeals = action.data.userMeals[0].meals;
      }
    } else {
      let msg = action.data.message
        ? action.data.message
        : 'Something went wrong! please try again later';
      newState.recentMealsError = [msg];
    }
    return state.merge(Map(newState));
  },

  [MEAL_ADD_REQUEST]: (state, action) => {
    console.log('reducer request => ');
    return state.merge(
      Map({
        saveLoading: true,
        meal: null,
        saveError: [],
      }),
    );
  },

  [MEAL_ADD_SUCCESS]: (state, action) => {
    let newState = { saveLoading: false };
    if (action.data && action.data.status && action.data.status === 1) {
      newState.meal = action.data.meal;
      ts('Your meal successfully inserted.');
    } else {
      let msg = action.data.message
        ? action.data.message
        : 'Something went wrong! please try again later';
      te(msg);
      newState.saveError = [msg];
    }
    return state.merge(Map(newState));
  },

  [MEAL_ADD_ERROR]: (state, action) => {
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

  [HANDLE_CHANGE_MEAL_SEARCH_VALUE]: (state, action) => {
    return state.merge(Map({ searchMealValue: action.requestData }));
  },

  [MEAL_SEARCH_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        searchLoading: true,
        searchMeals: [],
        searchError: [],
      }),
    );
  },

  [MEAL_SEARCH_SUCCESS]: (state, action) => {
    let newState = { searchLoading: false };
    if (action.data && action.data.status === 1) {
      newState.searchMeals = action.data.meals;
    } else {
      let msg = action.data.message
        ? action.data.message
        : 'Something went wrong! please try again later';
      newState.searchError = [msg];
    }
    console.log('reducer', action);
    return state.merge(Map(newState));
  },

  [MEAL_SEARCH_ERROR]: (state, action) => {
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
        searchLoading: false,
        searchError: error,
      }),
    );
  },

  [MEAL_REQUEST_BY_ID]: (state, action) => {
    console.log('reducer request => ');
    return state.merge(
      Map({
        mealDetailsLoading: true,
        mealDetails: null,
        mealDetailsError: [],
      }),
    );
  },

  [MEAL_REQUEST_BY_ID_SUCCESS]: (state, action) => {
    let newState = { mealDetailsLoading: false };
    if (action.data && action.data.status === 1) {
      newState.mealDetails = action.data.meal[0];
    } else {
      let msg = action.data.message
        ? action.data.message
        : 'Something went wrong! please try again later';
      newState.mealDetailsError = [msg];
    }
    console.log('reducer', action);
    return state.merge(Map(newState));
  },

  [MEAL_REQUEST_BY_ID_ERROR]: (state, action) => {
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
        mealDetailsLoading: false,
        mealDetailsError: error,
      }),
    );
  },

  [SET_RECENT_MEALS]: (state, action) => {
    return state.merge(
      Map({
        recentMeals: data.meals,
        recentMealsError: data.error,
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
