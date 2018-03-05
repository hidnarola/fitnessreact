import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';

const WizardFormFirstPage = props => {
    const { handleSubmit } = props;
    return (
        <div className="step-box-r">
            <form onSubmit={handleSubmit}>
                <div className="stepbox-head">
                    <h2>Workout Location</h2>
                </div>
                <div className="stepbox-m">

                    <Field
                        name="firstName"
                        type="text"
                        component={renderField}
                        label="First Name"
                    />
                    <Field
                        name="lastName"
                        type="text"
                        component={renderField}
                        label="Last Name"
                    />

                    <ul className="work-level">
                        <li>
                            <a href=""></a>
                            <span>HOME</span>
                        </li>
                        <li>
                            <a href=""></a>
                            <span>GYM</span>
                        </li>
                    </ul>
                </div>
                <div className="stepbox-b">
                    <button type="submit" className="next continues-btn">
                        Next
                    </button>
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
})(WizardFormFirstPage);
