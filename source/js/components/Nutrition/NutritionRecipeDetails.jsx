import React, { Component } from 'react';
import { connect } from "react-redux";
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { getUserNutritionRecipeDetailsRequest } from '../../actions/userNutritions';
import noProfileImg from 'img/common/no-profile-img.png'

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
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>{recipe.name}</h2>
                            {/* <p>Make the ultimate comfort dish, macaroni cheese, but with vegan credentials. The recipe is quick and easy
                                to make, so a great
                                <br /> midweek meal for the family</p> */}
                        </div>
                        <div className="body-head-r">
                            {/* <a href="" className="pink-btn">Favourite Recipe
                                <i className="icon-star"></i>
                            </a> */}
                            <a href="" className="white-btn">Print Recipe
                                <i className="icon-print"></i>
                            </a>
                        </div>
                    </div>

                    <div className="body-content row recipe column-wrap d-flex">
                        <div className="col-md-4">
                            <div className="white-box food-img space-btm-20">
                                <a href="">
                                    <img
                                        src={recipe.image}
                                        alt="Recipe"
                                        onError={(e) => {
                                            e.target.src = noProfileImg
                                        }}
                                    />
                                </a>
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
                                        {/* <li>
                                            <div className="grey-white">
                                                <h4>Recipe Rating:</h4>
                                                <h5 className="recipe-rate">
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                </h5>
                                            </div>
                                        </li> */}
                                        {/* <li>
                                            <div className="grey-white">
                                                <h4>Prep Time:</h4>
                                                <h5>15 Mins</h5>
                                            </div>
                                        </li> */}
                                        {recipe.totalTime != '' &&
                                            <li>
                                                <div className="grey-white">
                                                    <h4>Cook Time:</h4>
                                                    <h5>{recipe.totalTime} Mins</h5>
                                                </div>
                                            </li>
                                        }
                                        {/* <li>
                                            <div className="grey-white">
                                                <h4>Difficulty:</h4>
                                                <h5>Easy</h5>
                                            </div>
                                        </li> */}
                                    </ul>
                                    {recipe.dietLabels && recipe.dietLabels.length > 0 &&
                                        <div className="recipe-type">
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
                                        <div className="recipe-type">
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
                                    {/* <ul className="decimal-ul">
                                        <li>
                                            <p>The night before, soak the cashew nuts in water and leave overnight.</p>
                                        </li>
                                        <li>
                                            <p>Heat the oven to 180C/160C fan/gas 4. Steam the carrots and potatoes together for 5 mins,
                                                until completely softened. Transfer to a food processor. Drain the cashews and add these
                                                with 60ml of the oil, then blitz to break down the nuts. Tip in the other ingredients
                                                – apart from the macaroni, breadcrumbs and the remaining oil – then blitz again until
                                                the mixture is smooth and season well. Add a splash of water and just a drizzle of olive
                                                oil if it looks too stiff, then set aside.</p>
                                        </li>
                                        <li>
                                            <p>Cook the macaroni in a large pan of salted water for 1 min less than packet instructions,
                                                drain then stir through the sauce. Transfer the mix to an ovenproof dish, stir the breadcrumbs
                                                with the remaining oil and some seasoning. Scatter over the top of the macaroni and bake
                                                for 20-25 mins until piping hot and crisp.</p>
                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recipe-nutrition white-box">
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
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    componentDidUpdate() {
        const {
            loading,
            recipe
        } = this.props;
        const {
            selectActionInit
        } = this.state;
        if (selectActionInit && !loading) {
            this.setState({ selectActionInit: false, recipe });
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