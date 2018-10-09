import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import noImg from 'img/common/no-img.png'
import moment from 'moment';
import { InputField, SelectField_ReactSelect, DateField, EditorField } from '../../../helpers/FormControlHelper';
import { required, requiredReactSelectStatus, minLength, maxLength, mobile, min, max, validNumber } from '../../../formValidation/validationRules';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { capitalizeFirstLetter, convertUnits } from '../../../helpers/funs';
import {
    GOAL_GAIN_MUSCLE,
    GOAL_IMPROVE_MOBILITY,
    GOAL_LOSE_FAT,
    GOAL_GAIN_STRENGTH,
    GOAL_INCREASE_ENDURANCE,
    USER_STATUS_ACTIVE,
    USER_STATUS_INACTIVE,
    USER_STATUS_ACTIVE_STR,
    USER_STATUS_INACTIVE_STR,
    GENDER_MALE,
    GENDER_FEMALE,
    WORKOUT_LOCATION_GYM,
    WORKOUT_LOCATION_HOME,
    MEASUREMENT_UNIT_CENTIMETER,
    MEASUREMENT_UNIT_KILOGRAM,
    MEASUREMENT_UNIT_GRAM,
    MEASUREMENT_UNIT_INCH,
    MEASUREMENT_UNIT_POUND,
} from '../../../constants/consts';
import { userSelectOneRequest } from '../../../actions/admin/users';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';

const minLength2 = minLength(2);
const maxLength20 = maxLength(20);
const min50 = min(50);
const min44 = min(44);
const min20 = min(20);
const max1000 = max(1000);
const max600 = max(600);
const max240 = max(240);
const max2200 = max(2200);

const goalOptions = [
    { value: GOAL_GAIN_MUSCLE, label: capitalizeFirstLetter(GOAL_GAIN_MUSCLE).replace('_', ' ') },
    { value: GOAL_IMPROVE_MOBILITY, label: capitalizeFirstLetter(GOAL_IMPROVE_MOBILITY).replace('_', ' ') },
    { value: GOAL_LOSE_FAT, label: capitalizeFirstLetter(GOAL_LOSE_FAT).replace('_', ' ') },
    { value: GOAL_GAIN_STRENGTH, label: capitalizeFirstLetter(GOAL_GAIN_STRENGTH).replace('_', ' ') },
    { value: GOAL_INCREASE_ENDURANCE, label: capitalizeFirstLetter(GOAL_INCREASE_ENDURANCE).replace('_', ' ') },
];

