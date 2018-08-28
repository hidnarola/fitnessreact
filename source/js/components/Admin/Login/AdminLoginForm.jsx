import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { required, email } from 'formValidation/validationRules';
import { InputField } from '../../../helpers/FormControlHelper';
import { adminRootRoute } from '../../../constants/adminRoutes';
import { SESSION_EXPIRED_URL_TYPE } from '../../../constants/consts';

class AdminLoginForm extends Component {
    render() {
        const { loginError, handleSubmit, match } = this.props;
        return (
            <form method="POST" onSubmit={handleSubmit} className="admin-login width-100-per">
                <div className="step-box-r">
                    <div className="stepbox-head">
                        <h2>Admin Login</h2>
                    </div>

                    <div id="validation_errors_wrapper">
                        {loginError && loginError.length > 0 &&
                            <div className="alert alert-danger" role="alert">
                                {
                                    loginError.map((err, index) => (
                                        <p key={index}>{err}</p>
                                    ))
                                }
                            </div>
                        }
                        {(match.path === (adminRootRoute + '/' + SESSION_EXPIRED_URL_TYPE)) &&
                            <div className="alert alert-danger" role="alert">
                                <p>Session expired! please login again.</p>
                            </div>
                        }
                    </div>

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
                        <button type="submit" className="continues-btn"><span>Login</span> <i className="icon-skip_next"></i></button>
                    </div>
                </div>
            </form>
        );
    }
}

AdminLoginForm = reduxForm({
    form: 'adminLoginForm'
})(AdminLoginForm);

const mapStateToProps = (state) => {
    const { login } = state;
    return {
        loginError: login.get('error'),
    }
}

export default connect(
    mapStateToProps
)(withRouter(AdminLoginForm));