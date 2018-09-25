import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm, Field, formValueSelector, initialize } from 'redux-form';
import { InputField, SelectField_ReactSelect, TextAreaField } from '../../../helpers/FormControlHelper';
import { required, requiredReactSelect, requiredReactSelectStatus, min, minLength, maxLength } from '../../../formValidation/validationRules';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import {
    TIME_TYPE_TIME_WINDOW,
    TIME_TYPE_STANDARD,
    BADGES_TASKS,
    MEASUREMENT_UNITS,
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_ACTIVE_STR,
    STATUS_INACTIVE_STR,
    TIME_WINDOW_TYPES
} from '../../../constants/consts';
import { capitalizeFirstLetter } from '../../../helpers/funs';
import _ from "lodash";
import { badgeSelectOneRequest } from '../../../actions/admin/badges';

const min0 = min(0);
const min1 = min(1);
const minLength3 = minLength(3);
const maxLength100 = maxLength(100);

const timeTypeOptions = [
    { value: TIME_TYPE_STANDARD, label: capitalizeFirstLetter(TIME_TYPE_STANDARD).replace('_', ' ') },
    { value: TIME_TYPE_TIME_WINDOW, label: capitalizeFirstLetter(TIME_TYPE_TIME_WINDOW).replace('_', ' ') },
];

const statusOptions = [
    { value: STATUS_ACTIVE, label: STATUS_ACTIVE_STR },
    { value: STATUS_INACTIVE, label: STATUS_INACTIVE_STR },
];

class BadgeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeType: '',
            selectOneActionInit: false,
        }
        this.taskUnits = [];
    }

    componentWillMount() {
        const {
            match,
            dispatch,
        } = this.props;
        if (typeof match.params.id !== 'undefined') {
            this.setState({ selectOneActionInit: true });
            dispatch(badgeSelectOneRequest(match.params.id));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTask) {
            if ((!this.props.selectedTask) || (this.props.selectedTask && nextProps.selectedTask && this.props.selectedTask.value !== nextProps.selectedTask.value)) {
                var units = _.find(MEASUREMENT_UNITS, ['key', nextProps.selectedTask.unitKey]);
                if (units) {
                    this.taskUnits = units.value;
                } else {
                    this.taskUnits = [];
                }
                if (typeof nextProps.match.params.id !== 'undefined' && this.props.initialized) {
                    this.props.change('unit', null);
                } else if (typeof nextProps.match.params.id === 'undefined' && !this.props.initialized) {
                    this.props.change('unit', null);
                }
            }
        }
    }

    render() {
        const {  timeType } = this.state;
        const { handleSubmit } = this.props;
        return (
            <div className="badge-form-data">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <Field
                                name="task"
                                label="Task"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Task"
                                component={SelectField_ReactSelect}
                                options={BADGES_TASKS}
                                errorClass="help-block"
                                validate={[requiredReactSelect]}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="target"
                                type="number"
                                className="form-control"
                                label="Target"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Target"
                                component={InputField}
                                errorClass="help-block"
                                warningClass=""
                                validate={[required, min1]}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="unit"
                                label="Unit"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Unit"
                                component={SelectField_ReactSelect}
                                options={this.taskUnits}
                                errorClass="help-block"
                                validate={[requiredReactSelect]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Field
                                name="points"
                                type="number"
                                className="form-control"
                                label="Points"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Points"
                                component={InputField}
                                errorClass="help-block"
                                warningClass=""
                                validate={[required, min0]}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="name"
                                className="form-control"
                                label="Name"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Name"
                                component={InputField}
                                errorClass="help-block"
                                warningClass=""
                                validate={[required, minLength3, maxLength100]}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="status"
                                label="Status"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Status"
                                component={SelectField_ReactSelect}
                                options={statusOptions}
                                errorClass="help-block"
                                validate={[requiredReactSelectStatus]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Field
                                name="time_type"
                                label="Time Type"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Time Type"
                                component={SelectField_ReactSelect}
                                options={timeTypeOptions}
                                errorClass="help-block"
                                validate={[requiredReactSelect]}
                                onChange={(val) => this.setState({ timeType: val.value })}
                            />
                        </div>
                        {timeType && timeType === TIME_TYPE_TIME_WINDOW &&
                            <div className="col-md-4">
                                <Field
                                    name="time_window_type"
                                    label="Duration Type"
                                    labelClass="control-label display_block"
                                    wrapperClass="form-group"
                                    placeholder="Duration Type"
                                    component={SelectField_ReactSelect}
                                    options={TIME_WINDOW_TYPES}
                                    errorClass="help-block"
                                    validate={[requiredReactSelectStatus]}
                                />
                            </div>
                        }
                        {timeType && timeType === TIME_TYPE_TIME_WINDOW &&
                            <div className="col-md-4">
                                <Field
                                    name="duration"
                                    type="number"
                                    className="form-control"
                                    label="Duration"
                                    labelClass="control-label display_block"
                                    wrapperClass="form-group"
                                    placeholder="Duration"
                                    component={InputField}
                                    errorClass="help-block"
                                    warningClass=""
                                    validate={[required, min0]}
                                />
                            </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Field
                                name="incompleteDescription"
                                className="form-control resize-vertical min-height-80"
                                label="Incomplete Description"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Incomplete Description"
                                component={TextAreaField}
                            />
                        </div>
                        <div className="col-md-6">
                        <Field
                                name="completeDescription"
                                className="form-control resize-vertical min-height-80"
                                label="Complete Description"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Complete Description"
                                component={TextAreaField}
                            />
                        </div>
                    </div>
                    <div className="d-flex pull-right mt-10">
                        <div className="col-md-12">
                            <Link to={adminRouteCodes.BADGES} className="custom-medium-link-btn">
                                <span>Back</span>
                                <i className="icon-arrow_back"></i>
                            </Link>
                            <button type="submit" className="custom-medium-btn">
                                <span>Save</span>
                                <i className="icon-save"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        );
    }

    componentDidUpdate() {
        const {
            selectOneActionInit,
        } = this.state;
        const {
            loading,
            badge,
            dispatch,
            history,
            badgeErrors,
        } = this.props;
        if (selectOneActionInit && !loading) {
            if (badgeErrors && badgeErrors.length > 0) {
                history.push(adminRouteCodes.BADGES);
            } else {
                this.setState({ selectOneActionInit: false });
                var task = badge.task;
                var taskObj = _.find(BADGES_TASKS, ['value', task]);
                var badgeUnitObj = null;
                var unit = badge.unit;
                if (taskObj) {
                    var taskUnitsObj = _.find(MEASUREMENT_UNITS, ['key', taskObj.unitKey]);
                    if (taskUnitsObj) {
                        var taskUnits = taskUnitsObj.value;
                        var unitObj = _.find(taskUnits, ['value', unit]);
                        if (unitObj) {
                            badgeUnitObj = unitObj;
                        }
                    }
                }
                var timeTypeObj = _.find(timeTypeOptions, ['value', badge.timeType]);
                var duration = null;
                var timeWindowType = null;
                if (badge.timeType === TIME_TYPE_TIME_WINDOW) {
                    timeWindowType = _.find(TIME_WINDOW_TYPES, ['value', badge.timeWindowType]);
                    duration = badge.duration;
                }
                var badgeStatusObj = _.find(statusOptions, ['value', badge.status]);
                var formData = {
                    task: (taskObj) ? taskObj : null,
                    target: badge.value,
                    unit: badgeUnitObj,
                    points: badge.point,
                    name: badge.name,
                    incompleteDescription: badge.descriptionInCompleted,
                    completeDescription: badge.descriptionCompleted,
                    time_type: timeTypeObj ? timeTypeObj : null,
                    duration: duration,
                    time_window_type: (timeWindowType && timeWindowType.value) ? timeWindowType.value : null,
                    status: (badgeStatusObj) ? badgeStatusObj : null,
                }
                dispatch(initialize('badgeSaveForm', formData));
                this.setState({
                    timeType: timeTypeObj.value,
                });
            }
        }
    }
}

const badgeSaveFormSelector = formValueSelector('badgeSaveForm');

BadgeForm = withRouter(BadgeForm);

BadgeForm = reduxForm({
    form: 'badgeSaveForm'
})(BadgeForm);

const mapStateToProps = (state) => {
    const { adminBadges } = state;
    return {
        selectedTask: badgeSaveFormSelector(state, 'task'),
        loading: adminBadges.get('loading'),
        badge: adminBadges.get('badge'),
        badgeErrors: adminBadges.get('error'),
    };
}

export default connect(mapStateToProps)(BadgeForm);