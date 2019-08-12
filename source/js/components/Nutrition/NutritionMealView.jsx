import React, { Component } from 'react';
import AddMetaDescription from '../global/AddMetaDescription';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { routeCodes } from '../../constants/routes';
import { NavLink } from 'react-router-dom';
import NutritionMealViewForm from './NutritionMealViewForm';
import NutritionSearchRecipeDetailsModal from './NutritionSearchRecipeDetailsModal';

class NutritionMealView extends Component {
  render() {
    const mealID = this.props.match.params.id;
    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Add Meal | Fitly</title>
          </AddMetaDescription>
          <FitnessHeader />
          <FitnessNav />
          <section className="body-wrap">
            <div className="body-head d-flex justify-content-start front-white-header">
              <div className="body-head-l">
                <h2>View Meal</h2>
                <p>
                  Your meal plan is balanced and tailored to provide the right
                  mix for your goal. For your fitness assistant to provide the
                  best meal plans make sure you rate recipes you like. You can
                  further fine tune the meals selected for you by changing your
                  nutrition settings.{' '}
                </p>
              </div>
              <div className="body-head-r">
                <NavLink className="pink-btn" to={routeCodes.NUTRITION}>
                  <i className="icon-arrow_back" />
                  Back
                </NavLink>
              </div>
            </div>
            <NutritionMealViewForm />
            <div className="whitebox-body" />
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default NutritionMealView;
