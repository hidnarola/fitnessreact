import {
  GET_USER_FITNESS_TESTS_LOGDATES_REQUEST,
  GET_USER_FITNESS_TESTS_LOGDATES_SUCCESS,
  GET_USER_FITNESS_TESTS_LOGDATES_ERROR
} from "./../actions/userFitnessTests";
import { Map } from "immutable";
import {
  GET_USER_FITNESS_TESTS_REQUEST,
  GET_USER_FITNESS_TESTS_ERROR,
  GET_USER_FITNESS_TESTS_SUCCESS,
  USER_FITNESS_TESTS_TEXT_FIELD,
  USER_FITNESS_TESTS_MAX_REP_FIELD,
  USER_FITNESS_TESTS_MULTISELECT_FIELD,
  USER_FITNESS_TESTS_A_OR_B_FIELD,
  SAVE_USER_FITNESS_TESTS_REQUEST,
  SAVE_USER_FITNESS_TESTS_SUCCESS,
  SAVE_USER_FITNESS_TESTS_ERROR,
  RESET_USER_FITNESS_TESTS_REQUEST,
  RESET_USER_FITNESS_TESTS_SUCCESS,
  RESET_USER_FITNESS_TESTS_ERROR,
  SET_USER_FITNESS_TESTS_DATA
} from "../actions/userFitnessTests";
import {
  VALIDATION_FAILURE_STATUS,
  MAX_REPS_CONST_1,
  MAX_REPS_CONST_2,
  FITNESS_TEST_FORMAT_MAX_REP,
  FITNESS_TEST_FORMAT_MULTISELECT
} from "../constants/consts";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import _ from "lodash";
import { validNumber } from "../formValidation/validationRules";

const initialState = Map({
  loading: false,
  date: null,
  error: [],
  fitnessTests: {},
  userFitnessTests: {},
  syncedUserFitnessTests: {},
  userFitnessTestsLogdates: [],
  userFitnessTestsLogdatesError: [],
  allFitnessTest: []
});

