import React, { Component } from 'react';
import { connect } from "react-redux";
import { reduxForm } from 'redux-form';
import $ from 'jquery';
import '../../../assets/js/roundslider.js';
import { getUserExercisePreferencesRequest, setUserExercisePreferencesExcludeExercise, setUserExercisePreferencesExistingInjuries, setUserExercisePreferencesExcludeExerciseType, setUserExercisePreferencesWorkoutScheduleType, setUserExercisePreferencesTimeSchedule, setUserExercisePreferencesWorkoutIntensity, setUserExercisePreferencesExerciseExperience, saveUserExercisePreferencesRequest } from '../../actions/userExercisePreferences';
import { getUserExerciseTypesRequest } from '../../actions/userExerciseTypes';
import {
    WORKOUT_SCHEDULE_TYPE_MANUAL,
    WORKOUT_SCHEDULE_TYPE_MANUAL_STR,
    WORKOUT_SCHEDULE_TYPE_AUTO,
    WORKOUT_SCHEDULE_TYPE_AUTO_STR,
    WORKOUT_INTENSITY_LABEL_EASY,
    WORKOUT_INTENSITY_LABEL_LOW,
    WORKOUT_INTENSITY_LABEL_MODERATE,
    WORKOUT_INTENSITY_LABEL_HARD,
    WORKOUT_INTENSITY_LABEL_MAXIMAL,
    EXPERIENCE_LEVEL_1_LABEL,
    EXPERIENCE_LEVEL_2_LABEL,
    EXPERIENCE_LEVEL_3_LABEL,
    EXPERIENCE_LEVEL_4_LABEL,
    EXPERIENCE_LEVEL_5_LABEL
} from '../../constants/consts';
import { getUserExercisesRequest } from '../../actions/userExercises';
import { getUserBodypartsRequest } from '../../actions/userBodyparts';
import Autosuggest from "react-autosuggest";
import _ from "lodash";
import TimePicker from 'rc-time-picker';
import moment from "moment";
import { capitalizeFirstLetter, convertMinsToTime, convertTimeToMins, ts } from '../../helpers/funs';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader.js';