const userStatusOptions = [
    { value: USER_STATUS_ACTIVE, label: USER_STATUS_ACTIVE_STR },
    { value: USER_STATUS_INACTIVE, label: USER_STATUS_INACTIVE_STR },
];

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dob: null,
            gender: GENDER_MALE,
            aboutMe: '',
            heightUnit: MEASUREMENT_UNIT_CENTIMETER,
            weightUnit: MEASUREMENT_UNIT_KILOGRAM
        }
    }

    componentDidMount() {
        const { dispatch, match } = this.props;
        if (match && match.params && match.params.id) {
            dispatch(showPageLoader());
            dispatch(userSelectOneRequest(match.params.id));
        }
    }

    render() {
        const { handleSubmit, selectUser } = this.props;
        const { aboutMe, heightUnit, weightUnit } = this.state;
        let validateWeight = (weightUnit !== MEASUREMENT_UNIT_POUND) ? [validNumber, min20, max1000] : [validNumber, min44, max2200];
        let validateHeight = (heightUnit !== MEASUREMENT_UNIT_INCH) ? [validNumber, min50, max600] : [validNumber, min20, max240];
        return (
            <div className="exercise-form-data">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <Field
                                name="first_name"
                                className="form-control"
                                label="First Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="First Name"
                                component={InputField}
                                errorClass="help-block"
                                validate={[required, minLength2, maxLength20]}
                                requiredAstrisk={true}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="last_name"
                                className="form-control"
                                label="Last Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Last Name"
                                component={InputField}
                                errorClass="help-block"
                                validate={[minLength2, maxLength20]}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="mobile_no"
                                className="form-control"
                                label="Mobile No."
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Mobile No."
                                component={InputField}
                                errorClass="help-block"
                                validate={[mobile]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Field
                                id="dob"
                                name="dob"
                                className="form-control"
                                label="Date Of Birth"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Date Of Birth"
                                component={DateField}
                                maxDate={moment().subtract(18, 'year')}
                                isClearable={false}
                                selectedDate={this.state.dob}
                                handleChange={this.handleChangeDob}
                                dateFormat="DD/MM/YYYY"
                                errorClass="help-block"
                                autoComplete="off"
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="height"
                                className="form-control"
                                label={`Height (${heightUnit})`}
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder={`Height (${heightUnit})`}
                                component={InputField}
                                type="text"
                                errorClass="help-block"
                                validate={validateHeight}
                            />
                            <Field
                                name="height_unit"
                                component="input"
                                type="hidden"
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="weight"
                                className="form-control"
                                label={`Weight (${weightUnit})`}
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder={`Weight (${weightUnit})`}
                                component={InputField}
                                type="text"
                                errorClass="help-block"
                                validate={validateWeight}
                            />
                            <Field
                                name="weight_unit"
                                component="input"
                                type="hidden"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="gender" className="control-label display_block">Gender</label>
                                <Field
                                    id={GENDER_MALE}
                                    name="gender"
                                    component="input"
                                    type="radio"
                                    value={GENDER_MALE}
                                />
                                <span className="rbtn">Male</span>
                                <Field
                                    id={GENDER_FEMALE}
                                    name="gender"
                                    component="input"
                                    type="radio"
                                    value={GENDER_FEMALE}
                                />
                                <span className="rbtn">Female</span>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="workout_location" className="control-label display_block">Workout Location</label>
                                <Field
                                    id={WORKOUT_LOCATION_HOME}
                                    name="workout_location"
                                    component="input"
                                    type="radio"
                                    value={WORKOUT_LOCATION_HOME}
                                />
                                <span className="rbtn">Home</span>
                                <Field
                                    id={WORKOUT_LOCATION_GYM}
                                    name="workout_location"
                                    component="input"
                                    type="radio"
                                    value={WORKOUT_LOCATION_GYM}
                                />
                                <span className="rbtn">Gym</span>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="goal"
                                label="Goal"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                component={SelectField_ReactSelect}
                                options={goalOptions}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="status"
                                label="Status"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Status"
                                component={SelectField_ReactSelect}
                                options={userStatusOptions}
                                validate={[requiredReactSelectStatus]}
                                errorClass="help-block"
                                requiredAstrisk={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <Field
                                name="about_me"
                                value={aboutMe}
                                handleChange={this.handleChangeTextEditor}
                                className="editor-min-height-200"
                                label="About Me"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="About Me"
                                component={EditorField}
                            />
                        </div>
                        <div className="col-md-4">
                            <div className="image-preview-wrapper mt-20">
                                <img
                                    src={(selectUser) ? selectUser.avatar : ''}
                                    alt="Image"
                                    onError={(e) => {
                                        e.target.src = noImg
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex pull-right mt-10">
                        <div className="col-md-12">
                            <Link to={adminRouteCodes.USERS} className="custom-medium-link-btn">
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

    componentDidUpdate(prevProps, prevState) {
        const { selectLoading, selectUser, selectError, initialize, dispatch, selectUserPref } = this.props;
        if (!selectLoading && prevProps.selectLoading !== selectLoading && selectUser && prevProps.selectUser !== selectUser) {
            let dob = null;
            if (selectUser.dateOfBirth) {
                dob = moment(selectUser.dateOfBirth);
            }
            let heightUnit = (selectUserPref.bodyMeasurement) ? selectUserPref.bodyMeasurement : MEASUREMENT_UNIT_CENTIMETER;
            let weightUnit = (selectUserPref.weight) ? selectUserPref.weight : MEASUREMENT_UNIT_KILOGRAM;
            var height = (selectUser.height) ? convertUnits(MEASUREMENT_UNIT_CENTIMETER, heightUnit, selectUser.height).toFixed(2) : '';
            var weight = (selectUser.weight) ? convertUnits(MEASUREMENT_UNIT_GRAM, weightUnit, selectUser.weight).toFixed(2) : '';
            const userData = {
                first_name: selectUser.firstName,
                last_name: selectUser.lastName,
                mobile_no: selectUser.mobileNumber,
                dob: dob,
                height: height,
                weight: weight,
                height_unit: heightUnit,
                weight_unit: weightUnit,
                gender: selectUser.gender,
                workout_location: selectUser.workoutLocation,
                goal: _.find(goalOptions, ['value', selectUser.goal]),
                status: _.find(userStatusOptions, (o) => { return (o.value === selectUser.status) }),
                about_me: selectUser.aboutMe,
            }
            initialize(userData);
            this.setState({
                dob: dob,
                gender: selectUser.gender,
                aboutMe: selectUser.aboutMe,
                heightUnit,
                weightUnit
            });
            dispatch(hidePageLoader());
        }
    }

    handleChangeDob = (date) => {
        this.props.change('dob', date);
        this.setState({ dob: date });
    }

    genderChange = (gender) => {
        this.props.change('gender', gender);
        this.setState({ gender: gender });
    }

    handleChangeTextEditor = (editorText) => {
        this.props.change('about_me', editorText);
        this.setState({ aboutMe: editorText });
    }
}

UserForm = withRouter(UserForm);

UserForm = reduxForm({
    form: 'userSaveForm'
})(UserForm);

const mapStateToProps = (state) => {
    const { adminUsers } = state;
    return {
        selectLoading: adminUsers.get('selectLoading'),
        selectUser: adminUsers.get('selectUser'),
        selectUserPref: adminUsers.get('selectUserPref'),
        selectError: adminUsers.get('selectError'),
    };
}

export default connect(mapStateToProps)(UserForm);