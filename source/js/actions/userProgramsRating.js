export const SAVE_USER_PROGRAMS_RATING_REQUEST = 'SAVE_USER_PROGRAMS_RATING_REQUEST';
export const SAVE_USER_PROGRAMS_RATING_SUCCESS = 'SAVE_USER_PROGRAMS_RATING_SUCCESS';
export const SAVE_USER_PROGRAMS_RATING_ERROR = 'SAVE_USER_PROGRAMS_RATING_ERRPR';

export function saveUserProgramsRatingRequest(requestData) {
  return {
    type: SAVE_USER_PROGRAMS_RATING_REQUEST,
    requestData,
  };
}

export function saveUserProgramsRatingSuccess(data) {
  return {
    type: SAVE_USER_PROGRAMS_RATING_SUCCESS,
    data,
  };
}

export function saveUserProgramsRatingError(error) {
  return {
    type: SAVE_USER_PROGRAMS_RATING_ERROR,
    error,
  };
}
