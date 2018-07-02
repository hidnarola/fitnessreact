import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/user_workouts';

function getUsersWorkoutSchedulesByMonths(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/get_by_month', requestData, headers);
}

export default {
    getUsersWorkoutSchedulesByMonths,
}