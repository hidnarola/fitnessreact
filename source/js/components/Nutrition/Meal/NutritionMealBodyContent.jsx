import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NutritionMealCreateLeftSidebar from './NutritionMealCreateLeftSidebar';
import CommentBoxForm from '../../Profile/CommentBoxForm';
import NutritionMealDetails from './NutritionMealDetails';
import NutritionMealInstruction from './NutritionMealInstruction';
import NutritionMealNote from './NutritionMealNote';
import NutritionMealPhotoes from './NutritionMealPhotoes';
import NutritionMealCreateNavbar from './Header/NutritionMealCreateNavbar';
import NutritionQuickAdd from '../../Calendar/Nutritions/sidebar/NutritionQuickAdd';
import NutritionMealIngredientList from './NutritionMealIngredientList';
import NutritionMealCreateQuickAdd from './NutritionMealCreateQuickAdd';

class NutritionMealBodyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveTab: '#details',
      isActiveIngredientTab: false,
    };
  }

  render() {
    const { isActiveTab, isActiveIngredientTab } = this.state;
    return (
      <React.Fragment>
        <div className="whitebox-body meals-bg nutrition-create border-left border-right">
          <div className="meal-input">
            <input
              type="text"
              className="form-control"
              placeholder="Add a title"
            />
          </div>
          <div className="row no-gutters">
            {!isActiveIngredientTab && (
              <React.Fragment>
                <div className="col-md-4 border-right">
                  <NutritionMealCreateLeftSidebar
                    isActiveIngredientTab={isActiveIngredientTab}
                    handleChangeIngredientTab={this.handleChangeIngredientTab}
                  />
                </div>
                <div className="col-md-8">
                  <NutritionMealCreateNavbar
                    isActiveTab={isActiveTab}
                    handleChangeTab={this.handleChangeTab}
                  />
                  <div className="tab-content nutrition-body">
                    {isActiveTab === `#details` && <NutritionMealDetails />}
                    {isActiveTab === `#instructions` && (
                      <NutritionMealInstruction />
                    )}
                    {isActiveTab === `#notes` && <NutritionMealNote />}
                    {isActiveTab === `#photos` && <NutritionMealPhotoes />}
                  </div>
                </div>
              </React.Fragment>
            )}
            {isActiveIngredientTab && (
              <React.Fragment>
                <div className="col-md-8 border-right">
                  <NutritionMealIngredientList
                    handleChangeIngredientTab={this.handleChangeIngredientTab}
                  />
                </div>
                <div className="col-md-4">
                  <NutritionMealCreateQuickAdd
                    key={654}
                    quickTab={this.props.quickTab}
                    recentMeals={this.props.recentMeals}
                    addTodayMeals={this.props.addTodayMeals}
                    handleChangeQuickTab={this.props.handleChangeQuickTab}
                  />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleChangeTab = tab => {
    this.setState({ isActiveTab: tab });
  };
  handleChangeIngredientTab = value => {
    this.setState({ isActiveIngredientTab: value });
  };
}

export default NutritionMealBodyContent;
