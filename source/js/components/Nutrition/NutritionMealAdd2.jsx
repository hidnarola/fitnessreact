import React, { Component } from 'react';
import AddMetaDescription from '../global/AddMetaDescription';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { NavLink } from 'react-router-dom';
import { routeCodes } from '../../constants/routes';
import NutritionMealAddForm from './NutritionMealAddForm';

class NutritionMealAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuurentTab: '#Ingredients',
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Add Meal | Fitly</title>
          </AddMetaDescription>
          <FitnessHeader />
          <FitnessNav />
          <section className="body-wrap nutrition-todays-meal-section">
            <div className="body-head d-flex justify-content-start front-white-header custome_header">
              <div className="body-head-l">
                <div className="tabs">
                  <div
                    className={
                      this.state.cuurentTab === '#Ingredients'
                        ? 'tab active'
                        : 'tab '
                    }
                    id="Ingredients"
                  >
                    <a
                      onClick={e => {
                        this.setState({ cuurentTab: '#Ingredients' });
                      }}
                      href="#Ingredients"
                    >
                      Ingredients
                    </a>
                  </div>

                  <div
                    className={
                      this.state.cuurentTab === '#Photos' ? 'tab active' : 'tab'
                    }
                    id="Photos"
                  >
                    <a
                      onClick={e => {
                        this.setState({ cuurentTab: '#Photos' });
                      }}
                      href="#Photos"
                    >
                      Photos
                    </a>
                  </div>

                  <div
                    className={
                      this.state.cuurentTab === '#Instruction'
                        ? 'tab active'
                        : 'tab'
                    }
                    id="Instruction"
                  >
                    <a
                      onClick={e => {
                        this.setState({ cuurentTab: '#Instruction' });
                      }}
                      href="#Instruction"
                    >
                      Instruction
                    </a>
                  </div>

                  <div
                    className={
                      this.state.cuurentTab === '#Notes' ? 'tab  active' : 'tab'
                    }
                    id="Notes"
                  >
                    <a
                      onClick={e => {
                        this.setState({ cuurentTab: '#Notes' });
                      }}
                      href="#Notes"
                    >
                      Notes
                    </a>
                  </div>
                </div>
              </div>
              <div className="body-head-r">
                <NavLink to={routeCodes.CALENDAR_OVERVIEW}>
                  <i className="icon-arrow_back"></i>
                  Back to Nutrition
                </NavLink>
              </div>
            </div>

            <NutritionMealAddForm cuurentTab={this.state.cuurentTab} />
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default NutritionMealAdd;
