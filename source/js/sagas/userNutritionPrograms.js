import { takeLatest, put, call } from "redux-saga/effects";
import {
  ADD_USER_NUTRITION_PROGRAM_REQUEST,
  addUserNutritionProgramError,
  addUserNutritionProgramSuccess,
  GET_USER_NUTRITION_PROGRAM_REQUEST,
  getUserNutritionProgramSuccess,
  getUserNutritionProgramError,
  GET_USER_NUTRITION_PROGRAM_DETAILS_REQUEST,
  getUserNutritionProgramDetailsSuccess,
  getUserNutritionProgramDetailsError,
  UPDATE_USER_NUTRITION_PROGRAM_REQUEST,
  updateUserNutritionProgramSuccess,
  updateUserNutritionProgramError,
  GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_REQUEST,
  getUserNutritionProgramPlansDetailsSuccess,
  getUserNutritionProgramPlansDetailsError,
  PASTE_USER_NUTIRION_PROGRAM_MEALS_REQUEST,
  pasteUserNutritionMealsError,
  pasteUserNutritionMealsSuccess,
  DELETE_USER_NUTRITION_PROGRAMS_MEALS_REQUEST,
  deleteUserNutritionProgramsMealsSuccess,
  deleteUserNutritionProgramsMealsError,
  ADD_USER_PROGRAMS_MEALS_REQUEST,
  addUserProgramsMealSuccess,
  addUserProgramsMealError
} from "../actions/userNutritionPrograms";
import api from "../api/userNutritionPrograms";

function getAddUserNutritionProgramData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.addUserNutritionProgram(requestData));
      yield put(addUserNutritionProgramSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(addUserNutritionProgramError(error));
      action.callback(error);
    }
  };
}
function updateUserNutritionProgramData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      let programId = action.programId;
      const data = yield call(() =>
        api.updateUserNutritionProgram(programId, requestData)
      );
      yield put(updateUserNutritionProgramSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(updateUserNutritionProgramError(error));
      action.callback(error);
    }
  };
}

function getUserNutritionProgram() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.getUserNutritionProgram(requestData));
      yield put(getUserNutritionProgramSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(getUserNutritionProgramError(error));
      action.callback(error);
    }
  };
}

function getUserNutritionProgramDetails() {
  return function*(action) {
    try {
      let programId = action.programId;
      const data = yield call(() =>
        api.getUserNutritionProgramDetails(programId)
      );
      yield put(getUserNutritionProgramDetailsSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(getUserNutritionProgramDetailsError(error));
      action.callback(error);
    }
  };
}

function getUserNutritionProgramPlanDetails() {
  return function*(action) {
    try {
      let programId = action.programId;
      const data = yield call(() =>
        api.getUserNutritionProgramPlanDetails(programId)
      );
      yield put(getUserNutritionProgramPlansDetailsSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(getUserNutritionProgramPlansDetailsError(error));
      action.callback(error);
    }
  };
}

function pasteUserNutritionProgramMealsData() {
  return function*(action) {
    try {
      let meal_id = action.meal_id;
      let requestData = action.requestData;
      let actionType = action.actiontype;
      const data = yield call(() =>
        api.pasteUserNutritionProgramMeals(meal_id, requestData, actionType)
      );
      yield put(pasteUserNutritionMealsSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(pasteUserNutritionMealsError(error));
      action.callback(error);
    }
  };
}

function deleteUserNutritionProgramsMealsData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() =>
        api.deleteUserNutritionProgramMeals(requestData)
      );
      action.callback(data);
      yield put(deleteUserNutritionProgramsMealsSuccess(data));
    } catch (error) {
      yield put(deleteUserNutritionProgramsMealsError(error));
      action.callback(error);
    }
  };
}

function addUserProgramMealData() {
  return function*(action) {
    try {
      let requestData = action.requestData;
      const data = yield call(() => api.addUserProgramMeal(requestData));
      yield put(addUserProgramsMealSuccess(data));
      action.callback(data);
    } catch (error) {
      yield put(addUserProgramsMealError(error));
      action.callback(error);
    }
  };
}

export function* watchUserNutritionProgramsData() {
  yield takeLatest(
    ADD_USER_NUTRITION_PROGRAM_REQUEST,
    getAddUserNutritionProgramData()
  );
  yield takeLatest(
    UPDATE_USER_NUTRITION_PROGRAM_REQUEST,
    updateUserNutritionProgramData()
  );
  yield takeLatest(
    GET_USER_NUTRITION_PROGRAM_REQUEST,
    getUserNutritionProgram()
  );
  yield takeLatest(
    GET_USER_NUTRITION_PROGRAM_DETAILS_REQUEST,
    getUserNutritionProgramDetails()
  );
  yield takeLatest(
    GET_USER_NUTRITION_PROGRAM_PLAN_DETAILS_REQUEST,
    getUserNutritionProgramPlanDetails()
  );
  yield takeLatest(
    PASTE_USER_NUTIRION_PROGRAM_MEALS_REQUEST,
    pasteUserNutritionProgramMealsData()
  );
  yield takeLatest(
    DELETE_USER_NUTRITION_PROGRAMS_MEALS_REQUEST,
    deleteUserNutritionProgramsMealsData()
  );
  yield takeLatest(ADD_USER_PROGRAMS_MEALS_REQUEST, addUserProgramMealData());
}
export default [watchUserNutritionProgramsData()];
