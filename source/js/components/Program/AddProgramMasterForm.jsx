import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { required, minLength, maxLength, requiredReactSelect } from '../../formValidation/validationRules';
import { Alert } from "react-bootstrap";
import { SelectField_ReactSelect } from '../../helpers/FormControlHelper';

const minLength2 = minLength(2);
const maxLength20 = maxLength(20);
const maxLength200 = maxLength(200);

class AddProgramMasterForm extends Component {
    render() {
        const { handleSubmit, onCancel, errorArr, loadingMaster, privacyOptions, goalOptions, levelOptions } = this.props;
        return (
            <div className="add-program-master-form-alert-form">
                {errorArr && errorArr.length > 0 &&
                    <Alert bsStyle="danger">
                        {
                            errorArr.map((o, i) => (<p key={i}>{o}</p>))
                        }
                    </Alert>
                }
                <form method="POST" onSubmit={handleSubmit}>
                    <Field
                        name="title"
                        className="form-control"
                        wrapperClass="form-group"
                        placeholder="Name"
                        component={InputField}
                        errorClass="help-block"
                        validate={[required, minLength2, maxLength20]}
                    />
                    <Field
                        name="description"
                        className="form-control resize-vertical min-height-80"
                        wrapperClass="form-group"
                        placeholder="Description"
                        component={TextAreaField}
                        errorClass="help-block"
                        validate={[maxLength200]}
                    />
                    <Field
                        id="privacy"
                        name="privacy"
                        className=""
                        wrapperClass="form-group"
                        placeholder="Select Privacy"
                        component={SelectField_ReactSelect}
                        options={privacyOptions}
                        errorClass="help-block"
                        validate={[requiredReactSelect]}
                    />
                    <Field
                        id="goal"
                        name="goal"
                        className=""
                        wrapperClass="form-group"
                        placeholder="Select Goal"
                        component={SelectField_ReactSelect}
                        options={goalOptions}
                        errorClass="help-block"
                        validate={[requiredReactSelect]}
                    />
                    <Field
                        id="level"
                        name="level"
                        className=""
                        wrapperClass="form-group"
                        placeholder="Select Difficulty Level"
                        component={SelectField_ReactSelect}
                        options={levelOptions}
                        errorClass="help-block"
                        validate={[requiredReactSelect]}
                    />
                    <button type="button" onClick={onCancel} className="btn btn-sm btn-danger">Cancel</button>
                    <button type="submit" disabled={loadingMaster} className="btn btn-sm btn-success">OK</button>
                </form>
            </div>
        );
    }
}

AddProgramMasterForm = reduxForm({
    form: 'add_program_master_form',
})(AddProgramMasterForm)

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        loadingMaster: userPrograms.get('loadingMaster'),
    };
}

export default connect(mapStateToProps)(AddProgramMasterForm);

const TextAreaField = (props) => {
    const { input, meta, wrapperClass, className, placeholder, errorClass } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <textarea
                {...input}
                className={className}
                placeholder={placeholder}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

const InputField = (props) => {
    const { input, meta, wrapperClass, className, placeholder, errorClass, type, disabled, properties } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <input
                {...input}
                type={type ? type : 'text'}
                disabled={disabled ? disabled : false}
                className={className}
                placeholder={placeholder}
                {...properties}
                autoComplete="off"
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}