import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, email } from '../../formValidation/validationRules';

const LoginForm = (props) => {
    return (
        <form method="POST" onSubmit={props.handleSubmit} className="width-100-per">
            <div className="step-box-r">
                <div className="stepbox-head">
                    <h2>Login Details</h2>
                </div>
                <div className="stepbox-m personal-dtl">
                    <ul className="">
                        <li>
                            <Field
                                name="email"
                                type="email"
                                label="Email"
                                placeholder="Email"
                                component={loginFields}
                                validate={[required, email]}
                            />
                        </li>
                        <li>
                            <Field
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                component={loginFields}
                                validate={[required]}
                            />
                        </li>
                        <li className="checl_login">
                            <div className="form-div">
                                <label></label>
                                <div className="input-wrap">
                                    <div className="custom_check">
                                        <input type="checkbox" id="test1" />
                                        <label htmlFor="test1">Remember Me</label>
                                    </div>
                                    <div className="form-group reset_link">
                                        <span><a href="">Forgot Password ?</a></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
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
    form: 'loginForm'
})(LoginForm);