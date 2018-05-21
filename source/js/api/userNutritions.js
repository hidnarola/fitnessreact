import { postFormData, fetchResource } from '.';
import { extraUserHeaders } from '../helpers/funs';
import axios from 'axios';

const requestUrl = 'user/nutrition';
const requestUrlRecipe = 'user/recipe';

function getUserTodaysMeal(requestData) {
    let headers = extraUserHeaders();
    return postFormData(requestUrl + '/todays_meal', requestData, headers);
}

function getUserRecipeDetails(_id) {
    let headers = extraUserHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }
    return fetchResource(requestUrl + '/recipe/' + _id, options);
}

function deleteUserRecipe(_id) {
    let headers = extraUserHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }
    return fetchResource(requestUrlRecipe + '/' + _id, options);
}

function searchRecipesApi(url) {
    return axios({
        method: 'GET',
        url: url,
        headers: { "Access-Control-Allow-Origin": "*" }
    }).then(function (res) {
        return res.data;
    }).catch(function (error) {
        if (error.response) {
            if (error.response.status === BAD_REQUEST) {
                throw ApiError(error.response.data.message, error.response.data, error.response.status);
            } else if (error.response.status === NOT_FOUND) {
                throw ApiError(`Request not found! please try again later.`, null, error.response.status);
            } else if (error.response.status === VALIDATION_FAILURE_STATUS) {
                throw ApiError(`Validation errors.`, error.response.data, error.response.status);
            } else {
                throw ApiError(`Request failed with status ${error.response.status}.`, error.response.data, error.response.status);
            }
        } else {
            throw ApiError(error.toString(), null, 'REQUEST_FAILED');
        }
    });
}

export default {
    getUserTodaysMeal,
    getUserRecipeDetails,
    deleteUserRecipe,
    searchRecipesApi,
}