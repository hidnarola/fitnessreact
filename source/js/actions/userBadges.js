import { BADGE_TYPE_TRACKING } from '../constants/consts';

export const GET_USER_BADGES_BY_TYPE_REQUEST = 'GET_USER_BADGES_BY_TYPE_REQUEST';
export const GET_USER_BADGES_BY_TYPE_SUCCESS = 'GET_USER_BADGES_BY_TYPE_SUCCESS';
export const GET_USER_BADGES_BY_TYPE_ERROR = 'GET_USER_BADGES_BY_TYPE_ERRPR';
export const SET_USER_BADGES_BY_TYPE = 'SET_USER_BADGES_BY_TYPE';

export function getUserBadgesByTypeRequest(badgeType = BADGE_TYPE_TRACKING) {
  return {
    type: GET_USER_BADGES_BY_TYPE_REQUEST,
    badgeType,
  };
}

export function getUserBadgesByTypeSuccess(data) {
  return {
    type: GET_USER_BADGES_BY_TYPE_SUCCESS,
    data,
  };
}

export function getUserBadgesByTypeError(error) {
  return {
    type: GET_USER_BADGES_BY_TYPE_ERROR,
    error,
  };
}

export function setUserBadgesByType(data) {
  return {
    type: SET_USER_BADGES_BY_TYPE,
    data,
  };
}