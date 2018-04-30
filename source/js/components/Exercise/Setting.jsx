import React, { Component } from 'react';
import { connect } from "react-redux";
import { reduxForm } from 'redux-form';
import $ from 'jquery';
import 'round-slider/dist/roundslider.min.js';
import { getUserExercisePreferencesRequest, setUserExercisePreferencesExcludeExercise, setUserExercisePreferencesExistingInjuries, setUserExercisePreferencesExcludeExerciseType, setUserExercisePreferencesWorkoutScheduleType, setUserExercisePreferencesTimeSchedule, setUserExercisePreferencesWorkoutIntensity, setUserExercisePreferencesExerciseExperience, saveUserExercisePreferencesRequest } from '../../actions/userExercisePreferences';
import { getUserExerciseTypesRequest } from '../../actions/userExerciseTypes';
import {
    WORKOUT_SCHEDULE_TYPE_MANUAL,
    WORKOUT_SCHEDULE_TYPE_MANUAL_STR,
    WORKOUT_SCHEDULE_TYPE_AUTO,
    WORKOUT_SCHEDULE_TYPE_AUTO_STR
} from '../../constants/consts';
import { getUserExercisesRequest } from '../../actions/userExercises';
import { getUserBodypartsRequest } from '../../actions/userBodyparts';
import Autosuggest from "react-autosuggest";
import _ from "lodash";
import TimePicker from 'rc-time-picker';
import moment from "moment";
import { capitalizeFirstLetter, convertMinsToTime, convertTimeToMins, ts } from '../../helpers/funs';

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
                                <div id="workout-intensity"></div>
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
                                        getSuggestionValue={this.getExistingInjuriesSuggestionValue}
                                        renderSuggestion={this.renderExistingInjuriesSuggestion}
                                        inputProps={{
                                            value: existingInjuriesVal,
                                            placeholder: 'Search Body Parts',
                                            onChange: this.handleExistingInjuriesChange
                                        }}
                                    />
                                    <button type="submit">
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
                                <div id="experience-level"></div>
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
                                        getSuggestionValue={this.getExcludedExerciseSuggestionValue}
                                        renderSuggestion={this.renderExcludeExerciseSuggestion}
                                        inputProps={{
                                            value: excludeExerciseVal,
                                            placeholder: 'Search Exercises',
                                            onChange: this.handleExcludeExerciseChange
                                        }}
                                    />
                                    <button type="submit">
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
                                                />
                                                {/* <div className="selectpicker-wrap vertical-middle-c">
                                                    <select className="selectpicker bg-none">
                                                        <option>00:40</option>
                                                        <option>00:20</option>
                                                        <option>00:20</option>
                                                    </select>
                                                </div> */}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Tuesday</label>
                                                <TimePicker
                                                    value={timeSchedule.tuesday}
                                                    showSecond={false}
                                                    onChange={(val) => this.handleChangeWorkoutScheduleTime(val, 'tuesday')}
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
                                                />
                                                {/* <div className="selectpicker-wrap vertical-middle-c">
                                                    <select className="selectpicker bg-none">
                                                        <option>00:40</option>
                                                        <option>00:20</option>
                                                        <option>00:20</option>
                                                    </select>
                                                </div> */}
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <label className="vertical-align-c">Thursday</label>
                                                <TimePicker
                                                    value={timeSchedule.thursday}
                                                    showSecond={false}
                                                    onChange={(val) => this.handleChangeWorkoutScheduleTime(val, 'thursday')}
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
        $("#workout-intensity").roundSlider({
            value: workoutIntensity,
            radius: 80,
            width: 8,
            handleSize: "+16",
            handleShape: "dot",
            sliderType: "min-range",
            change: (data) => {
                var val = data.value;
                this.setState({ workoutIntensity: val });
                dispatch(setUserExercisePreferencesWorkoutIntensity(val));
            }
        });
        $("#experience-level").roundSlider({
            value: exerciseExperience,
            radius: 80,
            width: 8,
            handleSize: "+16",
            handleShape: "dot",
            sliderType: "min-range",
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
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getExistingInjuriesSuggestions = (value) => {
        const { bodyparts } = this.props;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : bodyparts.filter((lang) =>
            lang.bodypart.toLowerCase().slice(0, inputLength) === inputValue
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

    handleExcludeExerciseChange = (event, { newValue }) => {
        this.setState({
            excludeExerciseVal: newValue
        });
    };

    handleExistingInjuriesChange = (event, { newValue }) => {
        this.setState({
            existingInjuriesVal: newValue
        });
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

    getExcludedExerciseSuggestionValue = (suggestion) => {
        const { excludeExercise } = this.state;
        const { dispatch } = this.props;
        var exercises = excludeExercise;
        var val = suggestion._id;
        var index = _.indexOf(exercises, val);
        if (index < 0) {
            exercises.push(val);
            this.setState({ excludeExercise: exercises });
            dispatch(setUserExercisePreferencesExcludeExercise(exercises));
        }
        return '';
    };

    getExistingInjuriesSuggestionValue = (suggestion) => {
        const { existingInjuries } = this.state;
        const { dispatch } = this.props;
        var injuries = existingInjuries;
        var val = suggestion._id;
        var index = _.indexOf(injuries, val);
        if (index < 0) {
            injuries.push(val);
            this.setState({ existingInjuries: injuries });
            dispatch(setUserExercisePreferencesExistingInjuries(injuries));
        }
        return '';
    };
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