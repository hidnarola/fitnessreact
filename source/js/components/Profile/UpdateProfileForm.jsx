import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from "redux-form";
import DatePicker from "react-datepicker";
import {
    WORKOUT_LOCATION_HOME,
    WORKOUT_LOCATION_GYM,
    GOAL_GAIN_MUSCLE,
    GOAL_GAIN_FLEXIBILITY,
    GOAL_LOSE_FAT,
    GOAL_GAIN_STRENGTH,
    GOAL_GAIN_POWER,
    GOAL_INCREASE_ENDURANCE,
    GENDER_MALE,
    GENDER_FEMALE
} from '../../constants/consts';
import { capitalizeFirstLetter, ts } from '../../helpers/funs';
import ReactQuill from 'react-quill';
import {
    getLoggedUserProfileDetailsRequest,
    saveLoggedUserProfileDetailsRequest
} from '../../actions/profile';
import moment from "moment";
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { required } from '../../formValidation/validationRules';
import userFemale from 'img/common/user-female.png';
import userMale from 'img/common/user-male.png';
import home from 'img/common/home.png';
import gym from 'img/common/gym.png';
import ReactTooltip from "react-tooltip";

class UpdateProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
            dob: null,
            [GOAL_GAIN_MUSCLE]: false,
            [GOAL_GAIN_FLEXIBILITY]: false,
            [GOAL_LOSE_FAT]: false,
            [GOAL_GAIN_STRENGTH]: false,
            [GOAL_GAIN_POWER]: false,
            [GOAL_INCREASE_ENDURANCE]: false,
            aboutMe: '',
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ selectActionInit: true });
        dispatch(showPageLoader());
        dispatch(getLoggedUserProfileDetailsRequest());
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="update-profile-details-form col-md-12 no-padding">
                <form id="form1" onSubmit={handleSubmit}>
                    <div className="col-md-6 pull-left">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Profile Settings</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div">
                                            <label>First Name</label>
                                            <Field
                                                id="first_name"
                                                name="first_name"
                                                wrapperClass="input-wrap"
                                                placeholder="First Name"
                                                errorClass="help-block"
                                                type="text"
                                                component={InputField}
                                                validate={[required]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Last Name</label>
                                            <Field
                                                id="last_name"
                                                name="last_name"
                                                wrapperClass="input-wrap"
                                                placeholder="Last Name"
                                                errorClass="help-block"
                                                type="text"
                                                component={InputField}
                                                validate={[required]}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Mobile No.</label>
                                            <Field
                                                id="mobile_no"
                                                name="mobile_no"
                                                wrapperClass="input-wrap"
                                                placeholder="Mobile No."
                                                errorClass="help-block"
                                                type="text"
                                                component={InputField}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Gender</label>
                                            <div className="input-wrap radiobox">
                                                <Field
                                                    id={GENDER_MALE}
                                                    name="gender"
                                                    wrapperClass="radiobox-inr"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(
                                                        <label htmlFor="male" data-tip="Male"><img src={userMale} /></label>
                                                    )}
                                                    value={GENDER_MALE}
                                                />
                                                <Field
                                                    id={GENDER_FEMALE}
                                                    name="gender"
                                                    wrapperClass="radiobox-inr"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(
                                                        <label htmlFor="female" data-tip="Female"><img src={userFemale} /></label>
                                                    )}
                                                    value={GENDER_FEMALE}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Date Of Birth</label>
                                            <Field
                                                id="dob"
                                                name="dob"
                                                wrapperClass="input-wrap"
                                                placeholder="Date Of Birth"
                                                component={DateField}
                                                selectedDate={this.state.dob}
                                                handleChange={this.handleChangeDob}
                                                dateFormat="MM/DD/YYYY"
                                                errorClass="help-block"
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Height</label>
                                            <Field
                                                id="height"
                                                name="height"
                                                wrapperClass="input-wrap weight-wrap"
                                                placeholder="Foot"
                                                errorClass="help-block"
                                                type="number"
                                                component={InputField}
                                                units={(<label>FT</label>)}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-div">
                                            <label>Weight</label>
                                            <Field
                                                id="weight"
                                                name="weight"
                                                wrapperClass="input-wrap weight-wrap"
                                                errorClass="help-block"
                                                type="number"
                                                placeholder="Kg"
                                                component={InputField}
                                                units={(<label>KG</label>)}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pull-left">
                        <div className="white-box pb-0">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Workout Location</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div">
                                            <div className="input-wrap radiobox">
                                                <Field
                                                    id={WORKOUT_LOCATION_HOME}
                                                    name="workout_location"
                                                    wrapperClass="radiobox-inr"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor="home" data-tip="Home"><img src={home} /></label>)}
                                                    value={WORKOUT_LOCATION_HOME}
                                                />
                                                <Field
                                                    id={WORKOUT_LOCATION_GYM}
                                                    name="workout_location"
                                                    wrapperClass="radiobox-inr"
                                                    errorClass="help-block"
                                                    type="radio"
                                                    component={InputField}
                                                    units={(<label htmlFor="gym" data-tip="Gym"><img src={gym} /></label>)}
                                                    value={WORKOUT_LOCATION_GYM}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="white-box pb-0">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Goals</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div row">
                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_GAIN_MUSCLE}
                                                    name={GOAL_GAIN_MUSCLE}
                                                    wrapperClass="pull-left custom_check mb-10"
                                                    component={CheckField}
                                                    checked={this.state[GOAL_GAIN_MUSCLE]}
                                                    handleClick={this.handleCheckClick}
                                                    title={capitalizeFirstLetter(GOAL_GAIN_MUSCLE.replace('_', ' '))}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_GAIN_FLEXIBILITY}
                                                    name={GOAL_GAIN_FLEXIBILITY}
                                                    wrapperClass="pull-left custom_check mb-10"
                                                    component={CheckField}
                                                    checked={this.state[GOAL_GAIN_FLEXIBILITY]}
                                                    handleClick={this.handleCheckClick}
                                                    title={capitalizeFirstLetter(GOAL_GAIN_FLEXIBILITY.replace('_', ' '))}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_LOSE_FAT}
                                                    name={GOAL_LOSE_FAT}
                                                    wrapperClass="pull-left custom_check mb-10"
                                                    component={CheckField}
                                                    checked={this.state[GOAL_LOSE_FAT]}
                                                    handleClick={this.handleCheckClick}
                                                    title={capitalizeFirstLetter(GOAL_LOSE_FAT.replace('_', ' '))}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_GAIN_STRENGTH}
                                                    name={GOAL_GAIN_STRENGTH}
                                                    wrapperClass="pull-left custom_check mb-10"
                                                    component={CheckField}
                                                    checked={this.state[GOAL_GAIN_STRENGTH]}
                                                    handleClick={this.handleCheckClick}
                                                    title={capitalizeFirstLetter(GOAL_GAIN_STRENGTH.replace('_', ' '))}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_GAIN_POWER}
                                                    name={GOAL_GAIN_POWER}
                                                    wrapperClass="pull-left custom_check mb-10"
                                                    component={CheckField}
                                                    checked={this.state[GOAL_GAIN_POWER]}
                                                    handleClick={this.handleCheckClick}
                                                    title={capitalizeFirstLetter(GOAL_GAIN_POWER.replace('_', ' '))}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <Field
                                                    id={GOAL_INCREASE_ENDURANCE}
                                                    name={GOAL_INCREASE_ENDURANCE}
                                                    wrapperClass="pull-left custom_check mb-10"
                                                    component={CheckField}
                                                    checked={this.state[GOAL_INCREASE_ENDURANCE]}
                                                    handleClick={this.handleCheckClick}
                                                    title={capitalizeFirstLetter(GOAL_INCREASE_ENDURANCE.replace('_', ' '))}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="white-box pb-0">
                            <div className="whitebox-head">
                                <h3 className="title-h3">About Me</h3>
                            </div>
                            <div className="stepbox-m personal-dtl no-padding width-100-per">
                                <ul className="">
                                    <li>
                                        <div className="form-div">
                                            <Field
                                                name="about_me"
                                                value={this.state.aboutMe}
                                                handleChange={this.handleChangeTextEditor}
                                                className="editor-min-height-200"
                                                placeholder="About Me"
                                                wrapperClass="width-100-per"
                                                component={EditorField}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
                <ReactTooltip place="top" type="dark" effect="float" />
            </div>
        );
    }

    componentDidUpdate() {
        const {
            selectActionInit,
        } = this.state;
        const {
            loading,
            profile,
            dispatch,
            saveActionInit,
            handleSaveActionFlag,
        } = this.props;
        if (selectActionInit && !loading) {
            this.setState({ selectActionInit: false });
            var dob = null;
            if (profile.dateOfBirth) {
                dob = moment(profile.dateOfBirth);
            }
            this.setState({ dob });
            var formData = {
                first_name: profile.firstName,
                last_name: profile.lastName,
                mobile_no: profile.mobileNumber,
                gender: profile.gender,
                dob: dob,
                height: profile.height,
                weight: profile.weight,
                workout_location: profile.workoutLocation,
                about_me: profile.aboutMe,
            }
            if (profile.goals && profile.goals.length > 0) {
                profile.goals.map((goal, index) => {
                    this.setState({ [goal]: true });
                    formData[goal] = true;
                });
            }
            dispatch(initialize('update_profile_details_form', formData));
            dispatch(hidePageLoader());
        } else if (saveActionInit && !loading) {
            this.setState({ selectActionInit: true });
            dispatch(getLoggedUserProfileDetailsRequest());
            ts('Profile details updated successfully.');
            handleSaveActionFlag(false);
        }
    }


    handleChangeDob = (date) => {
        this.props.change('dob', date);
        this.setState({ dob: date });
    }

    handleCheckClick = (name) => {
        var newState = !this.state[name];
        this.props.change(name, newState);
        this.setState({ [name]: newState });
    }

    handleChangeTextEditor = (editorText) => {
        this.props.change('about_me', editorText);
        this.setState({ aboutMe: editorText });
    }
}

