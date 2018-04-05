import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import RecipesForm from './RecipesForm';
// import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

class RecipesSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
        }
    }

    handleSubmit = (data) => {
        console.log(data);
        return;
        const { dispatch, match } = this.props;
        let recipeData = {
            name: data.name,
            description: data.description,
            recipe_img: data.recipe_img,
            method: draftToHtml(data.method),
            ingredients: draftToHtml(data.ingredients),
            ingredientsIncluded: JSON.stringify(data.ingredients_included),
            preparationTime: data.preparation_time,
            cookTime: data.cook_time,
            difficultyLevel: data.difficulty_level,
            rating: data.rating,
            recipeType: data.recipe_type,
            nutritions: JSON.stringify(data.ingredients_included),
        }

        var formData = new FormData();
        formData.append('name', exerciseData.name);
        formData.append('description', exerciseData.description);
        formData.append('mainMuscleGroup', exerciseData.mainMuscleGroup);
        formData.append('otherMuscleGroup', exerciseData.otherMuscleGroup);
        formData.append('detailedMuscleGroup', exerciseData.detailedMuscleGroup);
        formData.append('type', exerciseData.type);
        formData.append('mechanics', exerciseData.mechanics);
        formData.append('equipments', exerciseData.equipments);
        formData.append('difficltyLevel', exerciseData.difficltyLevel);
        formData.append('steps', exerciseData.steps);
        if (exerciseData.images) {
            _.forEach(exerciseData.images, (file) => {
                formData.append('images', file);
            });
        }
        formData.append('delete_images', exerciseData.deletedImages);
        this.setState({
            saveActionInit: true
        });
        dispatch(showPageLoader());
        if (typeof match.params.id !== 'undefined') {
            dispatch(exerciseUpdateRequest(match.params.id, formData))
        } else {
            dispatch(exerciseAddRequest(formData))
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