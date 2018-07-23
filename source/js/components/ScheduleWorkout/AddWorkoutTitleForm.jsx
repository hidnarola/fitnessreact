import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { required } from '../../formValidation/validationRules';
import { te } from '../../helpers/funs';
import { withRouter } from "react-router-dom";
import { routeCodes } from '../../constants/routes';
import { SCHEDULED_WORKOUT_TYPE_EXERCISE } from '../../constants/consts';
import moment from "moment";
import { addUserWorkoutTitleRequest } from '../../actions/userScheduleWorkouts';

class AddWorkoutTitleForm extends Component {
    render() {
        return (
            <div className="add-workout-title-alert-form">
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
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loadingTitle, workoutTitle, errorTitle, history } = this.props;
        if (!loadingTitle && workoutTitle && prevProps.workoutTitle !== workoutTitle) {
            if (errorTitle && errorTitle.length <= 0) {
                var _id = workoutTitle._id;
                let url = routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', _id);
                history.push(url);
            } else {
                te(errorTitle[0]);
            }
        }
    }

}

AddWorkoutTitleForm = reduxForm({
    form: 'add_workout_title_form',
    onSubmit: (data, dispatch, props) => handleSubmit(data, dispatch, props)
})(AddWorkoutTitleForm)

AddWorkoutTitleForm = withRouter(AddWorkoutTitleForm);

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        loadingTitle: userScheduleWorkouts.get('loadingTitle'),
        workoutTitle: userScheduleWorkouts.get('workoutTitle'),
        errorTitle: userScheduleWorkouts.get('errorTitle'),
        selectedSlot: userScheduleWorkouts.get('slotInfo'),
    };
}

export default connect(
    mapStateToProps,
)(AddWorkoutTitleForm);

const handleSubmit = (data, dispatch, props) => {
    var startDay = moment(props.selectedSlot.start).startOf('day');
    var date = moment.utc(startDay);
    var requestData = {
        title: data.title,
        description: (data.description) ? data.description : '',
        type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
        date: date,
    }
    props.dispatch(addUserWorkoutTitleRequest(requestData));
}

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