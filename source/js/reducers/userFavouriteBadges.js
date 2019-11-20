import { Map } from "immutable";
import {
  ADD_USER_FAVOURITE_BADGES,
  ADD_USER_FAVOURITE_BADGES_SUCCESS,
  ADD_USER_FAVOURITE_BADGES_ERROR,
  GET_USER_FAVOURITE_BADGES,
  GET_USER_FAVOURITE_BADGES_SUCCESS,
  GET_USER_FAVOURITE_BADGES_ERROR
} from "../actions/userFavouriteBadges";
import { generateValidationErrorMsgArr } from "../helpers/funs";
import { VALIDATION_FAILURE_STATUS } from "../constants/consts";

const initialState = Map({
  loading: false,
  badges: [],
  badge: null,
  error: []
});

const actionMap = {
  [GET_USER_FAVOURITE_BADGES]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        badges: [],
        error: []
      })
    );
  },
  [GET_USER_FAVOURITE_BADGES_SUCCESS]: (state, action) => {
    var newState = {
      loading: false
    };
    if (typeof action.data.status !== "undefined" && action.data.status === 1) {
      newState.badges = action.data.badges;
    } else if (
      typeof action.data.status !== "undefined" &&
      action.data.status === 0
    ) {
      var msg = action.data.message
        ? action.data.message
        : "Something went wrong! please try again later.";
      newState.error = [msg];
    }
    return state.merge(Map(newState));
  },
  [GET_USER_FAVOURITE_BADGES_ERROR]: (state, action) => {
    return state.merge(
      Map({
        loading: false,
        badges: [],
        error: prepareResponseError(action)
      })
    );
  },
  [ADD_USER_FAVOURITE_BADGES]: (state, action) => {
    return state.merge(
      Map({
        loading: true,
        badges: [],
        error: []
      })
    );
  },
  [ADD_USER_FAVOURITE_BADGES_SUCCESS]: (state, action) => {
    var newState = {
      loading: false
    };
    if (typeof action.data.status !== "undefined" && action.data.status === 1) {
      newState.badges = action.data.badges;
    } else if (
      typeof action.data.status !== "undefined" &&
      action.data.status === 0
    ) {
      var msg = action.data.message
        ? action.data.message
        : "Something went wrong! please try again later.";
      newState.error = [msg];
    }
    return state.merge(Map(newState));
  },
  [ADD_USER_FAVOURITE_BADGES_ERROR]: (state, action) => {
    return state.merge(
      Map({
        loading: false,
        badges: [],
        error: prepareResponseError(action)
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

function prepareResponseError(action) {
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
