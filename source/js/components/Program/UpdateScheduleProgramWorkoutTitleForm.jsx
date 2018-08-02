import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from "redux-form";
import { required } from '../../formValidation/validationRules';

class UpdateScheduleProgramWorkoutTitleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadFormData: false,
        }
    }

    componentWillMount() {
        this.setState({ loadFormData: true });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="update-schedule-workout-title-form">
                <form onSubmit={handleSubmit}>
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
                        className="form-control resize-vertical min-height-80"
                        wrapperClass="form-group"
                        placeholder="Description"
                        component={TextAreaField}
                    />
                    <div className="update-schedule-workout-title-form-btn">
                        <button type="submit" className="">Save</button>
                    </div>
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { workout, dispatch } = this.props;
        const { loadFormData } = this.state;
        if (loadFormData) {
            var formData = {
                title: workout.title,
                description: workout.description,
            }
            this.setState({ loadFormData: false });
            dispatch(initialize('update_schedule_workout_title_form', formData));
        }
    }
}

UpdateScheduleProgramWorkoutTitleForm = reduxForm({
    form: 'update_schedule_workout_title_form',
})(UpdateScheduleProgramWorkoutTitleForm);

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        workout: userPrograms.get('workout'),
    };
}

export default connect(
    mapStateToProps
)(UpdateScheduleProgramWorkoutTitleForm);

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