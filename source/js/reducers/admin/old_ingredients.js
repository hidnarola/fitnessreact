// import { Map } from "immutable";
// import {
//     INGREDIENTS_ADD_REQUEST,
//     INGREDIENTS_ADD_SUCCESS,
//     INGREDIENTS_ADD_ERROR,
//     INGREDIENTS_LIST_REQUEST,
//     INGREDIENTS_LIST_SUCCESS,
//     INGREDIENTS_LIST_ERROR,
//     INGREDIENTS_DELETE_REQUEST,
//     INGREDIENTS_DELETE_SUCCESS,
//     INGREDIENTS_DELETE_ERROR,
//     INGREDIENTS_SELECT_ONE_REQUEST,
//     INGREDIENTS_SELECT_ONE_SUCCESS,
//     INGREDIENTS_SELECT_ONE_ERROR,
//     INGREDIENTS_UPDATE_REQUEST,
//     INGREDIENTS_UPDATE_SUCCESS,
//     INGREDIENTS_UPDATE_ERROR,
//     INGREDIENTS_FILTER_REQUEST,
//     INGREDIENTS_FILTER_SUCCESS,
//     INGREDIENTS_FILTER_ERROR
// } from "../../actions/admin/ingredients";

// const initialState = Map({
//     loading: false,
//     error: null,
//     ingredient: null,
//     ingredients: [],
//     filteredIngredients: [],
//     filteredTotalPages: 0,
// });

// const actionMap = {
//     [INGREDIENTS_LIST_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_LIST_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             ingredients: action.data.ingredients,
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_LIST_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_FILTER_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_FILTER_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: action.data.filtered_ingredients,
//             filteredTotalPages: action.data.filtered_total_pages,
//         }));
//     },
//     [INGREDIENTS_FILTER_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_SELECT_ONE_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_SELECT_ONE_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             ingredients: [],
//             ingredient: action.data.ingredient,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_SELECT_ONE_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_ADD_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_ADD_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             ingredients: [],
//             ingredient: action.data.ingredient,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_ADD_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_UPDATE_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_UPDATE_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             ingredients: [],
//             ingredient: action.data.ingredient,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_UPDATE_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_DELETE_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_DELETE_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [INGREDIENTS_DELETE_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             ingredients: [],
//             ingredient: null,
//             filteredIngredients: [],
//             filteredTotalPages: 0,
//         }));
//     },
// };

// export default function reducer(state = initialState, action = {}) {
//     const fn = actionMap[action.type];
//     return fn ? fn(state, action) : state;
// }