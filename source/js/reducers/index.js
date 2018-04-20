import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import app from 'reducers/app';
import user from 'reducers/user';
import userBodyMeasurement from 'reducers/userBodyMeasurement';
import people from 'reducers/people';
import dashboardnew from 'reducers/dashboard';
import nutrition from 'reducers/nutrition';
import exerciseFitness from 'reducers/exercise/fitness'
import userEquipments from 'reducers/userEquipments'
import friends from 'reducers/friends';
import profilePhotos from 'reducers/profilePhotos';
import login from 'reducers/login';
import pageLoader from 'reducers/pageLoader';
import adminNutritions from 'reducers/admin/nutritions'
import adminEquipments from 'reducers/admin/equipments'
import adminEquipmentCategories from 'reducers/admin/equipmentCategories'
import adminExercises from 'reducers/admin/exercises'
import adminBodyParts from 'reducers/admin/bodyParts'
import adminExerciseTypes from 'reducers/admin/exerciseTypes'
import adminUsers from 'reducers/admin/users'
import adminRecipes from 'reducers/admin/recipes'
import adminIngredients from 'reducers/admin/ingredients'

export default combineReducers({
    app,
    user,
    userBodyMeasurement,
    people,
    dashboardnew,
    nutrition,
    exerciseFitness,
    userEquipments,
    friends,
    profilePhotos,
    login,
    pageLoader,
    adminNutritions,
    adminEquipments,
    adminEquipmentCategories,
    adminExercises,
    adminBodyParts,
    adminExerciseTypes,
    adminUsers,
    adminRecipes,
    adminIngredients,
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    form: formReducer
});
