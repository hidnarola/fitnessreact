import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { getUserNutritionPreferencesRequest } from '../../actions/userNutritionPreferences';
import { getHealthLabelsRequest } from '../../actions/healthLabels';
import { getDietLabelsRequest } from '../../actions/dietLabels';
import { getNutritionsRequest } from '../../actions/nutritions';
import { getIngridientsRequest, handleChangeIngridientsSearchFor } from '../../actions/new_nutrition';

import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import WorkoutSelectField_ReactSelect from '../ScheduleWorkout/WorkoutSelectField_ReactSelect';
import FaSearch from 'react-icons/lib/fa/search';
import FaSpinner from 'react-icons/lib/fa/spinner';

import cns from "classnames";
import _ from "lodash";
import Autosuggest from "react-autosuggest";
import {
    RECIPE_API_SEARCH_URL,
    DAY_DRIVE_BREAKFAST,
    DAY_DRIVE_PRE_LUNCH_SNACKS,
    DAY_DRIVE_LUNCH,
    DAY_DRIVE_POST_LUNCH_SNACKS,
    DAY_DRIVE_DINNER,
    MEAL_OPTIONS,
    MEAL_VISIBILITY
} from '../../constants/consts';
import { searchRecipesApiRequest, addUserRecipeRequest } from '../../actions/userNutritions';
import noImg from 'img/common/no-img.png'
import noProfileImg from 'img/common/no-profile-img.png';

import InfiniteScroll from 'react-infinite-scroller';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import NutritionMealAddSearchForm from './NutritionMealAddSearchForm';
import NutritionSearchRecipeDetailsModal from './NutritionSearchRecipeDetailsModal';
import {
    DropdownButton,
    ButtonToolbar,
    MenuItem
} from "react-bootstrap";
import moment from "moment";
import { ts, te, checkImageMagicCode } from '../../helpers/funs';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../../constants/routes';
import { FaCircleONotch } from "react-icons/lib/fa";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { required, minLength, maxLength, requiredReactSelect } from '../../formValidation/validationRules';
import AddMetaDescription from '../../components/global/AddMetaDescription';
import Dropzone from "react-dropzone";
import {
    FileField_Dropzone_Single,
} from '../../helpers/FormControlHelper';
const dayDriveOptions = [
    { value: DAY_DRIVE_BREAKFAST, label: 'Breakfast' },
    { value: DAY_DRIVE_PRE_LUNCH_SNACKS, label: 'Pre Lunch Snacks' },
    { value: DAY_DRIVE_LUNCH, label: 'Lunch' },
    { value: DAY_DRIVE_POST_LUNCH_SNACKS, label: 'Post Lunch Snacks' },
    { value: DAY_DRIVE_DINNER, label: 'Dinner' },
]
import Star from "svg/star.svg";
import { FILTER_BODY_PARTS_SUCCESS } from '../../actions/admin/bodyParts';

class NutritionMealAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            noImageError: null,
            invalidImage: [],
            cuurentTab: '#Ingredients',
            isPublic: false,
            ingredient_list: [
                { count: 1, foodname: "temp", value: 2.5, "unit": "g/unit/cup/tsp/tbsp" },
                { count: 4, foodname: "temp1", value: 1.5, "unit": "g/unit/cup/tsp/tbsp" }
            ],
            searchSuggestions: [],
            searchIsLoading: false,
            showSearchLoader: false,
            meal_ingredient: []
        }
        this.searchDebounce = _.debounce(this.searchUsers, 1000);
    }
    render() {
        const {
            handleSubmit,
            searchValue
        } = this.props;
        const {
            images,
            noImageError,
            invalidImage,
            ingredient_list,
            searchSuggestions,
            showSearchLoader,
            meal_ingredient
        } = this.state;
        let dropzoneRef;
        var loggedUserImage = '';
        return (
            <form onSubmit={handleSubmit}>
                <div className="body-content d-flex row justify-content-start nutrition-meal-add-wrapper add-receipy">
                    <div className="col-md-3">
                        <div className="white-box">
                            <div className="whitebox-head d-flex profile-head">
                                <h3 className="title-h3"> Details </h3>
                            </div>
                            <Field
                                name="Title"
                                className="form-control"
                                wrapperClass="form-group"
                                placeholder="Add a title"
                                component={InputField}
                                errorClass="help-block"
                                validate={[required]}
                            />
                            <Field
                                name="dropdown-meals-type"
                                wrapperClass="form-group"
                                placeholder="select meals"
                                component={WorkoutSelectField_ReactSelect}
                                options={MEAL_OPTIONS}
                                validate={[requiredReactSelect]}
                                errorClass="help-block"
                            />
                            {document.getElementById('react-select-3--value-item') && console.log("==>", document.getElementById('react-select-3--value-item').innerText)}
                            <Field
                                name="dropdown-meals-visibility"
                                wrapperClass="form-group"
                                placeholder="Meal visibility"
                                component={WorkoutSelectField_ReactSelect}
                                options={MEAL_VISIBILITY}
                                validate={[requiredReactSelect]}
                                errorClass="help-block"
                            />

                            <div className="add-log d-flex add-log_change">
                                <button type="submit" className="ml-auto">Save Log <i className="icon-control_point"></i></button>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="tabs">
                            <div className={this.state.cuurentTab === "#Ingredients" ? "tab active" : "tab "} id="Ingredients">
                                <a onClick={(e) => { this.setState({ cuurentTab: '#Ingredients' }) }} href="#Ingredients">Ingredients</a>
                            </div>

                            <div className={this.state.cuurentTab === "#Photos" ? "tab active" : "tab"} id="Photos">
                                <a onClick={(e) => { this.setState({ cuurentTab: '#Photos' }) }} href="#Photos">Photos</a>
                            </div>

                            <div className={this.state.cuurentTab === "#Instruction" ? "tab active" : "tab"} id="Instruction">
                                <a onClick={(e) => { this.setState({ cuurentTab: "#Instruction" }) }} href="#Instruction">Instruction</a>
                            </div>

                            <div className={this.state.cuurentTab === "#Notes" ? "tab  active" : "tab"} id="Notes">
                                <a onClick={(e) => { this.setState({ cuurentTab: "#Notes" }) }} href="#Notes">Notes</a>
                            </div>


                            <div className={"tab-content"}>
                                {this.state.cuurentTab === "#Ingredients" &&
                                    <div className={this.state.cuurentTab === "#Ingredients" ? "content active" : "content"} id="Ingredients">
                                        Content of Ingredients
                                        {/* <div className="search search_Cstm">
                                            
                                            <Field
                                                name="search_term"
                                                className="form-control"
                                                placeholder="Search Meal"   
                                                component={InputField}
                                                errorClass="help-block"
                                            />
                                        </div> */}

                                        <div id="search-header" className="search meal-search">
                                            <div className="search-form header-search-form">
                                                <span className="search-icon">
                                                    <FaSearch size={22} />
                                                </span>
                                                <Autosuggest
                                                    suggestions={searchSuggestions}
                                                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                                                    getSuggestionValue={(value) => this.getSuggestionValue(value)}
                                                    renderSuggestion={this.renderSearchSuggestion}
                                                    inputProps={{
                                                        id: 'header_search_users',
                                                        name: 'header_search_users',
                                                        value: searchValue,
                                                        onChange: this.handleSearchChange,
                                                        placeholder: 'Search Ingredient',
                                                    }}
                                                />
                                                {showSearchLoader &&
                                                    <span className="loader-icon">
                                                        <FaSpinner size={22} className="loader-spinner" />
                                                    </span>
                                                }
                                            </div>
                                        </div>

                                        {/* {console.log('searchSuggestions => ', searchSuggestions)}
                                        {searchSuggestions && searchSuggestions.length > 0 && searchSuggestions.map((v, id) =>
                                            <div key={id}>
                                                <p> Count : {v.count} </p>
                                                <p> Name: {v.foodName} </p>
                                                <p> Value : 2.5 </p>
                                                <p> Unit: g/unit/cup/tbsp/tsp</p>
                                            </div>
                                        ) */}
                                        {meal_ingredient && meal_ingredient.length > 0 && meal_ingredient.map((v, id) =>
                                            <div key={id} className="box_wrap_one">
                                                <div className="head_wrap">
                                                    <h2>{v.foodName}</h2>
                                                    <div className="p_serve">
                                                        <p>Serving Size:</p>
                                                        <Field
                                                            name={"serving-input" + id}
                                                            className="form-control serving-input"
                                                            wrapperClass=""
                                                            placeholder="100.00"
                                                            component={InputField}
                                                            errorClass="help-block"
                                                            validate={[required]}
                                                            onChange={(e, value) => this.changeServing(id, v, value, null, null)}
                                                        />
                                                        <Field
                                                            name={"dropdown-ingredient-unit" + id}
                                                            wrapperClass="form_drop_cstm"
                                                            placeholder="unit"
                                                            component={WorkoutSelectField_ReactSelect}
                                                            options={this.ingredientUnit(v)}
                                                            validate={[requiredReactSelect]}
                                                            errorClass="help-block"
                                                            onChange={(e, value) => this.changeServing(id, v, null, value.value, null)}
                                                        />

                                                        <p>  Count:</p>
                                                        <Field
                                                            name={"serving-unit" + id}
                                                            className="form-control serving-input"
                                                            wrapperClass=""
                                                            placeholder="1"
                                                            component={InputField}
                                                            errorClass="help-block"
                                                            validate={[required]}
                                                            onChange={(e, value) => this.changeServing(id, v, null, null, value)}
                                                        />
                                                    </div>
                                                    {/* <span className="star_one">
                                                        <Star />
                                                    </span> */}
                                                    <button type="button" className="timline-post-del-btn" onClick={(e) => this.removeFromMeal(v)}>
                                                        <i className="icon-cancel"></i>
                                                    </button>
                                                </div>
                                                <ul className="ul_six_wrap">
                                                    <li>
                                                        <div className="data_serve">
                                                            <p>Kcal<span>350</span></p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="data_serve">
                                                            <p>fat<span>350</span></p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="data_serve">
                                                            <p>Saturates<span>350</span></p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="data_serve">
                                                            <p>Carbs<span>350</span></p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="data_serve">
                                                            <p>Sugar<span>350</span></p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="data_serve">
                                                            <p>Fiber<span>350</span></p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                        }


                                    </div>}



                                {this.state.cuurentTab === "#Photos" &&
                                    <div className={this.state.cuurentTab === "#Photos" ? "content active" : "content"} id="Photos">
                                        <div className="upload-gallery">
                                            {/* {images && images.length > 0 &&
                                            images.map((img, i) => {
                                                return (
                                                    <span key={i}>
                                                        <div className="">
                                                            <button type="button" className="btn btn-danger no-margin" onClick={() => this.handleImageDelete(i)}>Delete</button>
                                                        </div>
                                                        <img src={img.preview} alt="" />
                                                    </span>
                                                )
                                            })
                                        } */}
                                            {/* <Dropzone
                                            name="images"
                                            className="no-padding"
                                            accept={"image/jpeg, image/png, image/jpg"}
                                            onDrop={(filesToUpload, rejectedFiles) => {
                                                if (rejectedFiles && rejectedFiles.length > 0) {
                                                    let invalidImage = ['Invalid file(s). Please select jpg and png only'];
                                                    this.setState({ invalidImage });
                                                } else {
                                                    let noImageError = null;
                                                    let invalidImage = [];
                                                    this.setState({ invalidImage, noImageError });
                                                }
                                                this.handleImagesSelection(filesToUpload);
                                            }}
                                            multiple={true}
                                            ref={(node) => { dropzoneRef = node; }}
                                        >
                                            <span>
                                                <i className="icon-add_a_photo"></i>
                                            </span>
                                        </Dropzone> */}

                                            <Field
                                                name="images"
                                                label="Meal Image"
                                                labelClass="control-label display_block"
                                                mainWrapperClass="image-form-main-wrapper"
                                                wrapperClass="form-group"
                                                placeholder="Images"
                                                component={FileField_Dropzone_Single}
                                                existingImages={images}
                                                showExistingImageDeleteModel={(path) => this.handleDeleteImageModel(true, path)}
                                            />
                                        </div>
                                    </div>}

                                {this.state.cuurentTab === "#Instruction" &&
                                    <div className={this.state.cuurentTab === "#Instruction" ? "content active" : "content"} id="Instruction">
                                        Content of Instruction
                                    <div className="progress-popup-body-m">
                                            <Field
                                                id="instruction"
                                                name="instruction"
                                                component={TextAreaField}
                                                placeholder="Add instruction for the meal"
                                                className="form-control"
                                                errorClass="help-block"
                                                validate={(document.getElementById('react-select-3--value-item') && document.getElementById('react-select-3--value-item').innerText && document.getElementById('react-select-3--value-item').innerText === "Public") ? [required] : []}
                                            />
                                        </div>
                                    </div>}
                                {this.state.cuurentTab === "#Notes" &&
                                    <div className={this.state.cuurentTab === "#Notes" ? "content active" : "content"} id="Notes">
                                        Content of Notes
                                    <div className="">
                                            <div className="progress-popup-body-m">
                                                <Field
                                                    id="notes"
                                                    name="notes"
                                                    component={TextAreaField}
                                                    placeholder="Add notes for the meal"
                                                    className="form-control"
                                                    errorClass="help-block"
                                                />
                                            </div>
                                        </div>
                                    </div>}

                            </div>


                        </div>
                    </div>
                    {/* </form> */}
                    <div className="col-md-2 ">
                        <div className="blue_right_sidebar">
                            <h2 className="h2_head_one">Recent Ingredients</h2>
                            <div className="recent-ingredient">
                                <ul>
                                    <li>Banana bread, homemade<div className="add_drag"><i className="icon-control_point"></i> Click to Add</div></li>
                                    <li>Apple juice, clear, ambient and chilled<div className="add_drag"><i className="icon-control_point"></i> Click to Add</div></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        );
    }

    changeServing = (id, v, value1, value2, value3) => {
        console.log("value =>", id, v, value1, value2, value3);
        if (value1) {

        }
    }

    ingredientUnit = (ingredient) => {
        // return [];
        let a = [];
        a.push({ label: 'g', value: 'g' });
        for (let [key, value] of Object.entries(ingredient)) {
            console.log('key => ', key);
            switch (key) {
                case '_1tsp':
                    a.push({ label: 'tsp', value: 'tsp' });
                    break;
                case '_1tbsp':
                    a.push({ label: 'tbsp', value: 'tbsp' });
                    break;
                case '_1cup':
                    a.push({ label: 'cup', value: 'cup' });
                    break;
                case '_1leaf':
                    console.log('leaf => ');
                    a.push({ label: 'leaf', value: 'leaf' });
                    break;
                case '_1large':
                    a.push({ label: 'large', value: 'large' });
                    break;
                case '_1medium':
                    a.push({ label: 'medium', value: 'medium' });
                    break;
                case '_1root':
                    a.push({ label: 'root', value: 'root' });
                    break;
                case '_1small':
                    a.push({ label: 'small', value: 'small' });
                    break;
                case '_1extra_large':
                    a.push({ label: 'extra large', value: 'extra large' });
                    break;
                case '_1tip':
                    a.push({ label: 'tip', value: 'tip' });
                    break;

                default:
                    break;
            }
        }
        return a;
    }

    removeFromMeal = (value) => {
        const { meal_ingredient } = this.state;
        console.log('value => ', value);

        if ((meal_ingredient.filter(e => e._id === value._id).length > 0)) {
            console.log("remove");
            var a = meal_ingredient.filter(e => e._id !== value._id)
            console.log('a => ', a);
            this.setState({ meal_ingredient: meal_ingredient.filter(e => e._id !== value._id) });
        }

    }

    renderSearchSuggestion = (suggestion, { query }) => {
        // if (suggestion._id === 'view_all') {
        //     return (
        //         <NavLink to="">
        //             <span>{suggestion.text}</span>
        //         </NavLink>
        //     );
        // } 
        // if (suggestion._id === 'no_result') {
        //     return (
        //         <a href="javascript:void(0)">
        //             <span>{suggestion.text}</span>
        //         </a>
        //     );
        // } else {
        var fullName = suggestion.foodName;
        // if (suggestion.lastName) {
        //     fullName += ' ' + suggestion.lastName;
        // }
        const matches = AutosuggestHighlightMatch(fullName, query);
        const parts = AutosuggestHighlightParse(fullName, matches);
        return (
            <a href="javascript:void(0)">
                {suggestion.avatar && <img
                    src={suggestion.avatar}
                    onError={(e) => {
                        e.target.src = noProfileImg
                    }}
                />}
                <div className="search-text-wrapper">
                    <span>
                        {parts.map((part, i) => {
                            return (
                                <span key={i} className={cns({ 'search-word-highlight': part.highlight })}>{part.text}</span>
                            )
                        })}
                    </span>
                    {console.log("fullName =>", fullName)}
                    {fullName !== 'No ingridient found' && <span className="click-to-add-btn">Click to add</span>}
                </div>
            </a>
        );
        // }
    }

    searchUsers = (value) => {
        const { dispatch } = this.props;
        var requestData = {
            name: value,
            start: 0,
            offset: 50,
        }
        this.setState({ searchIsLoading: true });
        // dispatch(getUserNutritionPreferencesRequest(requestData));
        dispatch(getIngridientsRequest(requestData));
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.searchDebounce.cancel;
        if (value && value.trim() && value.trim() !== '') {
            this.searchDebounce(value.trim());
        }
    }

    handleImagesSelection = (fileList) => {
        for (const file of fileList) {
            checkImageMagicCode(file).then((image) => {
                this.setState((prevState) => {
                    return {
                        images: [...prevState.images, image]
                    }
                });
            }).catch((error) => {
                te(error.message);
            });
        }
    }

    handleImageDelete = (index) => {
        var images = this.state.images;
        images.splice(index, 1);
        this.setState({ images });
    }

    handleSuggestionsClearRequested = () => {
        // this.setState({
        //     searchSuggestions: []
        // });
    };

    getSuggestionValue = (suggestion) => {
        const {
            searchValue
        } = this.props;
        const {
            meal_ingredient
        } = this.state;
        console.log('suggestion => ', suggestion);


        if (!(meal_ingredient.filter(e => e._id === suggestion._id).length > 0)) {
            console.log("add");
            meal_ingredient.push(suggestion);
            this.setState({ meal_ingredient: meal_ingredient });
        }
    }

    //#region Common functions
    handleSearchChange = (event, { newValue }) => {
        const { dispatch } = this.props;
        if (newValue && typeof newValue !== 'undefined' && newValue !== '' && newValue.trim() !== '') {
            this.setState({ showSearchLoader: true });
        }
        if (newValue !== undefined) {
            console.log("newValue =>", newValue);
            dispatch(handleChangeIngridientsSearchFor('searchValue', newValue));
        }
    }


    componentDidUpdate(prevProps, prevState) {
        const {
            searchSuggestions,
            userSearchLoading,
        } = this.props;
        const {
            searchIsLoading,
            showSearchLoader
        } = this.state;
        if ((searchSuggestions.length !== prevProps.searchSuggestions.length) || (searchSuggestions[searchSuggestions.length - 1] !== prevProps.searchSuggestions[searchSuggestions.length - 1])) {
            let suggestedUsers = []
            if (searchSuggestions.length > 0) {
                suggestedUsers = searchSuggestions;
                // suggestedUsers.push({
                //     _id: 'view_all',
                //     text: 'View All',
                // });
            } else {
                // suggestedUsers = [];
                suggestedUsers.push({
                    _id: 'no_result',
                    foodName: 'No ingridient found',
                });
            }
            this.setState({
                searchIsLoading: false,
                showSearchLoader: false,
                searchSuggestions: suggestedUsers
            });
        }
    }

    componentWillUnmount() {
        const {
            searchSuggestions,
            dispatch,
        } = this.props;
        if (searchSuggestions && searchSuggestions.length > 0) {
            var resetSearchUserState = {
                loading: false,
                // ingridients: [],
                error: [],
            }
            // dispatch(resetUserSearch(resetSearchUserState));
        }
    }
}


