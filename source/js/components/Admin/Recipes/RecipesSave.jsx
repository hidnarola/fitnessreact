import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import RecipesForm from './RecipesForm';
import { recipeUpdateRequest, recipeAddRequest } from '../../../actions/admin/recipes';

class RecipesSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
        }
    }

    handleSubmit = (data) => {
        let nutrs = [];
        if (data.nutritions) {
            _.forEach(data.nutritions, (obj) => {
                nutrs.push({ nutrition: obj._id.value, units: obj._units });
            });
        }
        const { dispatch, match } = this.props;
        let recipeData = {
            name: data.name,
            description: data.description,
            recipe_img: data.recipe_img,
            method: data.method,
            ingredients: data.ingredients,
            ingredientsIncluded: JSON.stringify(_.map(data.ingredients_included, 'value')),
            preparationTime: data.preparation_time,
            cookTime: data.cook_time,
            difficultyLevel: data.difficulty_level.value,
            rating: data.rating,
            recipeType: JSON.stringify(_.map(data.recipe_type, 'value')),
            nutritions: JSON.stringify(nutrs),
        }

        var formData = new FormData();
        formData.append('name', recipeData.name);
        formData.append('description', recipeData.description);
        formData.append('method', recipeData.method);
        formData.append('ingredients', recipeData.ingredients);
        formData.append('ingredientsIncluded', recipeData.ingredientsIncluded);
        formData.append('preparationTime', recipeData.preparationTime);
        formData.append('cookTime', recipeData.cookTime);
        formData.append('difficultyLevel', recipeData.difficultyLevel);
        formData.append('rating', recipeData.rating);
        formData.append('recipeType', recipeData.recipeType);
        formData.append('nutritions', recipeData.nutritions);
        if (recipeData.recipe_img) {
            formData.append('recipe_img', recipeData.recipe_img[0]);
        }
        this.setState({
            saveActionInit: true
        });
        dispatch(showPageLoader());
        if (typeof match.params.id !== 'undefined') {
            dispatch(recipeUpdateRequest(match.params.id, formData))
        } else {
            dispatch(recipeAddRequest(formData))
        }
    }

    render() {
        return (
            <div className="exercise-save-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Recipes</h2>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save Recipe</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <RecipesForm onSubmit={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const { loading, dispatch, history } = this.props;
        const { saveActionInit } = this.state;
        if (saveActionInit && !loading) {
            this.setState({
                saveActionInit: false
            });
            dispatch(hidePageLoader());
            history.push(adminRouteCodes.RECIPES);
        }
    }
}

const mapStateToProps = (state) => {
    const { adminRecipes } = state;
    return {
        loading: adminRecipes.get('loading'),
        error: adminRecipes.get('error'),
    }
}

export default connect(mapStateToProps)(RecipesSave);