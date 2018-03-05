import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';

const renderError = ({ meta: { touched, error } }) =>
    touched && error ? <span>{error}</span> : false;

const WizardFormSecondPage = props => {
    const { handleSubmit, previousPage } = props;
    return (

        <div className="step-box-r">
            <form onSubmit={handleSubmit}>
                <div className="stepbox-head">
                    <h2>Exercise Settings</h2>
                </div>	
                <div className="stepbox-m">
                    <ul className="exercise-level">
                        <li><a href=""><img src="images/round-01.jpg" alt="" /></a> <span>Workout Intensity</span></li>
                        <li><a href=""><img src="images/round-02.jpg" alt="" /></a> <span>Experience Level</span></li>
                    </ul>
                </div>
               

                <Field name="email" type="email" component={renderField} label="Email" />
                <div>
                    <label>Sex</label>
                    <div>
                        <label>
                            <Field name="sex" component="input" type="radio" value="male" />
                            {' '}
                            Male
                        </label>
                        <label>
                            <Field name="sex" component="input" type="radio" value="female" />
                            {' '}
                            Female
                        </label>
                        <Field name="sex" component={renderError} />
                    </div>
                </div>

                 <div className="stepbox-b">
                    <button type="button" className="back-btn" onClick={previousPage}>
                        Previous
                    </button>
                    <button type="submit" className="continues-btn">Next</button>
                </div>

            </form>
        </div>

    );
};

export default reduxForm({
    form: 'wizard', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(WizardFormSecondPage);
