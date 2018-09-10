import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { InputField } from '../../../helpers/FormControlHelper';
import { required, email } from '../../../formValidation/validationRules';
import { getAdminProfileRequest } from '../../../actions/admin/profile';
import { FaSpinner } from 'react-icons/lib/fa';
import { Alert } from "react-bootstrap";

class ProfileForm extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getAdminProfileRequest());
    }

    render() {
        const { handleSubmit, saveLoading, saveError } = this.props;
        return (
            <div className="change-password-form">
                {saveError && saveError.length > 0 &&
                    <Alert bsStyle="danger">
                        {
                            saveError.map((e, i) => {
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
                                name="first_name"
                                label="First Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                className="form-control"
                                placeholder="First Name"
                                component={InputField}
                                errorClass="help-block"
                                validate={[required]}
                            />
                            <Field
                                name="last_name"
                                label="Last Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                className="form-control"
                                placeholder="Last Name"
                                component={InputField}
                                errorClass="help-block"
                                validate={[required]}
                            />
                            <Field
                                name="email"
                                label="Email"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                className="form-control"
                                placeholder="Email"
                                component={InputField}
                                errorClass="help-block"
                                validate={[required, email]}
                            />
                            <div className="form-group text-c">
                                <button type="submit" className="custom-medium-btn" disabled={saveLoading}>
                                    <span>Save</span>
                                    {!saveLoading && <i className="icon-save"></i>}
                                    {saveLoading && <FaSpinner className="loader-spinner" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, user, initialize } = this.props;
        if (!loading && prevProps.loading !== loading && user && prevProps.user !== user) {
            let formData = {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
            };
            initialize(formData);
        }
    }

}

ProfileForm = reduxForm({
    form: 'profile_form',
})(ProfileForm);

const mapStateToProps = (state) => {
    const { adminProfile } = state;
    return {
        loading: adminProfile.get('loading'),
        saveLoading: adminProfile.get('saveLoading'),
        user: adminProfile.get('user'),
        saveError: adminProfile.get('saveError'),
    };
}

export default connect(
    mapStateToProps,
)(ProfileForm);