import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, email } from 'formValidation/validationRules';
import { InputField } from '../../../helpers/FormControlHelper';

const AdminLoginForm = (props) => {
    const { error, loading } = props;
    return (
        <form method="POST" onSubmit={props.handleSubmit} className="admin-login width-100-per">
            <div className="step-box-r">
                <div className="stepbox-head">
                    <h2>Admin Login</h2>
                </div>
                {error &&
                    <div className="admin-login-error-wrapper">
                        <span>{error}</span>
                    </div>
                }
                <div className="stepbox-m personal-dtl">
                    <Field
                        name="email"
                        type="email"
                        className="form-control"
                        label="Email"
                        labelClass="control-label"
                        wrapperClass="form-group"
                        placeholder="Email"
                        component={InputField}
                        errorClass="help-block"
                        warningClass=""
                        validate={[required, email]}
                    />
                    <Field
                        name="password"
                        type="password"
                        className="form-control"
                        label="Password"
                        labelClass="control-label"
                        wrapperClass="form-group"
                        placeholder="Password"
                        component={InputField}
                        errorClass="help-block"
                        warningClass=""
                        validate={[required]}
                    />
                </div>
                <div className="stepbox-b">
                    <button type="submit" className="continues-btn"><span>Continues</span> <i className="icon-skip_next"></i></button>
                </div>
            </div>
        </form>
    );
}

const loginFields = (props) => {
    const { meta } = props;
    return (
        <div className="form-div">
            <label htmlFor={props.name}>{props.label}</label>
            <div className="input-wrap">
                <input {...props.input} placeholder={props.placeholder} type={props.type} />
            </div>
            <div className="error">
                {meta.touched && meta.error &&
                    <span>{meta.error}</span>
                }
            </div>
        </div>
    );
}

export default reduxForm({
    form: 'adminLoginForm'
})(AdminLoginForm);