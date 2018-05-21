import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { getUserNutritionPreferencesRequest } from '../../actions/userNutritionPreferences';
import { getHealthLabelsRequest } from '../../actions/healthLabels';
import { getDietLabelsRequest } from '../../actions/dietLabels';
import { getNutritionsRequest } from '../../actions/nutritions';
import _ from "lodash";
import { RECIPE_API_SEARCH_URL } from '../../constants/consts';
import { searchRecipesApiRequest } from '../../actions/userNutritions';
import noProfileImg from 'img/common/no-profile-img.png'
import InfiniteScroll from 'react-infinite-scroller';

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
            offset: 100,
            to: 100,
            hasMoreData: true,
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
                    </div>
                    <div className="body-content d-flex row justify-content-start">
                        <div className="col-md-12">
                            <div className="white-box">
                                <div className="whitebox-head d-flex profile-head">
                                    <h3 className="title-h3 size-14">Search Recipes</h3>
                                    {/* <div className="whitebox-head-r">
                                        <a href="" className="green-blue">
                                            Search<i className="icon-control_point"></i>
                                        </a>
                                    </div> */}
                                </div>

                                <div className="whitebox-body">
                                    <div className="col-md-11 pull-left">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="recipe_search_term" placeholder="Search.." value={searchTerm} onChange={this.handleSearchTermChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-1 pull-left">
                                        <div className="form-group">
                                            <button type="button" className="btn btn-primary" onClick={this.handleSearch}>Search</button>
                                        </div>
                                    </div>

                                    {searchRecipes && searchRecipes.length <= 0 && (!searchRecipeLoading) &&
                                        <span>No Records found</span>
                                    }
                                    {searchRecipes && searchRecipes.length > 0 &&
                                        <InfiniteScroll
                                            pageStart={0}
                                            loadMore={this.handleSearch}
                                            hasMore={hasMoreData}
                                            loader={<div className="loader" key={0}>Loading ...</div>}
                                        >
                                            {
                                                searchRecipes.map((recipe, index) => {
                                                    return (
                                                        <div className="meal-wrap d-flex" key={index}>
                                                            <div className="meal-img">
                                                                <img
                                                                    src={recipe.image}
                                                                    alt="Recipe"
                                                                    onError={(e) => {
                                                                        e.target.src = noProfileImg
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="meal-name">
                                                                <h5>
                                                                    <a href="">
                                                                        {recipe.label}
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </InfiniteScroll>
                                    }


                                    {/* {searchRecipes && searchRecipes.length <= 0 && (!searchRecipeLoading) &&
                                        <span>No Records found</span>
                                    }
                                    {searchRecipes && searchRecipes.length > 0 &&
                                        searchRecipes.map((recipeData, index) => {
                                            var recipe = recipeData.recipe;
                                            return (
                                                <div className="meal-wrap d-flex" key={index}>
                                                    <div className="meal-img">
                                                        <img
                                                            src={recipe.image}
                                                            alt="Recipe"
                                                            onError={(e) => {
                                                                e.target.src = noProfileImg
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="meal-name">
                                                        <h5>
                                                            <a href="">
                                                                {recipe.label}
                                                            </a>
                                                        </h5>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
        } = this.state;
        const {
            userNutriPrefLoading,
            healthLabelLoading,
            dietLabelLoading,
            nutritionLoading,
            searchRecipeLoading,
            searchRecipes,
        } = this.props;
        if (selectPageDataActionInit && !userNutriPrefLoading && !healthLabelLoading && !dietLabelLoading && !nutritionLoading) {
            this.setState({ selectPageDataActionInit: false });
            this.prepareNutriData();
        }
        if (searchActionInit && !searchRecipeLoading) {
            var shortArr = [];
            _.forEach(searchRecipes, (obj, index) => {
                var rec = obj.recipe;
                shortArr.push({
                    label: (rec.label) ? rec.label : '',
                    image: (rec.image) ? rec.image : '',
                });
            });
            this.setState({
                searchActionInit: false,
                searchRecipes: _.concat(this.state.searchRecipes, shortArr),
                from: (from + offset),
                to: (to + offset)
            });
        }
    }

    handleSearchTermChange = (e) => {
        this.setState({ searchTerm: e.target.value });
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

    handleSearch = () => {
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
            this.setState({ searchActionInit: true });
            dispatch(searchRecipesApiRequest(requestUrl));
        }
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
        searchRecipeLoading: userNutritions.get('searchRecipeLoading'),
        searchRecipes: userNutritions.get('searchRecipes'),
        searchRecipeError: userNutritions.get('searchRecipeError'),
    };
}

export default connect(
    mapStateToProps
)(NutritionMealAdd);