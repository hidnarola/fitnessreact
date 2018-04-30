import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import TodaysMeal from './TodaysMeal';
import MealPlanStats from './MealPlanStats';

class NutritionMeal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="fitness-nutrition">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>nutrition</h2>
                            <p>Your meal plan is balanced and tailored to provide the right mix for your goal. For your fitness assistant
                                to provide the best meal plans make sure you rate recipes you like. You can further fine tune the meals
                                selected for you by changing your nutrition settings. </p>
                        </div>
                        <div className="body-head-r ml-auto">

                            <NavLink
                                activeClassName='active'
                                className='pink-btn'
                                exact
                                to={routeCodes.NUTRITIONSHOP}
                            >
                                <span>Shopping List</span>
                                <i className="icon-shopping_cart"></i>
                            </NavLink>

                            <NavLink
                                activeClassName='active'
                                className='white-btn'
                                exact
                                to={routeCodes.NUTRITIONPREFERENCE}
                            >
                                <span>Nutrition Settings</span>
                                <i className="icon-settings"></i>
                            </NavLink>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start">
                        <div className="col-md-8">
                            <TodaysMeal />
                        </div>
                        <div className="col-md-4">
                            <MealPlanStats />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default connect()(NutritionMeal);