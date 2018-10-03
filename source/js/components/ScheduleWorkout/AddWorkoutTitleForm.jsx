import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { required, minLength, maxLength } from '../../formValidation/validationRules';
import { Alert } from "react-bootstrap";

const minLength2 = minLength(2);
const maxLength20 = maxLength(20);
const maxLength200 = maxLength(200);

class AddWorkoutTitleForm extends Component {
    render() {
        const { handleSubmit, onCancel, errorArr } = this.props;
        return (
            <div className="add-workout-title-alert-form">
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
                        placeholder="Title"
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
                    <button type="button" onClick={onCancel} className="btn btn-sm btn-danger">Cancel</button>
                    <button type="submit" className="btn btn-sm btn-success">OK</button>
                </form>
            </div>
        );
    }
}

AddWorkoutTitleForm = reduxForm({
    form: 'add_workout_title_form',
})(AddWorkoutTitleForm)

export default connect()(AddWorkoutTitleForm);

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