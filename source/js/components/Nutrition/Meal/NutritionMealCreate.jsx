import React, { Component } from 'react';
import AddMetaDescription from '../../global/AddMetaDescription';
import { routeCodes } from '../../../constants/routes';
import FitnessHeader from '../../global/FitnessHeader';
import FitnessNav from '../../global/FitnessNav';
import NutritionStatsRightSidebar from '../../Calendar/Nutritions/sidebar/NutritionStatsRightSidebar';
import NutritionMealBodyContent from './NutritionMealBodyContent';

class NutritionMealCreate extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Meal | Fitly</title>
          </AddMetaDescription>
          <FitnessHeader
            text="day"
            routes={routeCodes.CALENDAR_OVERVIEW}
            enableBackLink={true}
          />
          <FitnessNav />
          <section className="body-wrap nutrition-todays-meal-section">
            <div className="body-head d-flex justify-content-start front-white-header custome_header">
              <div className="body-head-l" style={{ padding: '15px' }}>
                <div className="display-date">
                  <span className="date-text">Create a Meal</span>
                </div>
              </div>
            </div>
            <div className="body-content workouts-bg mt-5 h-100">
              <div className="row justify-content-start no-gutters h-100">
                <div className="col-xs-12 col-md-9 d-flex">
                  <NutritionMealBodyContent />
                </div>
                <div className="col-xs-12 col-md-3 d-flex">
                  <NutritionStatsRightSidebar />
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default NutritionMealCreate;
