import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { required } from '../../formValidation/validationRules';
import { addUserProgramMasterRequest } from '../../actions/userPrograms';
import { te } from '../../helpers/funs';
import { withRouter } from "react-router-dom";
import { routeCodes } from '../../constants/routes';

class UpdateProgramMasterForm extends Component {
    render() {
        const { handleSubmit, onCancel } = this.props;
        return (
            <div className="add-program-master-form-alert-form">
                <form method="POST" onSubmit={handleSubmit}>
                    <Field
                        name="title"
                        className="form-control"
                        wrapperClass="form-group"
                        placeholder="Title"
                        component={InputField}
                        errorClass="help-block"
                        validate={[required]}
                    />
                    <Field
                        name="description"
                        className="form-control"
                        wrapperClass="form-group"
                        placeholder="Description"
                        component={TextAreaField}
                    />
                    <button type="button" onClick={onCancel} className="btn btn-sm btn-danger">Cancel</button>
                    <button type="submit" className="btn btn-sm btn-success">OK</button>
                </form>
            </div>
        );
    }
}

UpdateProgramMasterForm = reduxForm({
    form: 'update_program_title_form',
})(UpdateProgramMasterForm)

export default connect()(UpdateProgramMasterForm);

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