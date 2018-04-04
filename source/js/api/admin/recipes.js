import { fetchResource, postFormData, putFormData } from '..';
import { extraHeaders } from '../../helpers/funs';

const requestUrl = 'admin/recipes';

function getRecipes() {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl, options);
}

function getRecipe(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'GET',
        headers: headers,
    }

    return fetchResource(requestUrl + '/' + _id, options);
}

function addRecipe(recipeData) {
    let headers = extraHeaders();
    return postFormData(requestUrl, recipeData, headers);
}

function updateRecipe(_id, recipeData) {
    let headers = extraHeaders();
    return putFormData(requestUrl + '/' + _id, recipeData, headers);
}

function deleteRecipe(_id) {
    let headers = extraHeaders();
    var options = {
        method: 'DELETE',
        headers: headers,
    }

    return fetchResource((requestUrl + '/' + _id), options);
}

function filterRecipe(filterData) {
    let headers = extraHeaders();
    return postFormData(requestUrl + '/filter', filterData, headers);
}

export default {
    getRecipes,
    getRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    filterRecipe
}