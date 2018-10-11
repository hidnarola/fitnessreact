import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from "redux-form";
import { InputField } from '../../helpers/FormControlHelper';
import { FaSpinner } from 'react-icons/lib/fa';
import { Alert } from "react-bootstrap";
import { required, minLength } from '../../formValidation/validationRules';
import ReactTooltip from "react-tooltip";

const min8 = minLength(8);

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
                        <div className="col-md-12 change-password-fields-wrapper">
                            <div className="pwd-info-wrapper"><span><i className="icon-info" data-tip data-for="password_strength_tooltip"></i></span></div>
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
                                validate={[required, min8, this.validatePasswordStrength]}
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
                                validate={[required, min8, this.validatePasswordStrength, this.validateEqualPassword]}
                            />
                            <div className="form-group text-c">
                                <button type="submit" className="custom-medium-btn" disabled={loading}>
                                    <span>Save</span>
                                    {!loading && <i className="icon-save"></i>}
                                    {loading && <FaSpinner className="loader-spinner" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <ReactTooltip id="password_strength_tooltip" place="top" type="dark" effect="solid">
                    <div className="pwd-info-tt-wrapper">
                        <p><i className="icon-cancel"></i> At least 8 characters in length</p>
                        <p><i className="icon-cancel"></i> Contain at  least 3 of the following 4 types of characters:</p>
                        <ul>
                            <li>Lower case letters (a-z)</li>
                            <li>Upper case letters (A-Z)</li>
                            <li>Numbers (i.e. 0-9)</li>
                            <li>Special characters (e.g. !@#$%^&*)</li>
                        </ul>
                    </div>
                </ReactTooltip>
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

    validatePasswordStrength = (value) => {
        if (value) {
            let patt = /^(((?=.*[a-z])(?=.*[A-Z])(?=.*\d))|((?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]))|((?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]))|((?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])){8,})/g;
            let res = patt.test(value);
            if (!res) {
                return 'Password is too week';
            }
        }
        return undefined;
    }
}

ChangePasswordForm = reduxForm({
    form: 'change_password_form',
})(ChangePasswordForm);

const valueSelector = formValueSelector('change_password_form');

const mapStateToProps = (state) => {
    const { userChangePassword } = state;
    return {
        loading: userChangePassword.get('loading'),
        changePasswordError: userChangePassword.get('error'),
        newPassword: valueSelector(state, 'new_password'),
    };
}

export default connect(
    mapStateToProps,
)(ChangePasswordForm);