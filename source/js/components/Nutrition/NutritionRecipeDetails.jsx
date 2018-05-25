import React, { Component } from 'react';
import { connect } from "react-redux";
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { getUserNutritionRecipeDetailsRequest } from '../../actions/userNutritions';
import noImg from 'img/common/no-img.png'
import { Scrollbars } from 'react-custom-scrollbars';
import { routeCodes } from '../../constants/routes';
import { NavLink } from "react-router-dom";
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';

class NutritionRecipeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
            recipe: {},
        }
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        if (match.params.id) {
            this.setState({ selectActionInit: true });
            dispatch(showPageLoader());
            dispatch(getUserNutritionRecipeDetailsRequest(match.params.id));
        }
    }

    render() {
        const { recipe } = this.state;
        var nutritionKeys = [];
        if (recipe.totalNutrients) {
            nutritionKeys = Object.keys(recipe.totalNutrients);
        }
        return (
            <div>
                <FitnessHeader />
                <FitnessNav />
                {recipe && Object.keys(recipe).length > 0 &&
                    <section className="body-wrap">
                        <div className="body-head d-flex justify-content-start">
                            <div className="body-head-l">
                                <h2>{recipe.name}</h2>
                            </div>
                            <div className="body-head-r">
                                <a href="" className="white-btn">Print Recipe
                                <i className="icon-print"></i>
                                </a>
                                <NavLink
                                    className='pink-btn'
                                    to={routeCodes.NUTRITION}
                                >
                                    <i className="icon-arrow_back"></i>
                                    Back
                            </NavLink>
                            </div>
                        </div>

                        <div className="body-content row recipe column-wrap d-flex">
                            <div className="col-md-4">
                                <div className="white-box food-img space-btm-20">
                                    <img
                                        src={recipe.image}
                                        alt="Recipe"
                                        onError={(e) => {
                                            e.target.src = noImg
                                        }}
                                    />
                                </div>

                                <div className="white-box ingredients">
                                    <div className="whitebox-head">
                                        <h3 className="title-h3">Ingredients</h3>
                                    </div>
                                    <div className="whitebox-body">
                                        <ul>
                                            {recipe.ingredientLines && recipe.ingredientLines.length > 0 &&
                                                recipe.ingredientLines.map((ing, index) => {
                                                    return (
                                                        <li key={index}>{ing}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-head">
                                        <h3 className="title-h3">details</h3>
                                    </div>
                                    <div className="dtl-div whitebox-body">
                                        <ul className="common-ul">
                                            {recipe.totalTime != '' &&
                                                <li>
                                                    <div className="grey-white">
                                                        <h4>Cook Time:</h4>
                                                        <h5>{recipe.totalTime} Mins</h5>
                                                    </div>
                                                </li>
                                            }
                                        </ul>
                                        {recipe.dietLabels && recipe.dietLabels.length > 0 &&
                                            <div className="recipe-type recipe_list_data">
                                                {
                                                    recipe.dietLabels.map((val, index) => (
                                                        <span key={index}>
                                                            <i>
                                                                {val.charAt(0)}
                                                            </i>
                                                            {val}
                                                        </span>

                                                    ))
                                                }
                                            </div>
                                        }
                                        {recipe.healthLabels && recipe.healthLabels.length > 0 &&
                                            <div className="recipe-type recipe_list_data">
                                                {
                                                    recipe.healthLabels.map((val, index) => (
                                                        <span key={index}>
                                                            <i>
                                                                {val.charAt(0)}
                                                            </i>
                                                            {val}
                                                        </span>

                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="white-box method">
                                    <div className="whitebox-head">
                                        <h3 className="title-h3">Method</h3>
                                    </div>
                                    <div className="whitebox-body">
                                        <a href={recipe.url} target="_blank" className="btn btn-default">Preparation Details</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="recipe-nutrition white-box height-725">
                                    <Scrollbars autoHide>
                                        <div className="width-100-per padding-10" style={{ height: "100%" }}>
                                            <div className="whitebox-head">
                                                <h3 className="title-h3">Recipe Nutrition</h3>
                                            </div>
                                            <div className="whitebox-body">
                                                <div className="dtl-div">
                                                    {nutritionKeys && nutritionKeys.length > 0 &&
                                                        <ul className="common-ul">
                                                            {
                                                                nutritionKeys.map((key, index) => {
                                                                    var nutriObj = recipe.totalNutrients[key];
                                                                    var qty = (nutriObj.quantity) ? nutriObj.quantity : 0;
                                                                    qty = Math.round((qty / recipe.serving)).toFixed(0);
                                                                    return (
                                                                        <li key={key}>
                                                                            <div className="grey-white">
                                                                                <h4>{nutriObj.label}</h4>
                                                                                <h5>{qty}{nutriObj.unit}</h5>
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                })
                                                            }
                                                        </ul>
                                                    }
                                                </div>
                                                <div className="nutrition-chart">
                                                </div>
                                            </div>
                                        </div>
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </div>
        );
    }

    componentDidUpdate() {
        const {
            loading,
            recipe,
            dispatch,
        } = this.props;
        const {
            selectActionInit
        } = this.state;
        if (selectActionInit && !loading) {
            this.setState({ selectActionInit: false, recipe });
            dispatch(hidePageLoader());
        }
    }

}

const mapStateToProps = (state) => {
    const { userNutritions } = state;
    return {
        loading: userNutritions.get('loading'),
        error: userNutritions.get('error'),
        recipe: userNutritions.get('recipe'),
    };
}

export default connect(
    mapStateToProps
)(NutritionRecipeDetails);