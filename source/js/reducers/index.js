import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import app from 'reducers/app';
import people from 'reducers/people';
import dashboardnew from 'reducers/dashboard';
import nutrition from 'reducers/nutrition';
import exerciseFitness from 'reducers/exercise/fitness'
import exerciseEquipments from 'reducers/exercise/equipments'
import friends from 'reducers/friends';
import profilePhotos from 'reducers/profilePhotos';

export default combineReducers({
    app,
    people,
    dashboardnew,
    nutrition,
    exerciseFitness,
    exerciseEquipments,
    friends,
    profilePhotos,
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    form: formReducer
});