NutritionMealAddForm = reduxForm({
    form: 'nutrition_meal_add_form',
})(NutritionMealAddForm);

const selector = formValueSelector('nutrition_meal_add_form');

const mapStateToProps = (state) => {
    const { userNutritionPreferences, healthLabels, dietLabels, nutritions, userNutritions, new_nutrition } = state;
    return {
        userNutriPrefLoading: userNutritionPreferences.get('loading'),
        dietRestrictionLabels: userNutritionPreferences.get('dietRestrictionLabels'),
        excludeIngredients: userNutritionPreferences.get('excludeIngredients'),
        healthRestrictionLabels: userNutritionPreferences.get('healthRestrictionLabels'),
        maxRecipeTime: userNutritionPreferences.get('maxRecipeTime'),
        nutritionTargets: userNutritionPreferences.get('nutritionTargets'),
        healthLabelLoading: healthLabels.get('loading'),
        healthLabels: healthLabels.get('healthLabels'),
        dietLabelLoading: dietLabels.get('loading'),
        dietLabels: dietLabels.get('dietLabels'),
        nutritionLoading: nutritions.get('loading'),
        nutritions: nutritions.get('nutritions'),
        userNutritionsLoading: userNutritions.get('loading'),
        userNutritionsError: userNutritions.get('error'),
        searchRecipeLoading: userNutritions.get('searchRecipeLoading'),
        searchRecipes: userNutritions.get('searchRecipes'),
        searchRecipeError: userNutritions.get('searchRecipeError'),

        searchSuggestions: new_nutrition.get('ingridients'),
        searchValue: new_nutrition.get('searchValue'),
    };
}

export default connect(
    mapStateToProps,
)(NutritionMealAddForm);


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

const TextAreaField = (props) => {
    const { input, meta, wrapperClass, className, placeholder, errorClass, type, disabled, properties } = props;
    return (
        <div
            className={
                `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
            }
        >
            <textarea
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