const handleSubmit = (data, dispatch, props) => {
    const { handleSaveActionFlag } = props;
    var userGoalsArr = [];
    var goalsArr = [
        GOAL_GAIN_MUSCLE,
        GOAL_GAIN_FLEXIBILITY,
        GOAL_LOSE_FAT,
        GOAL_GAIN_STRENGTH,
        GOAL_GAIN_POWER,
        GOAL_INCREASE_ENDURANCE,
    ];
    goalsArr.map((goal, i) => {
        if (data[goal]) {
            userGoalsArr.push(goal);
        }
    });
    var formData = {
        firstName: capitalizeFirstLetter(data.first_name),
        lastName: (data.last_name) ? capitalizeFirstLetter(data.last_name) : '',
        mobileNumber: (data.mobile_no) ? data.mobile_no : '',
        gender: (data.gender) ? data.gender : GENDER_MALE,
        dateOfBirth: (data.dob) ? data.dob : '',
        goals: userGoalsArr,
        aboutMe: (data.about_me) ? data.about_me : '',
        height: (data.height) ? data.height : 0,
        weight: (data.weight) ? data.weight : 0,
        workoutLocation: (data.workout_location) ? data.workout_location : WORKOUT_LOCATION_HOME,
    };
    handleSaveActionFlag(true);
    dispatch(showPageLoader());
    dispatch(saveLoggedUserProfileDetailsRequest(formData));
}

