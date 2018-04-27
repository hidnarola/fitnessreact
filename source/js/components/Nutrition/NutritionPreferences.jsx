import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import $ from "jquery";
import 'jquery-ui-slider/jquery-ui.js'
import TimePicker from 'rc-time-picker';
import { DAY_DRIVE_BREAKFAST, DAY_DRIVE_LUNCH, DAY_DRIVE_DINNER, DAY_DRIVE_SNACKS } from '../../constants/consts';
import moment from "moment";

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
            excludeIngredients: [],
            excludeIngredientVal: '',
            maxRecipeTime: defaultRecipeTime,
        }
    }

    render() {
        const {
            excludeIngredientVal,
            excludeIngredients,
            maxRecipeTime
        } = this.state;
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
                            <a href="" className="white-btn">Reset
                                <i className="icon-print"></i>
                            </a>
                            <a href="" className="green-blue-btn">Update
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
                                        <a href="" className="pink-btn">
                                            <i className="icon-control_point"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="whitebox-body nutrition-target">
                                    <ul className="common-ul">
                                        <li>
                                            <div className="grey-white">
                                                <h6>
                                                    <big>Calories</big>
                                                    <small>Kcal</small>
                                                </h6>
                                                <div className="target-process">
                                                    <div id="slider-range" className="width-100-per"></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <h6>
                                                    <big>Protein</big>
                                                    <small>Grams</small>
                                                </h6>
                                                <div className="target-process"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <h6>
                                                    <big>Fat</big>
                                                    <small>Grams</small>
                                                </h6>
                                                <div className="target-process"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grey-white">
                                                <h6>
                                                    <big>Carbs</big>
                                                    <small>Grams</small>
                                                </h6>
                                                <div className="target-process"></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="white-box dietary-restictions">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Dietary Restictions</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="row d-flex">
                                        <div className="col-md-6">
                                            <div className="restiction-box active">
                                                <h4>Vegetrain</h4>
                                                <span className="bg-green-blue">
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Coeliac</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Vegan</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Dairy-Free</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Paleo</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Kosher</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Pescaterian</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="restiction-box">
                                                <h4>Islam</h4>
                                                <span>
                                                    <i className="icon-check"></i>
                                                </span>
                                            </div>
                                        </div>
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
                                                            <label className="vertical-middle-c">Breakfast</label>
                                                            <TimePicker
                                                                value={obj.time}
                                                                showSecond={false}
                                                                onChange={(val) => this.handleChangeRecipeTime(val, key)}
                                                            />
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div className="white-box maximum-recipe">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14">Eclude Ingredient</h3>
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
                </section>
            </div>
        );
    }

    componentDidMount() {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
        });
    }

    //#region Common funs
    handleAddExcludeIngredient = () => {
        const { excludeIngredientVal, excludeIngredients } = this.state;
        var newExcludeIngredient = excludeIngredients;
        newExcludeIngredient.push(excludeIngredientVal);
        this.setState({
            excludeIngredientVal: '',
            excludeIngredients: newExcludeIngredient
        });
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
    //#endregion

}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(NutritionPreferences);