const actionMap = {
  [GET_USER_FITNESS_TESTS_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        date: action.today
      })
    );
  },
  [GET_USER_FITNESS_TESTS_SUCCESS]: (state, action) => {
    let fitnessTests = action.data.test_exercises;
    let userFitnessTests = action.data.user_test_exercises;
    let syncedUserFitnessTests = syncUserFitnessTests(
      fitnessTests,
      userFitnessTests
    );
    let allFitnessTestList = action.data.all_test;
    return state.merge(
      Map({
        loading: false,
        fitnessTests: fitnessTests,
        userFitnessTests: userFitnessTests,
        syncedUserFitnessTests: syncedUserFitnessTests,
        allFitnessTest: allFitnessTestList
      })
    );
  },
  [GET_USER_FITNESS_TESTS_ERROR]: (state, action) => {
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
        error: error
      })
    );
  },
  [SAVE_USER_FITNESS_TESTS_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true
      })
    );
  },
  [SAVE_USER_FITNESS_TESTS_SUCCESS]: (state, action) => {
    return state.merge(
      Map({
        loading: false
      })
    );
  },
  [SAVE_USER_FITNESS_TESTS_ERROR]: (state, action) => {
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
        error: error
      })
    );
  },
  [RESET_USER_FITNESS_TESTS_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        date: action.date
      })
    );
  },
  [RESET_USER_FITNESS_TESTS_SUCCESS]: (state, action) => {
    return state.merge(
      Map({
        loading: false
      })
    );
  },
  [RESET_USER_FITNESS_TESTS_ERROR]: (state, action) => {
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
        error: error
      })
    );
  },
  [USER_FITNESS_TESTS_TEXT_FIELD]: (state, action) => {
    var newSyncedUserFitnessTests = Object.assign(
      {},
      state.get("syncedUserFitnessTests")
    );
    if (validNumber(action.value) === undefined) {
      newSyncedUserFitnessTests[action._id].value = action.value;
    }
    return state.merge(
      Map({
        syncedUserFitnessTests: newSyncedUserFitnessTests
      })
    );
  },
  [USER_FITNESS_TESTS_MAX_REP_FIELD]: (state, action) => {
    var newSyncedUserFitnessTests = Object.assign(
      {},
      state.get("syncedUserFitnessTests")
    );
    var maxRepObj = newSyncedUserFitnessTests[action._id].value;
    var newMaxRepObj = calculateMaxReps(maxRepObj, action.rep, action.value);
    newSyncedUserFitnessTests[action._id].value = newMaxRepObj;
    return state.merge(
      Map({
        syncedUserFitnessTests: newSyncedUserFitnessTests
      })
    );
  },
  [USER_FITNESS_TESTS_MULTISELECT_FIELD]: (state, action) => {
    var newSyncedUserFitnessTests = Object.assign(
      {},
      state.get("syncedUserFitnessTests")
    );
    var valueInt = parseInt(action.value);
    newSyncedUserFitnessTests[action._id].value = valueInt;
    return state.merge(
      Map({
        syncedUserFitnessTests: newSyncedUserFitnessTests
      })
    );
  },
  [USER_FITNESS_TESTS_A_OR_B_FIELD]: (state, action) => {
    var newSyncedUserFitnessTests = Object.assign(
      {},
      state.get("syncedUserFitnessTests")
    );
    var valueInt = parseInt(action.value);
    newSyncedUserFitnessTests[action._id].value = valueInt;
    return state.merge(
      Map({
        syncedUserFitnessTests: newSyncedUserFitnessTests
      })
    );
  },
  [SET_USER_FITNESS_TESTS_DATA]: (state, action) => {
    return state.merge(Map(action.data));
  },

  [GET_USER_FITNESS_TESTS_LOGDATES_REQUEST]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        userFitnessTestsLogdates: []
      })
    );
  },
  [GET_USER_FITNESS_TESTS_LOGDATES_SUCCESS]: (state, action) => {
    let userFitnessTests = action.data.user_test_exercises;
    return state.merge(
      Map({
        loading: false,
        userFitnessTestsLogdates: userFitnessTests
      })
    );
  },
  [GET_USER_FITNESS_TESTS_LOGDATES_ERROR]: (state, action) => {
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
        userFitnessTestsLogdatesError: error
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

const syncUserFitnessTests = (fitnessTests, userFitnessTests) => {
  var _userFitnessTests = {};
  var catKeys = Object.keys(fitnessTests);
  catKeys.map((catKey, catI) => {
    var subCatKeys = Object.keys(fitnessTests[catKey]);
    subCatKeys.map((subCatKey, subCatI) => {
      var dataArr = fitnessTests[catKey][subCatKey];
      dataArr.map((data, index) => {
        var userTest = _.find(userFitnessTests, ["test_exercise_id", data._id]);
        var value = null;
        if (userTest) {
          value = userTest[data.format];
        }
        if (value === null) {
          if (data.format === FITNESS_TEST_FORMAT_MAX_REP) {
            var maxRepDefaultVal = {};
            data.max_rep.map((rep, index) => {
              maxRepDefaultVal[rep] = 0;
            });
            value = maxRepDefaultVal;
          }
        }
        var obj = { format: data.format, value: value };
        _userFitnessTests[data._id] = obj;
      });
    });
  });
  return _userFitnessTests;
};

const calculateMaxReps = (repObj, rep, value) => {
  var newRepObj = {};
  var oneRMOfRep = get1RM(value, rep);
  var repObjKeys = Object.keys(repObj);
  repObjKeys.map((key, index) => {
    var oneRMofKey = get1RM(1, key);
    var keyWeight = oneRMOfRep / oneRMofKey;
    newRepObj[key] = parseInt(Math.round(keyWeight).toFixed(0));
  });
  return newRepObj;
};

const get1RM = (weight, reps) => {
  return weight / (MAX_REPS_CONST_1 - MAX_REPS_CONST_2 * reps);
};