UpdateProfileForm = reduxForm({
    form: 'update_profile_details_form',
    onSubmit: (data, dispatch, props) => handleSubmit(data, dispatch, props)
})(UpdateProfileForm)

const mapStateToProps = (state) => {
    const { profile } = state;
    return {
        loading: profile.get('loading'),
        profile: profile.get('profile')
    };
}

export default connect(
    mapStateToProps,
)(UpdateProfileForm);

class InputField extends Component {
    render() {
        const {
            input,
            meta,
            wrapperClass,
            className,
            placeholder,
            errorClass,
            type,
            disabled,
            units,
            id,
        } = this.props;
        return (
            <div
                className={
                    `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
                }
            >
                <input
                    {...input}
                    id={(id) ? id : ''}
                    type={type ? type : 'text'}
                    disabled={disabled ? disabled : false}
                    className={className}
                    placeholder={placeholder}
                />
                {(units) ? units : ''}
                {meta.touched &&
                    ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}

class DateField extends Component {
    render() {
        const {
            meta,
            wrapperClass,
            className,
            placeholder,
            errorClass,
            selectedDate,
            handleChange,
            dateFormat,
        } = this.props;
        return (
            <div className={wrapperClass}>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat={dateFormat ? dateFormat : "MM/DD/YYYY"}
                    className={className}
                    placeholderText={placeholder}
                />
                {meta.touched &&
                    ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}

class CheckField extends Component {
    render() {
        const {
            input,
            wrapperClass,
            title,
            checked,
            handleClick,
        } = this.props;
        return (
            <div className={wrapperClass} onClick={() => handleClick(input.name)}>
                <input
                    {...input}
                    type="checkbox"
                    checked={checked}
                />
                <label>{title}</label>
            </div>
        );
    }
}

class EditorField extends Component {
    render() {
        const {
            input,
            wrapperClass,
            placeholder,
            handleChange,
            className,
        } = this.props;
        return (
            <div className={wrapperClass}>
                <ReactQuill
                    {...input}
                    value={input.value ? input.value : ''}
                    onChange={(content, delta, source, editor) => handleChange(content)}
                    onBlur={(content) => { return content }}
                    placeholder={placeholder}
                    className={className}
                />
            </div>
        );
    }
}