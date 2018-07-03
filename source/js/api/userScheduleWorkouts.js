import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';

const requestUrl = 'user/user_workouts';

function getUsersWorkoutSchedulesByMonths(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/get_by_month', requestData, headers);
}

function getExercisesName() {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource('user/exercise/names', options);
}

export default {
    getUsersWorkoutSchedulesByMonths,
    getExercisesName,
}