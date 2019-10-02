import React, { Component } from 'react';
import AddMetaDescription from '../../global/AddMetaDescription';
import { routeCodes } from '../../../constants/routes';
import FitnessHeader from '../../global/FitnessHeader';
import FitnessNav from '../../global/FitnessNav';
import NutritionMealBodyContent from './NutritionMealBodyContent';
import { connect } from 'react-redux';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import NutritionMealCreateSidebar from './Header/NutritionMealCreateSidebar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class NutritionMealCreate extends Component {
  state = {
    quickTab: '#favrioutmeals',
    mealVisibility: 'private',
  };
  render() {
    const { quickTab, mealVisibility } = this.state;
    const { recentMeals } = this.props;
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
                  <div className="ml-auto">
                    <div className="save-btn-group">
                      <button className="btn btn-save">Save and add</button>
                      <DropdownButton
                        title={
                          <i
                            className={
                              mealVisibility === 'private'
                                ? 'fad fa-user-shield'
                                : 'fad fa-users'
                            }
                          />
                        }
                        key={1}
                        id={`dropdown-basic-${1}`}
                        pullRight
                      >
                        <MenuItem
                          eventKey="1"
                          onClick={() =>
                            this.handleChangeMealVisibility('private')
                          }
                        >
                          <i className="fad fa-user-shield" /> Private
                        </MenuItem>
                        <MenuItem
                          eventKey="2"
                          onClick={() =>
                            this.handleChangeMealVisibility('public')
                          }
                        >
                          <i className="fad fa-users" /> Public
                        </MenuItem>
                      </DropdownButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-content">
              <div className="content active">
                <div className="body-content workouts-bg mt-5">
                  <div className="row justify-content-start no-gutters">
                    <div className="col-xs-12 col-md-9 d-flex">
                      <NutritionMealBodyContent
                        quickTab={quickTab}
                        recentMeals={recentMeals}
                        addTodayMeals={this.addTodayMeals}
                        handleChangeQuickTab={this.handleChangeQuickTab}
                      />
                    </div>
                    <div className="col-xs-12 col-md-3 d-flex">
                      <NutritionMealCreateSidebar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
  addTodayMeals = () => {};
  handleChangeQuickTab = action => {
    this.setState({ quickTab: action });
  };
  handleChangeMealVisibility = action => {
    this.setState({ mealVisibility: action });
  };
  componentDidUpdate(prevProps, prevState) {
    const { dispatch, recentMealsLoading, recentMeals } = this.props;
    if (recentMealsLoading) {
      dispatch(showPageLoader());
    }
    if (!recentMealsLoading && prevProps.recentMeals !== recentMeals) {
      dispatch(hidePageLoader());
    }
  }
}

const mapStateToProps = state => {
  const { meal } = state;
  return {
    recentMealsLoading: meal.get('recentMealsLoading'),
    recentMeals: meal.get('recentMeals'),
    recentMealsError: meal.get('recentMealsError'),
  };
};

export default connect(mapStateToProps)(NutritionMealCreate);
