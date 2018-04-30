// import { Map } from "immutable";
// import {
//     RECIPES_ADD_REQUEST,
//     RECIPES_ADD_SUCCESS,
//     RECIPES_ADD_ERROR,
//     RECIPES_LIST_REQUEST,
//     RECIPES_LIST_SUCCESS,
//     RECIPES_LIST_ERROR,
//     RECIPES_DELETE_REQUEST,
//     RECIPES_DELETE_SUCCESS,
//     RECIPES_DELETE_ERROR,
//     RECIPES_SELECT_ONE_REQUEST,
//     RECIPES_SELECT_ONE_SUCCESS,
//     RECIPES_SELECT_ONE_ERROR,
//     RECIPES_UPDATE_REQUEST,
//     RECIPES_UPDATE_SUCCESS,
//     RECIPES_UPDATE_ERROR,
//     RECIPES_FILTER_REQUEST,
//     RECIPES_FILTER_SUCCESS,
//     RECIPES_FILTER_ERROR
// } from "../../actions/admin/recipes";

// const initialState = Map({
//     loading: false,
//     error: null,
//     recipe: null,
//     recipes: [],
//     filteredRecipes: [],
//     filteredTotalPages: 0,
// });

// const actionMap = {
//     [RECIPES_LIST_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_LIST_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             recipes: action.data.recipes,
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_LIST_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_FILTER_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_FILTER_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: action.data.filtered_recipes,
//             filteredTotalPages: action.data.filtered_total_pages,
//         }));
//     },
//     [RECIPES_FILTER_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_SELECT_ONE_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_SELECT_ONE_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             recipes: [],
//             recipe: action.data.recipe,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_SELECT_ONE_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_ADD_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_ADD_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             recipes: [],
//             recipe: action.data.recipe,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_ADD_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_UPDATE_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_UPDATE_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             recipes: [],
//             recipe: action.data.recipe,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_UPDATE_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_DELETE_REQUEST]: (state, action) => {
//         return state.merge(Map({
//             loading: true,
//             error: null,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_DELETE_SUCCESS]: (state, action) => {
//         return state.merge(Map({
//             loading: false,
//             error: null,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
//     [RECIPES_DELETE_ERROR]: (state, action) => {
//         let error = 'Server error';
//         if (action.error && action.error.response) {
//             error = action.error.response.message;
//         }
//         return state.merge(Map({
//             loading: false,
//             error: error,
//             recipes: [],
//             recipe: null,
//             filteredRecipes: [],
//             filteredTotalPages: 0,
//         }));
//     },
// };

// export default function reducer(state = initialState, action = {}) {
//     const fn = actionMap[action.type];
//     return fn ? fn(state, action) : state;
// }