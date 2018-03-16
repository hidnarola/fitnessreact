import React, { Component } from 'react';
import { connect } from 'react-redux';

import MealPlanStatsList from './MealPlanStatsList';

class MealPlanStats extends Component {
    render() {
        const { mealPlanStatus, mealPlanNutritionChart } = this.props;
        return (
            <div className="recipe-nutrition white-box">
                <div className="whitebox-head meal-paln">
                    <h3 className="title-h3 size-14">Meal Plan Stats</h3>
                </div>
                <div className="whitebox-body">
                    <div className="dtl-div">
                        {!mealPlanStatus &&
                            <span>No meal plan statistics found.</span>
                        }
                        {mealPlanStatus && mealPlanStatus.length <= 0 &&
                            <span>No meal plan statistics found.</span>
                        }
                        {mealPlanStatus && mealPlanStatus.length > 0 &&
                            <ul className="common-ul">
                                {
                                    mealPlanStatus.map((mealPlanStat, index) => (
                                        <MealPlanStatsList key={index} mealPlanStat={mealPlanStat} />
                                    ))
                                }
                            </ul>
                        }
                    </div>
                    <div className="nutrition-chart">
                        <img src={mealPlanNutritionChart} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { nutrition } = state;
    return {
        loading: nutrition.get('loading'),
        error: nutrition.get('error'),
        mealPlanStatus: nutrition.get('mealPlanStatus'),
        mealPlanNutritionChart: nutrition.get('mealPlanNutritionChart'),
    }
}

export default connect(mapStateToProps)(MealPlanStats);