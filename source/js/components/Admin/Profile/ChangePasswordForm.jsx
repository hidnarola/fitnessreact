import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from "redux-form";
import { InputField } from '../../../helpers/FormControlHelper';
import { FaSpinner } from 'react-icons/lib/fa';
import { Alert } from "react-bootstrap";
import { required, minLength, maxLength } from '../../../formValidation/validationRules';

const min8 = minLength(8);
const max32 = maxLength(32);

class ChangePasswordForm extends Component {
    render() {
        const { handleSubmit, loading, changePasswordError } = this.props;
        return (
            <div className="change-password-form">
                {changePasswordError && changePasswordError.length > 0 &&
                    <Alert bsStyle="danger">
                        {
                            changePasswordError.map((e, i) => {
                                return (
                                    <p key={i}>{e}</p>
                                );
                            })
                        }
                    </Alert>
                }
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="password"
                                label="Password"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                className="form-control"
                                placeholder="Password"
                                component={InputField}
                                type="password"
                                errorClass="help-block"
                                validate={[required]}
                            />
                            <Field
                                name="new_password"
                                label="New Password"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                className="form-control"
                                placeholder="New Password"
                                component={InputField}
                                type="password"
                                errorClass="help-block"
                                validate={[required, min8, max32]}
                            />
                            <Field
                                name="confirm_password"
                                label="Confirm Password"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                className="form-control"
                                placeholder="Confirm Password"
                                component={InputField}
                                type="password"
                                errorClass="help-block"
                                validate={[required, min8, max32, this.validateEqualPassword]}
                            />
                            <div className="form-group text-c">
                                <button type="submit" className="custom-medium-btn" disabled={loading}>
                                    <span>Save</span>
                                    {!loading && <i className="icon-add_circle"></i>}
                                    {loading && <FaSpinner className="loader-spinner" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading } = this.props;
        if (!loading && prevProps.loading !== loading) {
            this.props.reset();
        }
    }

    validateEqualPassword = (value) => {
        const { newPassword } = this.props;
        if (value && value !== newPassword) {
            return 'New password and confirm password must be same';
        }
        return undefined;
    }
}

ChangePasswordForm = reduxForm({
    form: 'change_password_form',
})(ChangePasswordForm);

const valueSelector = formValueSelector('change_password_form');

const mapStateToProps = (state) => {
    const { adminChangePassword } = state;
    return {
        loading: adminChangePassword.get('loading'),
        changePasswordError: adminChangePassword.get('error'),
        newPassword: valueSelector(state, 'new_password'),
    };
}

export default connect(
    mapStateToProps,
)(ChangePasswordForm);