import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import app from 'reducers/app';
import people from 'reducers/people';
import dashboardnew from 'reducers/dashboard';
import nutrition from 'reducers/nutrition';

export default combineReducers({
    app,    
    people,
    dashboardnew,    
    nutrition,    
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    form: formReducer
});