const defaultTimeSchedule = {
    monday: moment('00:00', 'HH:mm'),
    tuesday: moment('00:00', 'HH:mm'),
    wednesday: moment('00:00', 'HH:mm'),
    thursday: moment('00:00', 'HH:mm'),
    friday: moment('00:00', 'HH:mm'),
    saturday: moment('00:00', 'HH:mm'),
    sunday: moment('00:00', 'HH:mm'),
}

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadDataActionInit: false,
            workoutIntensity: 0,
            exerciseExperience: 0,
            excludeExercise: [],
            excludeExerciseType: [],
            existingInjuries: [],
            workoutscheduletype: 1,
            timeSchedule: Object.assign({}, defaultTimeSchedule),
            excludeExerciseVal: '',
            excludeExerciseSuggestion: [],
            existingInjuriesVal: '',
            existingInjuriesSuggestion: [],
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ loadDataActionInit: true });
        dispatch(showPageLoader());
        dispatch(getUserExerciseTypesRequest());
        dispatch(getUserExercisesRequest());
        dispatch(getUserBodypartsRequest());
        dispatch(getUserExercisePreferencesRequest());
    }

    render() {
        const {
            workoutIntensity,
            exerciseExperience,
            excludeExercise,
            excludeExerciseType,
            existingInjuries,
            workoutscheduletype,
            timeSchedule,
            excludeExerciseVal,
            excludeExerciseSuggestion,
            existingInjuriesVal,
            existingInjuriesSuggestion
        } = this.state;
        const {
            exerciseTypes,
            exercises,
            bodyparts
        } = this.props;
        return (
            <div className="body-content d-flex row justify-content-start profilephoto-content">
                <form className="row width-100-per no-margin">
                    <div className="col-md-4">
                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3 size-14">Workout Intensity</h3>
                            </div>
                            <div className="whitebox-body text-c">
                                <div id="workout-intensity" className="custom-round-slider-1 margin-0-auto"></div>
                            </div>
                        </div>

                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3 size-14">Existing Injuries</h3>
                            </div>
                            <div className="whitebox-body">
                                <div className="exclude-srh d-flex">
                                    <Autosuggest
                                        suggestions={existingInjuriesSuggestion}
                                        onSuggestionsFetchRequested={this.onExistingInjuriesFetch}
                                        onSuggestionsClearRequested={this.onExistingInjuriesClear}
                                        getSuggestionValue={(suggestion) => suggestion}
                                        renderSuggestion={this.renderExistingInjuriesSuggestion}
                                        onSuggestionSelected={this.existingInjurySelected}
                                        inputProps={{
                                            value: existingInjuriesVal,
                                            placeholder: 'Search Body Parts',
                                            onChange: this.handleExistingInjuriesChange
                                        }}
                                    />
                                    <button type="button">
                                        <i className="icon-search"></i>
                                    </button>
                                </div>
                                {existingInjuries && existingInjuries.length > 0 &&
                                    existingInjuries.map((o) => {
                                        var obj = _.find(bodyparts, (bPart) => {
                                            return (bPart._id === o) ? bPart : null;
                                        })
                                        if (obj) {
                                            return (
                                                <div className="restiction-box active" key={obj._id}>
                                                    <h4>{obj.bodypart}</h4>
                                                    <span>
                                                        <a href="javascript:void(0)" onClick={() => this.handleRemoveExistingInjuries(obj._id)}>
                                                            <i className="icon-delete_forever"></i>
                                                        </a>
                                                    </span>
                                                </div>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3 size-14">Experience Level</h3>
                            </div>
                            <div className="whitebox-body text-c">
                                <div id="experience-level" className="custom-round-slider-1 margin-0-auto"></div>
                            </div>
                        </div>

                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3 size-14">Exclude Exercise Type</h3>
                            </div>
                            <div className="whitebox-body">
                                {exerciseTypes && exerciseTypes.length > 0 &&
                                    exerciseTypes.map((o) => {
                                        var index = _.indexOf(excludeExerciseType, o._id);
                                        var isActive = (index >= 0) ? ' active ' : '';
                                        return (
                                            <div className={`restiction-box ${isActive}`} key={o._id}>
                                                <h4>{o.name}</h4>
                                                <span className="bg-pink">
                                                    <a href="javascript:void(0)" onClick={() => this.handleExcludExerciseTypes(o._id)}>
                                                        <i className="icon-block"></i>
                                                    </a>
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3 size-14">Exclude Exercise</h3>
                            </div>
                            <div className="whitebox-body">
                                <div className="exclude-srh d-flex">
                                    <Autosuggest
                                        suggestions={excludeExerciseSuggestion}
                                        onSuggestionsFetchRequested={this.onExcludeExerciseFetch}
                                        onSuggestionsClearRequested={this.onExcludeExerciseClear}
                                        getSuggestionValue={(suggestion) => suggestion}
                                        renderSuggestion={this.renderExcludeExerciseSuggestion}
                                        onSuggestionSelected={this.excludedExerciseSelected}
                                        inputProps={{
                                            value: excludeExerciseVal,
                                            placeholder: 'Search Exercises',
                                            onChange: this.handleExcludeExerciseChange
                                        }}
                                    />
                                    <button type="button">
                                        <i className="icon-search"></i>
                                    </button>
                                </div>
                                {excludeExercise && excludeExercise.length > 0 &&
                                    excludeExercise.map((o) => {
                                        var obj = _.find(exercises, (exe) => {
                                            return (exe._id === o) ? exe : null;
                                        })
                                        if (obj) {
                                            return (
                                                <div className="restiction-box active" key={obj._id}>
                                                    <h4>{obj.name}</h4>
                                                    <span>
                                                        <a href="javascript:void(0)" onClick={() => this.handleRemoveExcludeExercise(obj._id)}>
                                                            <i className="icon-delete_forever"></i>
                                                        </a>
                                                    </span>
                                                </div>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </div>
                        </div>

                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3 size-14">Exclude Exercise</h3>
                            </div>
                            <div className="whitebox-body workout-schedule">
                                <div className="d-flex view-schedule">
                                    <a
                                        href="javascript:void(0)"
                                        className={`${(workoutscheduletype === WORKOUT_SCHEDULE_TYPE_MANUAL) ? 'active' : ''}`}
                                        onClick={() => this.handleChangeWorkoutScheduleType(WORKOUT_SCHEDULE_TYPE_MANUAL)}
                                    >
                                        {WORKOUT_SCHEDULE_TYPE_MANUAL_STR}
                                    </a>
                                    <a
                                        href="javascript:void(0)"
                                        className={`${(workoutscheduletype === WORKOUT_SCHEDULE_TYPE_AUTO) ? 'active' : ''}`}
                                        onClick={() => this.handleChangeWorkoutScheduleType(WORKOUT_SCHEDULE_TYPE_AUTO)}
                                    >
                                        {WORKOUT_SCHEDULE_TYPE_AUTO_STR}
                                    </a>
                                </div>
                                {workoutscheduletype && workoutscheduletype === WORKOUT_SCHEDULE_TYPE_MANUAL &&
                                    <ul className="common-ul">
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Monday</label>
                                                <TimePicker
                                                    value={timeSchedule.monday}
                                                    showSecond={false}
                                                    onChange={(val) => this.handleChangeWorkoutScheduleTime(val, 'monday')}
                                                    disabledHours={() => {
                                                        var hiddenValues = [];
                                                        for (let i = 6; i < 24; i++) {
                                                            hiddenValues.push(i);
                                                        }
                                                        return hiddenValues;
                                                    }}
                                                    hideDisabledOptions
                                                    allowEmpty={false}
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Tuesday</label>
                                                <TimePicker
                                                    value={timeSchedule.tuesday}
                                                    showSecond={false}
                                                    onChange={(val) => this.handleChangeWorkoutScheduleTime(val, 'tuesday')}
                                                    disabledHours={() => {
                                                        var hiddenValues = [];
                                                        for (let i = 6; i < 24; i++) {
                                                            hiddenValues.push(i);
                                                        }
                                                        return hiddenValues;
                                                    }}
                                                    hideDisabledOptions
                                                    allowEmpty={false}
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Wednesday</label>
                                                <TimePicker
                                                    value={timeSchedule.wednesday}
                                                    showSecond={false}
                                                    onChange={(val) => this.handleChangeWorkoutScheduleTime(val, 'wednesday')}
                                                    disabledHours={() => {
                                                        var hiddenValues = [];
                                                        for (let i = 6; i < 24; i++) {
                                                            hiddenValues.push(i);
                                                        }
                                                        return hiddenValues;
                                                    }}
                                                    hideDisabledOptions
                                                    allowEmpty={false}
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Thursday</label>
                                                <TimePicker
                                                    value={timeSchedule.thursday}
                                                    showSecond={false}
                                                    onChange={(val) => this.handleChangeWorkoutScheduleTime(val, 'thursday')}
                                                    disabledHours={() => {
                                                        var hiddenValues = [];
                                                        for (let i = 6; i < 24; i++) {
                                                            hiddenValues.push(i);
                                                        }
                                                        return hiddenValues;
                                                    }}
                                                    hideDisabledOptions
                                                    allowEmpty={false}
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Friday</label>
                                                <TimePicker
                                                    value={timeSchedule.friday}
                                                    showSecond={false}
                                                    onChange={(val) => this.handleChangeWorkoutScheduleTime(val, 'friday')}
                                                    disabledHours={() => {
                                                        var hiddenValues = [];
                                                        for (let i = 6; i < 24; i++) {
                                                            hiddenValues.push(i);
                                                        }
                                                        return hiddenValues;
                                                    }}
                                                    hideDisabledOptions
                                                    allowEmpty={false}
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Saturday</label>
                                                <TimePicker
                                                    value={timeSchedule.saturday}
                                                    showSecond={false}
                                                    onChange={(val) => this.handleChangeWorkoutScheduleTime(val, 'saturday')}
                                                    disabledHours={() => {
                                                        var hiddenValues = [];
                                                        for (let i = 6; i < 24; i++) {
                                                            hiddenValues.push(i);
                                                        }
                                                        return hiddenValues;
                                                    }}
                                                    hideDisabledOptions
                                                    allowEmpty={false}
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Sunday</label>
                                                <TimePicker
                                                    value={timeSchedule.sunday}
                                                    showSecond={false}
                                                    onChange={(val) => this.handleChangeWorkoutScheduleTime(val, 'sunday')}
                                                    disabledHours={() => {
                                                        var hiddenValues = [];
                                                        for (let i = 6; i < 24; i++) {
                                                            hiddenValues.push(i);
                                                        }
                                                        return hiddenValues;
                                                    }}
                                                    hideDisabledOptions
                                                    allowEmpty={false}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                }
                            </div>
                        </div>

                    </div>
                </form>
            </div>

        );
    }

    componentDidMount() {
        const {
            workoutIntensity,
            exerciseExperience,
        } = this.state;
        const { dispatch } = this.props;
        $.fn.roundSlider.prototype._handleDragDistance = 100;
        $("#workout-intensity").roundSlider({
            value: workoutIntensity,
            radius: 110,
            width: 12,
            handleSize: "+16",
            handleShape: "dot",
            sliderType: "min-range",
            editableTooltip: false,
            startAngle: 90,
            value: 0,
            tooltipFormat: (e) => {
                var val = e.value;
                var intensity = '';
                if (val >= 0 && val <= 20) intensity = WORKOUT_INTENSITY_LABEL_EASY;
                else if (val > 20 && val <= 40) intensity = WORKOUT_INTENSITY_LABEL_LOW;
                else if (val > 40 && val <= 60) intensity = WORKOUT_INTENSITY_LABEL_MODERATE;
                else if (val > 60 && val <= 80) intensity = WORKOUT_INTENSITY_LABEL_HARD;
                else intensity = WORKOUT_INTENSITY_LABEL_MAXIMAL;

                return "<div>" + intensity + "<div>";
            },
            change: (data) => {
                var val = data.value;
                this.setState({ workoutIntensity: val });
                dispatch(setUserExercisePreferencesWorkoutIntensity(val));
            }
        });
        $("#experience-level").roundSlider({
            value: exerciseExperience,
            radius: 110,
            width: 12,
            handleSize: "+16",
            handleShape: "dot",
            sliderType: "min-range",
            editableTooltip: false,
            startAngle: 90,
            value: 0,
            tooltipFormat: (e) => {
                var val = e.value;
                var experi = '';
                if (val >= 0 && val <= 20) experi = EXPERIENCE_LEVEL_1_LABEL;
                else if (val > 20 && val <= 40) experi = EXPERIENCE_LEVEL_2_LABEL;
                else if (val > 40 && val <= 60) experi = EXPERIENCE_LEVEL_3_LABEL;
                else if (val > 60 && val <= 80) experi = EXPERIENCE_LEVEL_4_LABEL;
                else experi = EXPERIENCE_LEVEL_5_LABEL;

                return "<div>" + experi + "<div>";
            },
            change: (data) => {
                var val = data.value;
                this.setState({ exerciseExperience: val });
                dispatch(setUserExercisePreferencesExerciseExperience(val));
            }
        });
    }

    componentDidUpdate() {
        const {
            loading,
            workoutIntensity,
            exerciseExperience,
            excludeExercise,
            excludeExerciseType,
            existingInjuries,
            workoutscheduletype,
            timeSchedule,
            setSaveAction,
            saveActionInit,
            dispatch,
            resetActionInit,
            setResetAction,
        } = this.props;
        const { loadDataActionInit } = this.state;
        if (loadDataActionInit && !loading) {
            this.setState({
                loadDataActionInit: false,
                workoutIntensity,
                exerciseExperience,
                excludeExercise,
                excludeExerciseType,
                existingInjuries,
                workoutscheduletype,
                timeSchedule,
            });
            $("#workout-intensity").roundSlider('option', { value: workoutIntensity });
            $("#experience-level").roundSlider('option', { value: exerciseExperience });
            dispatch(hidePageLoader());
        } else if (saveActionInit && !loading) {
            dispatch(getUserExercisePreferencesRequest());
            ts('Preferences saved successfully!');
            this.setState({ loadDataActionInit: true });
            setSaveAction(false);
        } else if (resetActionInit && !loading) {
            dispatch(getUserExercisePreferencesRequest());
            ts('Preferences reset successfully!');
            this.setState({ loadDataActionInit: true });
            setResetAction(false);
        }
    }

    //#region normal funs
    handleRemoveExcludeExercise = (_id) => {
        const { excludeExercise } = this.state;
        const { dispatch } = this.props;
        var exercises = excludeExercise;
        var index = _.indexOf(exercises, _id);
        if (index >= 0) {
            exercises.splice(index, 1);
            this.setState({ excludeExercise: exercises });
            dispatch(setUserExercisePreferencesExcludeExercise(exercises));
        }
    }

    handleRemoveExistingInjuries = (_id) => {
        const { existingInjuries } = this.state;
        const { dispatch } = this.props;
        var injuries = existingInjuries;
        var index = _.indexOf(injuries, _id);
        if (index >= 0) {
            injuries.splice(index, 1);
            this.setState({ existingInjuries: injuries });
            dispatch(setUserExercisePreferencesExistingInjuries(injuries));
        }
    }
    handleExcludExerciseTypes = (_id) => {
        const { excludeExerciseType } = this.state;
        const { dispatch } = this.props;
        var excludeExercises = excludeExerciseType;
        var index = _.indexOf(excludeExercises, _id);
        if (index < 0) {
            excludeExercises.push(_id);
        } else {
            excludeExercises.splice(index, 1);
        }
        this.setState({ excludeExerciseType: excludeExercises });
        dispatch(setUserExercisePreferencesExcludeExerciseType(excludeExercises));
    }

    handleChangeWorkoutScheduleType = (type) => {
        const { dispatch } = this.props;
        this.setState({ workoutscheduletype: type });
        dispatch(setUserExercisePreferencesWorkoutScheduleType(type));
    }

    handleChangeWorkoutScheduleTime = (val, key) => {
        const { timeSchedule } = this.state;
        const { dispatch } = this.props;
        var newTimeSchedule = Object.assign({}, timeSchedule);
        newTimeSchedule[key] = val;
        this.setState({ timeSchedule: newTimeSchedule });
        var sch = Object.assign({}, newTimeSchedule);
        _.forEach(newTimeSchedule, (val, key) => {
            switch (key) {
                case 'monday':
                case 'tuesday':
                case 'wednesday':
                case 'thursday':
                case 'friday':
                case 'saturday':
                case 'sunday':
                    sch[key] = convertTimeToMins(val);
                    break;
            }
        });
        dispatch(setUserExercisePreferencesTimeSchedule(sch));
    }

    //#endregion

    //#region funs Autocomplete 
    getExcludeExerciseSuggestions = (value) => {
        const { exercises } = this.props;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : exercises.filter((lang) =>
            (lang.name.toLowerCase().search(inputValue) >= 0)
        );
    };

    getExistingInjuriesSuggestions = (value) => {
        const { bodyparts } = this.props;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : bodyparts.filter((lang) =>
            (lang.bodypart.toLowerCase().search(inputValue) >= 0)
        );
    };

    onExcludeExerciseFetch = ({ value }) => {
        this.setState({
            excludeExerciseSuggestion: this.getExcludeExerciseSuggestions(value)
        });
    };

    onExcludeExerciseClear = () => {
        this.setState({
            excludeExerciseSuggestion: []
        });
    };

    onExistingInjuriesFetch = ({ value }) => {
        this.setState({
            existingInjuriesSuggestion: this.getExistingInjuriesSuggestions(value)
        });
    };

    onExistingInjuriesClear = () => {
        this.setState({
            existingInjuriesSuggestion: []
        });
    };

    handleExcludeExerciseChange = (event, { newValue, method }) => {
        if (method === 'type') {
            this.setState({
                excludeExerciseVal: newValue
            });
        }
    };

    handleExistingInjuriesChange = (event, { newValue, method }) => {
        if (method === 'type') {
            this.setState({
                existingInjuriesVal: newValue
            });
        }
    };

    renderExcludeExerciseSuggestion = (suggestion) => (
        <div>
            {suggestion.name}
        </div>
    );

    renderExistingInjuriesSuggestion = (suggestion) => (
        <div>
            {suggestion.bodypart}
        </div>
    );

    excludedExerciseSelected = (event, { suggestion }) => {
        const { excludeExercise } = this.state;
        const { dispatch } = this.props;
        var exercises = excludeExercise;
        var val = suggestion._id;
        var index = _.indexOf(exercises, val);
        if (index < 0) {
            exercises.push(val);
            this.setState({ excludeExercise: exercises, excludeExerciseVal: '' });
            dispatch(setUserExercisePreferencesExcludeExercise(exercises));
        }
    };

    existingInjurySelected = (event, { suggestion }) => {
        const { existingInjuries } = this.state;
        const { dispatch } = this.props;
        var injuries = existingInjuries;
        var val = suggestion._id;
        var index = _.indexOf(injuries, val);
        if (index < 0) {
            injuries.push(val);
            this.setState({ existingInjuries: injuries, existingInjuriesVal: '' });
            dispatch(setUserExercisePreferencesExistingInjuries(injuries));
        }
    }
    //#endregion
}

const handleSubmit = (data, dispatch, props) => {
    var sch = Object.assign({}, props.timeSchedule);
    _.forEach(props.timeSchedule, (val, key) => {
        switch (key) {
            case 'monday':
            case 'tuesday':
            case 'wednesday':
            case 'thursday':
            case 'friday':
            case 'saturday':
            case 'sunday':
                sch[key] = convertTimeToMins(val);
                break;
        }
    });
    let requestData = {
        workoutIntensity: props.workoutIntensity,
        exerciseExperience: props.exerciseExperience,
        excludeExercise: props.excludeExercise,
        excludeExerciseType: props.excludeExerciseType,
        existingInjuries: props.existingInjuries,
        workoutscheduletype: props.workoutscheduletype,
        timeSchedule: sch,
    }
    props.setSaveAction(true);
    dispatch(saveUserExercisePreferencesRequest(requestData));
}

const mapStateToProps = (state) => {
    const {
        userExercisePreferences,
        userExerciseTypes,
        userExercises,
        userBodyparts,
    } = state;
    var timeSchedule = userExercisePreferences.get('timeSchedule');
    var sch = {};
    if (timeSchedule && Object.keys(timeSchedule).length > 0) {
        sch = Object.assign({}, timeSchedule);
        _.forEach(timeSchedule, (val, key) => {
            switch (key) {
                case 'monday':
                case 'tuesday':
                case 'wednesday':
                case 'thursday':
                case 'friday':
                case 'saturday':
                case 'sunday':
                    sch[key] = convertMinsToTime(val);
                    break;
            }
        });
    } else {
        sch = Object.assign({}, defaultTimeSchedule);
    }
    return {
        loading: userExercisePreferences.get('loading'),
        error: userExercisePreferences.get('error'),
        workoutIntensity: userExercisePreferences.get('workoutIntensity'),
        exerciseExperience: userExercisePreferences.get('exerciseExperience'),
        excludeExercise: userExercisePreferences.get('excludeExercise'),
        excludeExerciseType: userExercisePreferences.get('excludeExerciseType'),
        existingInjuries: userExercisePreferences.get('existingInjuries'),
        workoutscheduletype: userExercisePreferences.get('workoutscheduletype'),
        timeSchedule: sch,
        exerciseTypes: userExerciseTypes.get('exerciseTypes'),
        bodyparts: userBodyparts.get('bodyparts'),
        exercises: userExercises.get('exercises'),
    }
}

Setting = reduxForm({
    form: 'userExercisePreferencesForm',
    onSubmit: (data, dispatch, props) => handleSubmit(data, dispatch, props)
})(Setting);

export default connect(mapStateToProps)(Setting);