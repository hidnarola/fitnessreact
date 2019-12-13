import { Map } from "immutable";
import {
  ADD_USER_NUTRITION_PROGRAM_REQUEST,
  ADD_USER_NUTRITION_PROGRAM_SUCCESS,
  ADD_USER_NUTRITION_PROGRAM_ERROR,
  GET_USER_NUTRITION_PROGRAM_REQUEST,
  GET_USER_NUTRITION_PROGRAM_SUCCESS,
  GET_USER_NUTRITION_PROGRAM_ERROR,
  GET_USER_NUTRITION_PROGRAM_DETAILS_REQUEST,
  GET_USER_NUTRITION_PROGRAM_DETAILS_SUCCESS,
  GET_USER_NUTRITION_PROGRAM_DETAILS_ERROR,
  UPDATE_USER_NUTRITION_PROGRAM_REQUEST,
  UPDATE_USER_NUTRITION_PROGRAM_SUCCESS,
  UPDATE_USER_NUTRITION_PROGRAM_ERROR,
  GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_REQUEST,
  GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_SUCCESS,
  GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_ERROR,
  PASTE_USER_NUTIRION_PROGRAM_MEALS_REQUEST,
  PASTE_USER_NUTIRION_PROGRAM_MEALS_SUCCESS,
  PASTE_USER_NUTIRION_PROGRAM_MEALS_ERROR,
  DELETE_USER_NUTRITION_PROGRAMS_MEALS_REQUEST,
  DELETE_USER_NUTRITION_PROGRAMS_MEALS_SUCCESS,
  DELETE_USER_NUTRITION_PROGRAMS_MEALS_ERROR,
  ADD_USER_PROGRAMS_MEALS_REQUEST,
  ADD_USER_PROGRAMS_MEALS_SUCCESS,
  ADD_USER_PROGRAMS_MEALS_ERROR
} from "../actions/userNutritionPrograms";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";

const initialState = Map({
  loading: false,
  error: [],
  nutritionPrograms: [],
  program: null,
  programMeal: null,
  saveMeal: null
});

const actionMap = {
  [ADD_USER_NUTRITION_PROGRAM_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        error: []
      })
    );
  },
  [ADD_USER_NUTRITION_PROGRAM_SUCCESS]: (state, action) => {
    console.log("===========Add Nutrition Programs Success===========");
    console.log("Add Nutrition Programs Success", action.data);
    console.log("==========================");
    return state.merge(
      Map({
        loading: false
      })
    );
  },
  [ADD_USER_NUTRITION_PROGRAM_ERROR]: (state, action) => {
    let error = [];
    error = generateErrorResponse(action);
    console.log("===========Add Nutrition Program Error===========");
    console.log("Add Nutrition Program Error", error);
    console.log("==========================");
    return state.merge(
      Map({
        loading: false,
        error: error
      })
    );
  },
  [UPDATE_USER_NUTRITION_PROGRAM_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        error: []
      })
    );
  },
  [UPDATE_USER_NUTRITION_PROGRAM_SUCCESS]: (state, action) => {
    console.log("===========Add Nutrition Programs Success===========");
    console.log("Add Nutrition Programs Success", action.data);
    console.log("==========================");
    return state.merge(
      Map({
        loading: false
      })
    );
  },
  [UPDATE_USER_NUTRITION_PROGRAM_ERROR]: (state, action) => {
    let error = [];
    error = generateErrorResponse(action);
    console.log("===========Add Nutrition Program Error===========");
    console.log("Add Nutrition Program Error", error);
    console.log("==========================");
    return state.merge(
      Map({
        loading: false,
        error: error
      })
    );
  },
  [GET_USER_NUTRITION_PROGRAM_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        error: []
      })
    );
  },
  [GET_USER_NUTRITION_PROGRAM_SUCCESS]: (state, action) => {
    console.log("=========== Nutrition Programs Success===========");
    console.log(" Nutrition Programs Success", action.data);
    console.log("==========================");
    return state.merge(
      Map({
        loading: false,
        nutritionPrograms:
          action.data && action.data.programs ? action.data.programs : []
      })
    );
  },
  [GET_USER_NUTRITION_PROGRAM_ERROR]: (state, action) => {
    let error = [];
    error = generateErrorResponse(action);
    console.log("===========Nutrition Program Error===========");
    console.log(" Nutrition Program Error", error);
    console.log("==========================");
    return state.merge(
      Map({
        loading: false,
        error: error
      })
    );
  },
  [GET_USER_NUTRITION_PROGRAM_DETAILS_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        program: null,
        error: []
      })
    );
  },
  [GET_USER_NUTRITION_PROGRAM_DETAILS_SUCCESS]: (state, action) => {
    return state.merge(
      Map({
        loading: false,
        program: action.data && action.data.program ? action.data.program : null
      })
    );
  },
  [GET_USER_NUTRITION_PROGRAM_DETAILS_ERROR]: (state, action) => {
    let error = [];
    error = generateErrorResponse(action);
    return state.merge(
      Map({
        loading: false,
        error: error
      })
    );
  },
  [GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        program: null,
        error: []
      })
    );
  },
  [GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_SUCCESS]: (state, action) => {
    return state.merge(
      Map({
        loading: false,
        program: action.data && action.data.program ? action.data.program : null
      })
    );
  },
  [GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_ERROR]: (state, action) => {
    let error = [];
    error = generateErrorResponse(action);
    return state.merge(
      Map({
        loading: false,
        error: error
      })
    );
  },
  [PASTE_USER_NUTIRION_PROGRAM_MEALS_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        programMeal: null,
        error: []
      })
    );
  },
  [PASTE_USER_NUTIRION_PROGRAM_MEALS_SUCCESS]: (state, action) => {
    console.log("===========PASTE USER NUTRITION PROGRAM===========");
    console.log("PASTE USER NUTRITION PROGRAM", action.data);
    console.log("==========================");
    return state.merge(
      Map({
        loading: false,
        programMeal: action.data
      })
    );
  },
  [PASTE_USER_NUTIRION_PROGRAM_MEALS_ERROR]: (state, action) => {
    let error = [];
    error = generateErrorResponse(action);
    return state.merge(
      Map({
        loading: false,
        error: error
      })
    );
  },
  [DELETE_USER_NUTRITION_PROGRAMS_MEALS_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        error: []
      })
    );
  },
  [DELETE_USER_NUTRITION_PROGRAMS_MEALS_SUCCESS]: (state, action) => {
    return state.merge(
      Map({
        loading: false
      })
    );
  },
  [DELETE_USER_NUTRITION_PROGRAMS_MEALS_ERROR]: (state, action) => {
    let error = [];
    error = generateErrorResponse(action);
    return state.merge(
      Map({
        loading: false,
        error: error
      })
    );
  },
  [ADD_USER_PROGRAMS_MEALS_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        saveMeal: null,
        error: []
      })
    );
  },
  [ADD_USER_PROGRAMS_MEALS_SUCCESS]: (state, action) => {
    return state.merge(
      Map({
        loading: false,
        saveMeal: action.data
      })
    );
  },
  [ADD_USER_PROGRAMS_MEALS_ERROR]: (state, action) => {
    let error = [];
    error = generateErrorResponse(action);
    return state.merge(
      Map({
        loading: false,
        error: error
      })
    );
  }
};

function generateErrorResponse(action) {
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
  return error;
}

export default function reducer(state = initialState, action = {}) {
  if (action && action.type) {
    var fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
  }
  return state;
}
