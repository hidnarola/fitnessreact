import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from "redux-form";
import { required } from '../../formValidation/validationRules';

class UpdateScheduleWorkoutTitleForm extends Component {
    render() {
        return (
            <div className="update-schedule-workout-title-form">
                <form>
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
                        <button type="button" className="">Save</button>
                    </div>
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { workout, dispatch } = this.props;
        var formData = {
            title: workout.title,
            description: workout.description,
        }
        dispatch(initialize('update_schedule_workout_title_form', formData));
    }

}

UpdateScheduleWorkoutTitleForm = reduxForm({
    form: 'update_schedule_workout_title_form',
})(UpdateScheduleWorkoutTitleForm);

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        workout: userScheduleWorkouts.get('workout'),
    };
}

export default connect(
    mapStateToProps
)(UpdateScheduleWorkoutTitleForm);

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
                onChange={(e) => input.onChange(e.target.value)}
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
                onChange={(e) => input.onChange(e.target.value)}
            />
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}