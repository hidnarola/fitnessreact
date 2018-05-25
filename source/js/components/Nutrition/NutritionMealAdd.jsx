import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { getUserNutritionPreferencesRequest } from '../../actions/userNutritionPreferences';
import { getHealthLabelsRequest } from '../../actions/healthLabels';
import { getDietLabelsRequest } from '../../actions/dietLabels';
import { getNutritionsRequest } from '../../actions/nutritions';
import _ from "lodash";
import {
    RECIPE_API_SEARCH_URL,
    DAY_DRIVE_BREAKFAST,
    DAY_DRIVE_PRE_LUNCH_SNACKS,
    DAY_DRIVE_LUNCH,
    DAY_DRIVE_POST_LUNCH_SNACKS,
    DAY_DRIVE_DINNER
} from '../../constants/consts';
import { searchRecipesApiRequest, addUserRecipeRequest } from '../../actions/userNutritions';
import noImg from 'img/common/no-img.png'
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
import { ts, te } from '../../helpers/funs';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../../constants/routes';
import Dotdotdot from "react-dotdotdot";
import ReactHtmlParser from "react-html-parser";
import { FaCircleONotch } from "react-icons/lib/fa";

const dayDriveOptions = [
    { value: DAY_DRIVE_BREAKFAST, label: 'Breakfast' },
    { value: DAY_DRIVE_PRE_LUNCH_SNACKS, label: 'Pre Lunch Snacks' },
    { value: DAY_DRIVE_LUNCH, label: 'Lunch' },
    { value: DAY_DRIVE_POST_LUNCH_SNACKS, label: 'Post Lunch Snacks' },
    { value: DAY_DRIVE_DINNER, label: 'Dinner' },
]

class NutritionMealAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            selectPageDataActionInit: false,
            excludeIngredients: [],
            dietLabels: [],
            healthLabels: [],
            nutritionTargets: [],
            searchActionInit: false,
            searchRecipes: [],
            from: 0,
            offset: 10,
            to: 10,
            hasMoreData: true,
            selectedRecipe: {},
            showDetailedRecipeModal: false,
            addActionInit: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ selectPageDataActionInit: true });
        dispatch(getNutritionsRequest());
        dispatch(getDietLabelsRequest());
        dispatch(getHealthLabelsRequest());
        dispatch(getUserNutritionPreferencesRequest());
    }

    render() {
        const {
            searchTerm,
            searchRecipes,
            hasMoreData,
            selectedRecipe,
            showDetailedRecipeModal,
        } = this.state;
        const {
            searchRecipeLoading,
        } = this.props;
        return (
            <div className="fitness-nutrition">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Search Recipe</h2>
                            <p>Your meal plan is balanced and tailored to provide the right mix for your goal. For your fitness assistant
                                to provide the best meal plans make sure you rate recipes you like. You can further fine tune the meals
                                selected for you by changing your nutrition settings. </p>
                        </div>
                        <div className="body-head-r">
                            <NavLink
                                className='pink-btn'
                                to={routeCodes.NUTRITION}>
                                <i className="icon-arrow_back"></i>
                                Back
                            </NavLink>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start nutrition-meal-add-wrapper">
                        <div className="col-md-12">
                            <div className="white-box">
                                <div className="whitebox-head d-flex profile-head">
                                    <h3 className="title-h3 size-14">Search Recipes</h3>
                                </div>

                                <div className="whitebox-body">
                                    <NutritionMealAddSearchForm onSubmit={this.handleSearch} />

                                    {searchRecipes && searchRecipes.length <= 0 && !searchRecipeLoading && !hasMoreData &&
                                        <span>No recipe found</span>
                                    }
                                    {searchRecipes && searchRecipes.length > 0 &&
                                        <InfiniteScroll
                                            pageStart={0}
                                            loadMore={this.loadMore}
                                            hasMore={hasMoreData}
                                            className="margin-top-30"
                                            loader={
                                                <div className="loader" key={0}>
                                                    <FaCircleONotch className="loader-spinner loader-spinner-icon" /> Loading ...
                                                </div>
                                            }
                                        >
                                            {
                                                searchRecipes.map((recipeData, index) => {
                                                    var recipe = recipeData.recipe;
                                                    var enerc_kal = (recipe.totalNutrients['ENERC_KCAL']) ? recipe.totalNutrients['ENERC_KCAL'].quantity : 0;
                                                    var procnt = (recipe.totalNutrients['PROCNT']) ? recipe.totalNutrients['PROCNT'].quantity : 0;
                                                    var fat = (recipe.totalNutrients['FAT']) ? recipe.totalNutrients['FAT'].quantity : 0;
                                                    var chocdf = (recipe.totalNutrients['CHOCDF']) ? recipe.totalNutrients['CHOCDF'].quantity : 0;
                                                    enerc_kal = Math.round((enerc_kal / recipe.yield)).toFixed(0);
                                                    procnt = Math.round((procnt / recipe.yield)).toFixed(0);
                                                    fat = Math.round((fat / recipe.yield)).toFixed(0);
                                                    chocdf = Math.round((chocdf / recipe.yield)).toFixed(0);
                                                    var recipeIngreLines = '';
                                                    if (recipe && recipe.ingredientLines && recipe.ingredientLines.length > 0) {
                                                        recipe.ingredientLines.map((line, i) => {
                                                            recipeIngreLines = recipeIngreLines + line + '<br />';
                                                        })
                                                    }
                                                    return (
                                                        <div className="meal-wrap d-flex" key={index}>
                                                            <div className="meal-img">
                                                                <img
                                                                    src={recipe.image}
                                                                    alt="Recipe"
                                                                    onError={(e) => {
                                                                        e.target.src = noImg
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="meal-name">
                                                                <h5>
                                                                    <a href="javascript:void(0)" onClick={() => this.getSelectedRecipeDetails(recipe)}>
                                                                        {recipe.label}
                                                                    </a>
                                                                </h5>

                                                                <Dotdotdot clamp={3}>
                                                                    <small>{ReactHtmlParser(recipeIngreLines)}</small>
                                                                </Dotdotdot>
                                                            </div>
                                                            <div className="meal-info">
                                                                <small>Cals</small>
                                                                <big>
                                                                    {enerc_kal}
                                                                    {(recipe.totalNutrients['ENERC_KCAL']) ? recipe.totalNutrients['ENERC_KCAL'].unit : ''}
                                                                </big>
                                                            </div>
                                                            <div className="meal-info">
                                                                <small>Protein</small>
                                                                <big>
                                                                    {procnt}
                                                                    {(recipe.totalNutrients['PROCNT']) ? recipe.totalNutrients['PROCNT'].unit : ''}
                                                                </big>
                                                            </div>
                                                            <div className="meal-info">
                                                                <small>Fat</small>
                                                                <big>
                                                                    {fat}
                                                                    {(recipe.totalNutrients['FAT']) ? recipe.totalNutrients['FAT'].unit : ''}
                                                                </big>
                                                            </div>
                                                            <div className="meal-info">
                                                                <small>Carbs</small>
                                                                <big>
                                                                    {chocdf}
                                                                    {(recipe.totalNutrients['CHOCDF']) ? recipe.totalNutrients['CHOCDF'].unit : ''}
                                                                </big>
                                                            </div>
                                                            <div className="meal-info">
                                                                {dayDriveOptions && dayDriveOptions.length > 0 &&
                                                                    <ButtonToolbar bsClass="">
                                                                        <DropdownButton title="" className="icon-more_horiz no-border" id="add_recipe_actions" noCaret pullRight>
                                                                            <MenuItem header>Add Recipe</MenuItem>
                                                                            {dayDriveOptions.map((drive, index) => {
                                                                                return (
                                                                                    <MenuItem
                                                                                        eventKey={index}
                                                                                        key={index}
                                                                                        onClick={() => this.handleAddRecipe(drive.value, recipe)}
                                                                                    >
                                                                                        {drive.label}
                                                                                    </MenuItem>
                                                                                )
                                                                            })}
                                                                            <MenuItem divider />
                                                                            <MenuItem header>Details</MenuItem>
                                                                            <MenuItem eventKey={10} onClick={() => this.getSelectedRecipeDetails(recipe)}>View</MenuItem>
                                                                        </DropdownButton>
                                                                    </ButtonToolbar>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </InfiniteScroll>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <NutritionSearchRecipeDetailsModal
                    show={showDetailedRecipeModal}
                    handleClose={this.handleCloseRecipeDetailesModal}
                    recipe={selectedRecipe}
                />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            selectPageDataActionInit,
            searchActionInit,
            from,
            to,
            offset,
            addActionInit,
        } = this.state;
        const {
            userNutriPrefLoading,
            healthLabelLoading,
            dietLabelLoading,
            nutritionLoading,
            searchRecipeLoading,
            searchRecipes,
            dispatch,
            userNutritionsLoading,
            userNutritionsError,
        } = this.props;
        if (selectPageDataActionInit && !userNutriPrefLoading && !healthLabelLoading && !dietLabelLoading && !nutritionLoading) {
            this.setState({ selectPageDataActionInit: false });
            this.prepareNutriData();
        }
        if (searchActionInit && !searchRecipeLoading) {
            if (searchRecipes && searchRecipes.length > 0) {
                this.setState({
                    searchActionInit: false,
                    searchRecipes: _.concat(this.state.searchRecipes, searchRecipes),
                    from: (from + offset),
                    to: (to + offset)
                });
            } else {
                this.setState({
                    searchActionInit: false,
                    hasMoreData: false,
                });
            }
            dispatch(hidePageLoader());
        }
        if (addActionInit && !userNutritionsLoading) {
            this.setState({ addActionInit: false });
            dispatch(hidePageLoader());
            if (userNutritionsError && userNutritionsError.length > 0) {
                te(userNutritionsError[0]);
            } else {
                ts('Recipe added to your todays meal!');
            }
        }
    }

    prepareNutriData = () => {
        const {
            excludeIngredients,
            healthLabels,
            dietLabels,
            healthRestrictionLabels,
            dietRestrictionLabels,
            nutritionTargets,
            nutritions,
        } = this.props;
        var helthLbs = [];
        var dietLbs = [];
        var nutriTargets = [];
        _.forEach(healthLabels, (obj, index) => {
            var index = _.indexOf(healthRestrictionLabels, obj._id);
            if (index >= 0) {
                helthLbs.push(obj.parameter);
            }
        });
        _.forEach(dietLabels, (obj, index) => {
            var index = _.indexOf(dietRestrictionLabels, obj._id);
            if (index >= 0) {
                dietLbs.push(obj.parameter);
            }
        });
        _.forEach(nutritionTargets, (obj, index) => {
            var nutri = _.find(nutritions, ['_id', obj.nutritionId]);
            if (nutri) {
                var nutr = {
                    start: obj.start,
                    end: obj.end,
                    type: nutri.type,
                    name: nutri.name,
                    ntrCode: nutri.ntrCode,
                };
                nutriTargets.push(nutr);
            }
        });
        this.setState({
            excludeIngredients,
            healthLabels: helthLbs,
            dietLabels: dietLbs,
            nutritionTargets: nutriTargets,
        });
    }

    handleSearch = (data) => {
        var searchTerm = data.search_term;
        const { dispatch } = this.props;
        const {
            dietLabels,
            healthLabels,
            excludeIngredients,
            nutritionTargets,
            from,
            to,
            searchActionInit,
        } = this.state;
        if (!searchActionInit) {
            this.setState({
                searchTerm: searchTerm,
                searchRecipes: [],
                from: 0,
                offset: 10,
                to: 10,
                hasMoreData: true,
            }, () => {
                var requestUrl = this.generateRequestUrl();
                this.setState({ searchActionInit: true });
                dispatch(showPageLoader());
                dispatch(searchRecipesApiRequest(requestUrl));
            });
        }
    }

    loadMore = () => {
        const { dispatch } = this.props;
        const {
            searchTerm,
            dietLabels,
            healthLabels,
            excludeIngredients,
            nutritionTargets,
            from,
            to,
            searchActionInit,
        } = this.state;
        if (!searchActionInit) {
            var requestUrl = this.generateRequestUrl();
            this.setState({ searchActionInit: true });
            dispatch(searchRecipesApiRequest(requestUrl));
        }
    }

    generateRequestUrl = () => {
        const {
            searchTerm,
            dietLabels,
            healthLabels,
            excludeIngredients,
            nutritionTargets,
            from,
            to,
        } = this.state;
        var requestUrl = RECIPE_API_SEARCH_URL;
        requestUrl += `&q=${searchTerm}`;
        requestUrl += `&from=${from}`;
        requestUrl += `&to=${to}`;
        requestUrl += `&ingr=${10}`;
        _.forEach(dietLabels, (obj, index) => {
            requestUrl += `&diet=${obj}`;
        });
        _.forEach(healthLabels, (obj, index) => {
            requestUrl += `&health=${obj}`;
        });
        _.forEach(excludeIngredients, (obj, index) => {
            requestUrl += `&excluded=${obj}`;
        });
        _.forEach(nutritionTargets, (obj, index) => {
            if (obj.type === 'nutrient') {
                requestUrl += `&nutrients[${obj.ntrCode}]=${obj.start}-${obj.end}`;
            } else {
                requestUrl += `&calories=${obj.start}-${obj.end}`;
            }
        });
        return requestUrl;
    }

    getSelectedRecipeDetails = (recipe) => {
        this.setState({ selectedRecipe: recipe, showDetailedRecipeModal: true });
    }

    handleCloseRecipeDetailesModal = () => {
        this.setState({ selectedRecipe: {}, showDetailedRecipeModal: false });
    }

    handleAddRecipe = (dayDrive, recipe) => {
        const { dispatch } = this.props;
        var requestData = {
            user_recipe: {
                dayDrive: dayDrive,
                recipe: recipe,
                date: moment().startOf('day'),
            }
        }
        this.setState({ addActionInit: true });
        dispatch(showPageLoader());
        dispatch(addUserRecipeRequest(requestData));
    }
}

const mapStateToProps = (state) => {
    const { userNutritionPreferences, healthLabels, dietLabels, nutritions, userNutritions } = state;
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
    };
}

export default connect(
    mapStateToProps
)(NutritionMealAdd);