import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NutritionMealCreateLeftSidebar extends Component {
  render() {
    const {
      handleChangeIngredientTab,
      ingredient_list,
      meal_proximates,
    } = this.props;
    return (
      <React.Fragment>
        <div className="ingredient-sidebar">
          <div className="ingredient-header d-flex flex-wrap align-items-center">
            <h3>Ingredient</h3>
            <button
              className="ml-auto"
              onClick={() => handleChangeIngredientTab(true)}
            >
              <FontAwesomeIcon icon="chevron-circle-right" />
            </button>
          </div>
          <div className="ingredient-body">
            <ul>
              {ingredient_list.map((ingredient, index) => (
                <li>
                  <div className="ingredient-items">
                    <div className="box-header d-flex flex-wrap align-items-center">
                      <h3>{meal_proximates[index].foodName}</h3>
                      <FontAwesomeIcon icon="trash-alt" />
                    </div>
                    <div className="row box-inputs no-gutters width-100-per">
                      <div className="col-xs-12 col-lg-5">
                        <div className="serving-boxs">
                          <button className="btn btn-minus">
                            <FontAwesomeIcon icon="minus" />
                          </button>
                          <input
                            type="number"
                            className="form-control"
                            defaultValue={'2'}
                          />
                          <button className="btn btn-plus">
                            <FontAwesomeIcon icon="plus" />
                          </button>
                        </div>
                      </div>
                      <div className="col-xs-12 col-lg-7">
                        <div className="serving-select">
                          <select
                            className="form-control"
                            defaultValue={'second'}
                          >
                            <option value="second">Seconds</option>
                            <option value="minute">Minutes</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              {ingredient_list.length === 0 && (
                <li>
                  <div className="ingredient-items">
                    <div className="box-header d-flex flex-wrap align-items-center">
                      <h3>No Record Found</h3>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NutritionMealCreateLeftSidebar;
