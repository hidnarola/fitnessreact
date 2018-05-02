import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import $ from "jquery";
import _ from "lodash";
import 'jquery-ui-slider/jquery-ui.js'
import TimePicker from 'rc-time-picker';
import { DAY_DRIVE_BREAKFAST, DAY_DRIVE_LUNCH, DAY_DRIVE_DINNER, DAY_DRIVE_SNACKS } from '../../constants/consts';
import moment from "moment";
import { getUserNutritionPreferencesRequest, saveUserNutritionPreferencesRequest, resetUserNutritionPreferencesRequest } from '../../actions/userNutritionPreferences';
import { getDietLabelsRequest } from '../../actions/dietLabels';
import { getHealthLabelsRequest } from '../../actions/healthLabels';
import { convertMinsToTime, capitalizeFirstLetter, convertTimeToMins, ts } from '../../helpers/funs';
import { getNutritionsRequest } from '../../actions/nutritions';
import NutritionTrackModal from './NutritionTrackModal';
import ResetConfirmation from '../Admin/Common/ResetConfirmation';

const defaultRecipeTime = [
    {
        time: moment('00:00', 'HH:mm'),
        dayDrive: DAY_DRIVE_BREAKFAST,
    },
    {
        time: moment('00:00', 'HH:mm'),
        dayDrive: DAY_DRIVE_LUNCH,
    },
    {
        time: moment('00:00', 'HH:mm'),
        dayDrive: DAY_DRIVE_DINNER,
    },
    {
        time: moment('00:00', 'HH:mm'),
        dayDrive: DAY_DRIVE_SNACKS,
    },
]

class NutritionPreferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadDataActionInit: false,
            saveActionInit: false,
            resetActionInit: false,
            nutritionTargets: [],
            maxRecipeTime: defaultRecipeTime,
            healthRestrictionLabels: [],
            dietRestrictionLabels: [],
            excludeIngredients: [],
            excludeIngredientVal: '',
            nutritionTrackList: [],
            showNutritionTrackModal: false,
            showResetModal: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ loadDataActionInit: true });
        dispatch(getNutritionsRequest());
        dispatch(getDietLabelsRequest());
        dispatch(getHealthLabelsRequest());
        dispatch(getUserNutritionPreferencesRequest());
    }

    render() {
        const {
            nutritionTargets,
            maxRecipeTime,
            healthRestrictionLabels,
            dietRestrictionLabels,
            excludeIngredients,
            excludeIngredientVal,
            nutritionTrackList,
            showNutritionTrackModal,
            showResetModal,
        } = this.state;
        const {
            healthLabels,
            dietLabels,
            nutritions,
        } = this.props;
        return (
            <div className="fitness-nutrition">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Nutrition Preferences</h2>
                            <p>Each fitness test feeds directly into our algorithm - every test is used to identify the most efficient and effective
                                structure of your training plan. Each test is designed to identify imbalances and weaknesses that may lead
                                to increased risk of injury or decreased performance - now and in the future. This may also allow us to identify
                                opportunities for rapid improvement.</p>
                        </div>
                        <div className="body-head-r">
                            <a href="javascript:void(0)" className="white-btn" onClick={this.handleShowResetModal}>Reset
                                <i className="icon-print"></i>
                            </a>
                            <a href="javascript:void(0)" className="green-blue-btn" onClick={this.handleSave}>Update
                                <i className="icon-control_point"></i>
                            </a>
                        </div>
                    </div>

                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-8">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head d-flex">
                                    <h3 className="title-h3 size-14">Edit Your Nutrition Targets</h3>
                                    <div className="whitebox-head-r nutrition-track">
                                        Add a nutrition to track
                                        <a href="javascript:void(0)" className="pink-btn" onClick={this.handleShowNutritionTrackModal}>
                                            <i className="icon-control_point"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="whitebox-body nutrition-target">
                                    <ul className="common-ul">
                                        {nutritionTargets && nutritionTargets.length > 0 &&
                                            nutritionTargets.map((obj, key) => {
                                                var pref = _.find(nutritions, (o, index) => {
                                                    return (obj._id === o._id);
                                                });
                                                if (pref) {
                                                    return (
                                                        <li key={pref._id}>
                                                            <div className="grey-white">
                                                                <h6>
                                                                    <big>{pref.name}</big>
                                                                    <small>{pref.unit}</small>
                                                                </h6>
                                                                <div className="target-process">
                                                                    <div className="slider-range width-100-per" id={pref._id}>
                                                                        <div id={`custom-handle-${pref._id}-start`} className="ui-slider-handle"></div>
                                                                        <div id={`custom-handle-${pref._id}-end`} className="ui-slider-handle"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                                return null;
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div className="white-box dietary-restictions">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Health Restictions</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="row d-flex">
                                        {healthLabels && healthLabels.length > 0 &&
                                            healthLabels.map((obj) => {
                                                var index = _.indexOf(healthRestrictionLabels, obj._id);
                                                var active = (index >= 0) ? ' active ' : '';
                                                return (
                                                    <div className="col-md-6" key={obj._id}>
                                                        <div className={`restiction-box ${active}`}>
                                                            <h4>{obj.label}</h4>
                                                            <span className="bg-green-blue">
                                                                <a href="javascript:void(0)" onClick={() => this.handleLabelRestrictions('health', obj._id)}>
                                                                    <i className="icon-check"></i>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="white-box maximum-recipe space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Maximum Recipe Time</h3>
                                </div>
                                <div className="whitebox-body">
                                    <ul className="common-ul">
                                        {maxRecipeTime && maxRecipeTime.length > 0 &&
                                            maxRecipeTime.map((obj, key) => {
                                                return (
                                                    <li key={key}>
                                                        <div className="grey-white">
                                                            <label className="vertical-middle-c">{capitalizeFirstLetter(obj.dayDrive)}</label>
                                                            <TimePicker
                                                                value={obj.time}
                                                                showSecond={false}
                                                                onChange={(val) => this.handleChangeRecipeTime(val, key)}
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
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div className="white-box dietary-restictions space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Dietary Restictions</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="row d-flex">
                                        {dietLabels && dietLabels.length > 0 &&
                                            dietLabels.map((obj) => {
                                                var index = _.indexOf(dietRestrictionLabels, obj._id);
                                                var active = (index >= 0) ? ' active ' : '';
                                                return (
                                                    <div className="col-md-12" key={obj._id}>
                                                        <div className={`restiction-box ${active}`}>
                                                            <h4>{obj.label}</h4>
                                                            <span className="bg-green-blue">
                                                                <a href="javascript:void(0)" onClick={() => this.handleLabelRestrictions('diet', obj._id)}>
                                                                    <i className="icon-check"></i>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="white-box maximum-recipe">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Exclude Ingredient</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="ingredient-srh d-flex">
                                        <input
                                            type="text"
                                            value={excludeIngredientVal}
                                            onChange={(e) => this.setState({ excludeIngredientVal: e.target.value })}
                                            id="exclude_ingredient"
                                            name="exclude_ingredient"
                                            placeholder="Start typing ingredient…"
                                        />
                                        <button type="button" onClick={this.handleAddExcludeIngredient}>
                                            <i className="icon-add"></i>
                                        </button>
                                    </div>
                                    {excludeIngredients && excludeIngredients.length > 0 &&
                                        excludeIngredients.map((val, index) => {
                                            return (
                                                <div className="exclude-box" key={index}>
                                                    <h5>{val}</h5>
                                                    <h6>
                                                        <i className="icon-close" onClick={() => this.handleRemoveExcludedIngredient(index)}></i>
                                                    </h6>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <NutritionTrackModal
                        show={showNutritionTrackModal}
                        nutritions={nutritions}
                        nutritionTrackList={nutritionTrackList}
                        handleYes={this.handleNutritionModalYes}
                        handleClose={this.handleNutritionModalClose}
                        handleNutritionTrackSelect={this.handleNutritionTrackSelect}
                    />

                    <ResetConfirmation
                        show={showResetModal}
                        handleClose={this.closeResetModal}
                        handleYes={this.handleReset}
                    />

                </section>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            loadDataActionInit,
            saveActionInit,
            resetActionInit,
        } = this.state;
        const {
            loading,
            dietRestrictionLabels,
            excludeIngredients,
            healthRestrictionLabels,
            maxRecipeTime,
            nutritionTargets,
            nutritions,
            dispatch,
        } = this.props;
        if (loadDataActionInit && !loading) {
            var recTime = maxRecipeTime;
            _.forEach(recTime, (obj, index) => {
                switch (obj.dayDrive) {
                    case DAY_DRIVE_BREAKFAST:
                    case DAY_DRIVE_LUNCH:
                    case DAY_DRIVE_DINNER:
                    case DAY_DRIVE_SNACKS:
                        var time = convertMinsToTime(obj.time);
                        obj.time = time;
                        break;
                }
            });
            this.setState({
                loadDataActionInit: false,
                nutritionTargets: (nutritionTargets) ? nutritionTargets : [],
                maxRecipeTime: recTime,
                excludeIngredients: (excludeIngredients) ? excludeIngredients : [],
                healthRestrictionLabels: (healthRestrictionLabels) ? healthRestrictionLabels : [],
                dietRestrictionLabels: (dietRestrictionLabels) ? dietRestrictionLabels : [],
            }, () => {
                _.forEach(this.state.nutritionTargets, (o) => {
                    var nutri = _.find(nutritions, (n) => {
                        return (n._id === o._id);
                    });
                    $(`#${o._id}`).slider({
                        range: true,
                        slide: this.handleSlideChange,
                        values: [o.start, o.end],
                        create: this.createCustomHandle,
                        min: (nutri && nutri.min) ? nutri.min : 0,
                        max: (nutri && nutri.max) ? nutri.max : 100,
                        step: (nutri && nutri.step) ? nutri.step : 1,
                    });
                });
            });
        } else if (saveActionInit && !loading) {
            this.setState({
                saveActionInit: false,
                loadDataActionInit: true
            });
            ts('Nutrition preferences saved successfully!');
            dispatch(getUserNutritionPreferencesRequest());
        } else if (resetActionInit && !loading) {
            this.setState({
                resetActionInit: false,
                loadDataActionInit: true
            });
            this.closeResetModal();
            ts('Nutrition preferences reset successfully!');
            dispatch(getUserNutritionPreferencesRequest());
        }
    }

    //#region Common funs
    handleAddExcludeIngredient = () => {
        const { excludeIngredientVal, excludeIngredients } = this.state;
        if (excludeIngredientVal.trim() !== '') {
            var newExcludeIngredient = excludeIngredients;
            newExcludeIngredient.push(excludeIngredientVal);
            this.setState({
                excludeIngredientVal: '',
                excludeIngredients: newExcludeIngredient
            });
        }
    }

    handleRemoveExcludedIngredient = (index) => {
        const { excludeIngredients } = this.state;
        var newExcludeIngredient = excludeIngredients;
        newExcludeIngredient.splice(index, 1);
        this.setState({
            excludeIngredients: newExcludeIngredient
        });
    }

    handleChangeRecipeTime = (val, index) => {
        const { maxRecipeTime } = this.state;
        var newTime = maxRecipeTime;
        newTime[index].time = val;
        this.setState({ maxRecipeTime: newTime });
    }

    handleLabelRestrictions = (type, _id) => {
        if (type === 'health') {
            const { healthRestrictionLabels } = this.state;
            var newHealthRestrictionLabels = healthRestrictionLabels;
            var index = _.indexOf(newHealthRestrictionLabels, _id);
            if (index < 0) {
                newHealthRestrictionLabels.push(_id);
            } else {
                newHealthRestrictionLabels.splice(index, 1);
            }
            this.setState({ healthRestrictionLabels: newHealthRestrictionLabels });
        } else if (type === 'diet') {
            const { dietRestrictionLabels } = this.state;
            var newDietRestrictionLabels = dietRestrictionLabels;
            var index = _.indexOf(newDietRestrictionLabels, _id);
            if (index < 0) {
                newDietRestrictionLabels.push(_id);
            } else {
                newDietRestrictionLabels.splice(index, 1);
            }
            this.setState({ dietRestrictionLabels: newDietRestrictionLabels });
        }
    }

    handleShowNutritionTrackModal = () => {
        const { nutritionTargets } = this.state;
        var trackList = [];
        _.forEach(nutritionTargets, (o) => {
            trackList.push(o._id);
        });
        this.setState({
            showNutritionTrackModal: true,
            nutritionTrackList: trackList,
        });
    }

    handleNutritionModalYes = () => {
        const { nutritions } = this.props;
        const { nutritionTargets, nutritionTrackList } = this.state;
        var newNutritionTargets = [];
        _.forEach(nutritions, (obj) => {
            var index = _.indexOf(nutritionTrackList, obj._id);
            if (index >= 0) {
                var oldNutri = _.find(nutritionTargets, (o) => {
                    return (o._id === obj._id);
                });
                var newNutri = {};
                if (oldNutri) {
                    newNutri = oldNutri;
                } else {
                    newNutri = { start: 0, end: 0, _id: obj._id };
                }
                newNutritionTargets.push(newNutri);
            }
        });
        this.setState({
            nutritionTargets: newNutritionTargets
        }, () => {
            _.forEach(this.state.nutritionTargets, (o) => {
                var nutri = _.find(nutritions, (n) => {
                    return (n._id === o._id);
                });
                $(`#${o._id}`).slider({
                    range: true,
                    slide: this.handleSlideChange,
                    values: [o.start, o.end],
                    create: this.createCustomHandle,
                    min: (nutri && nutri.min) ? nutri.min : 0,
                    max: (nutri && nutri.max) ? nutri.max : 100,
                    step: (nutri && nutri.step) ? nutri.step : 1,
                });
            });
        });
        this.handleNutritionModalClose();
    }

    handleNutritionModalClose = () => {
        this.setState({
            showNutritionTrackModal: false,
            nutritionTrackList: [],
        });
    }

    handleNutritionTrackSelect = (e) => {
        const { nutritionTrackList } = this.state;
        var val = e.target.value;
        var list = nutritionTrackList;
        var index = _.indexOf(list, val);
        if (index < 0) {
            list.push(val);
        } else {
            list.splice(index, 1);
        }
        this.setState({ nutritionTrackList: list });
    }

    handleSlideChange = (e, ui) => {
        const { nutritionTargets } = this.state;
        var id = e.target.id;
        var start = ui.values[0];
        var end = ui.values[1];
        var newNutritionTargets = nutritionTargets;
        _.forEach(newNutritionTargets, (obj) => {
            if (obj._id === id) {
                obj.start = start;
                obj.end = end;
            }
        });
        this.setState({ nutritionTargets: newNutritionTargets });
        var handleStart = $(`#custom-handle-${id}-start`);
        var handleEnd = $(`#custom-handle-${id}-end`);
        handleStart.text(start);
        handleEnd.text(end);
    }

    createCustomHandle = (e, ui) => {
        var handleStart = $(`#custom-handle-${e.target.id}-start`);
        var handleEnd = $(`#custom-handle-${e.target.id}-end`);
        var sliderValues = $(`#${e.target.id}`).slider('values');
        handleStart.text(sliderValues[0]);
        handleEnd.text(sliderValues[1]);
    }

    handleSave = () => {
        const { dispatch } = this.props;
        const {
            nutritionTargets,
            maxRecipeTime,
            healthRestrictionLabels,
            dietRestrictionLabels,
            excludeIngredients,
        } = this.state;
        var recMins = [];
        _.forEach(maxRecipeTime, (obj, index) => {
            switch (obj.dayDrive) {
                case DAY_DRIVE_BREAKFAST:
                case DAY_DRIVE_LUNCH:
                case DAY_DRIVE_DINNER:
                case DAY_DRIVE_SNACKS:
                    var time = convertTimeToMins(obj.time);
                    var newObj = Object.assign({}, obj);
                    newObj.time = time;
                    recMins.push(newObj);
                    break;
            }
        });
        this.setState({ saveActionInit: true });
        var requestData = {
            dietRestrictionLabels: dietRestrictionLabels,
            healthRestrictionLabels: healthRestrictionLabels,
            excludeIngredients: excludeIngredients,
            maxRecipeTime: recMins,
            nutritionTargets: nutritionTargets,
        }
        dispatch(saveUserNutritionPreferencesRequest(requestData));
    }

    handleReset = () => {
        const { dispatch } = this.props;
        this.setState({ resetActionInit: true });
        dispatch(resetUserNutritionPreferencesRequest());
    }

    handleShowResetModal = () => {
        this.setState({ showResetModal: true });
    }

    closeResetModal = () => {
        this.setState({ showResetModal: false });
    }
    //#endregion
}

const mapStateToProps = (state) => {
    const { healthLabels, dietLabels, userNutritionPreferences, nutritions } = state;
    return {
        loading: userNutritionPreferences.get('loading'),
        dietRestrictionLabels: userNutritionPreferences.get('dietRestrictionLabels'),
        excludeIngredients: userNutritionPreferences.get('excludeIngredients'),
        healthRestrictionLabels: userNutritionPreferences.get('healthRestrictionLabels'),
        maxRecipeTime: userNutritionPreferences.get('maxRecipeTime'),
        nutritionTargets: userNutritionPreferences.get('nutritionTargets'),
        healthLabels: healthLabels.get('healthLabels'),
        dietLabels: dietLabels.get('dietLabels'),
        nutritions: nutritions.get('nutritions')
    }
}

export default connect(mapStateToProps)(NutritionPreferences);