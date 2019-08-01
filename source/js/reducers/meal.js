import { Map } from "immutable";
import {
  MEAL_ADD_REQUEST,
  MEAL_ADD_SUCCESS,
  MEAL_ADD_ERROR,
  MEAL_SEARCH_REQUEST,
  MEAL_SEARCH_SUCCESS,
  MEAL_SEARCH_ERROR,
  HANDLE_CHANGE_MEAL_SEARCH_VALUE
} from "../actions/meal";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";

const initialState = Map({
  saveLoading: false,
  meal: null,
  saveError: [],
  searchMeals: [],
  searchMealValue: ""
});

const actionMap = {
  [MEAL_ADD_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        saveLoading: true,
        meal: null,
        saveError: []
      })
    );
  },

  [MEAL_ADD_REQUEST]: (state, action) => {
    console.log("reducer request => ");
    return state.merge(
      Map({
        saveLoading: true,
        meal: null,
        saveError: []
      })
    );
  },

  [MEAL_ADD_SUCCESS]: (state, action) => {
    let newState = { saveLoading: false };
    if (action.data && action.data.status && action.data.status === 1) {
      newState.meal = action.data.meal;
    } else {
      let msg = action.data.message
        ? action.data.message
        : "Something went wrong! please try again later";
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
      error = ["Something went wrong! please try again later"];
    }
    return state.merge(
      Map({
        saveLoading: false,
        saveError: error
      })
    );
  },

  [HANDLE_CHANGE_MEAL_SEARCH_VALUE]: (state, action) => {
    return state.merge(Map({ searchMealValue: action.requestData }));
  },
  [MEAL_SEARCH_REQUEST]: (state, action) => {
    return state;
  },
  [MEAL_SEARCH_SUCCESS]: (state, action) => {
    return state;
  },
  [MEAL_SEARCH_ERROR]: (state, action) => {
    return state;
  }
};

export default function reducer(state = initialState, action = {}) {
  if (action && action.type) {
    var fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
  }
  return state;
}
