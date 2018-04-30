// import { fetchResource, postFormData, putFormData } from '..';
// import { extraHeaders } from '../../helpers/funs';

// const requestUrl = 'admin/ingredient';

// function getIngredients() {
//     let headers = extraHeaders();
//     var options = {
//         method: 'GET',
//         headers: headers,
//     }

//     return fetchResource(requestUrl, options);
// }

// function getIngredient(_id) {
//     let headers = extraHeaders();
//     var options = {
//         method: 'GET',
//         headers: headers,
//     }

//     return fetchResource(requestUrl + '/' + _id, options);
// }

// function addIngredient(ingredientData) {
//     let headers = extraHeaders();
//     return postFormData(requestUrl, ingredientData, headers);
// }

// function updateIngredient(_id, ingredientData) {
//     let headers = extraHeaders();
//     return putFormData(requestUrl + '/' + _id, ingredientData, headers);
// }

// function deleteIngredient(_id) {
//     let headers = extraHeaders();
//     var options = {
//         method: 'DELETE',
//         headers: headers,
//     }

//     return fetchResource((requestUrl + '/' + _id), options);
// }

// function filterIngredient(filterData) {
//     let headers = extraHeaders();
//     return postFormData(requestUrl + '/filter', filterData, headers);
// }

// export default {
//     getIngredients,
//     getIngredient,
//     addIngredient,
//     updateIngredient,
//     deleteIngredient,
//     filterIngredient
// }