import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';
import Star from '../../../../assets/svg/star.svg';
import { Scrollbars } from 'react-custom-scrollbars';

const NutritionMealIngredientItems = props => {
  const {
    ingredient,
    changeServing,
    id,
    meal_proximates,
    handleChangeDelete,
  } = props;
  const {
    totalKcl,
    totalfat,
    totalSugar,
    totalCarbs,
    totalCholesterol,
    totalNitrogen,
    totalProtein,
    totalStarch,
    totalWater,
  } = ingredient;
  console.log('===========props.ingredientUnit(meal_proximates)===========');
  console.log(ingredient, meal_proximates);
  console.log('==========================');
  return (
    <React.Fragment>
      <div className="nutrition-box">
        <div className="nutrition-header align-items-center">
          <div className="display-star">
            <Star />
          </div>
          <div className="title">{meal_proximates.foodName}</div>
          <ButtonToolbar className="boxing-icon ml-auto">
            <Dropdown id={`workout-actions-1`} pullRight>
              <Dropdown.Toggle noCaret>
                <i className="icon-more_horiz"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem
                  eventKey="1"
                  onClick={() => console.log('advanceView')}
                >
                  Advance Display
                </MenuItem>
                <MenuItem
                  eventKey="2"
                  onClick={() => console.log('normalView')}
                >
                  Move Exercise
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonToolbar>
          <button
            type="button"
            className="timline-post-del-btn"
            onClick={() => handleChangeDelete(id)}
          >
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </div>
        <div className="nutrition-body d-flex flex-wrap">
          <div className="nutrition-panel">
            <h3>F</h3>
            <ul></ul>
          </div>
          <div className="nutrition-serve-box ml-2 mr-2">
            <div className="row width-100-per no-gutters">
              <div className="col-md-4">
                <div className="serving-size mr-3">Serving Size</div>
              </div>
              <div className="col-md-4">
                <div className="serving-boxs width-100-per m-0">
                  <button
                    className="btn btn-minus"
                    type="button"
                    onClick={(e, serving_size) =>
                      props.changeServing(
                        id,
                        meal_proximates,
                        ingredient.serving_input === 0
                          ? parseInt(ingredient.serving_input)
                          : parseInt(ingredient.serving_input) - 1,
                        ingredient.ingredient_unit,
                        1,
                      )
                    }
                  >
                    <FontAwesomeIcon icon="minus" />
                  </button>
                  <input
                    type="number"
                    className="form-control"
                    value={ingredient.serving_input}
                    onChange={(e, serving_size) =>
                      props.changeServing(
                        id,
                        meal_proximates,
                        e.target.value,
                        ingredient.ingredient_unit,
                        1,
                      )
                    }
                  />
                  <button
                    className="btn btn-plus"
                    type="button"
                    onClick={e =>
                      props.changeServing(
                        id,
                        meal_proximates,
                        parseInt(ingredient.serving_input) + 1,
                        ingredient.ingredient_unit,
                        1,
                      )
                    }
                  >
                    <FontAwesomeIcon icon="plus" />
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="serving-select pl-3 width-100-per">
                  <select
                    name="serving_unit"
                    className="form-control"
                    value={ingredient.ingredient_unit}
                    onChange={e =>
                      props.changeServing(
                        id,
                        meal_proximates,
                        ingredient.serving_input,
                        e.target.value,
                        1,
                      )
                    }
                  >
                    {props.ingredientUnit(meal_proximates).map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="ingredient-boxs mt-2 mr-2">
                  <div className="title">Ingredients</div>
                  <ul>
                    <li className="d-flex width-100-per">
                      <span>Plain Flour</span>
                      <span className="ml-auto">350g</span>
                    </li>
                    <li className="d-flex width-100-per">
                      <span>Eggs</span>
                      <span className="ml-auto">2 whole</span>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="col-md-12">
                <div className="ingredient-boxs mt-2">
                  <div className="title d-flex width-100-per">
                    <div>Nutrition</div>
                    <div className="ml-auto">
                      <FontAwesomeIcon icon="search" />
                    </div>
                  </div>
                  <div className="ingredients-list">
                    <Scrollbars autoHide>
                      <ul>
                        <li className="d-flex width-100-per">
                          <span>Calories</span>
                          <span className="ml-auto">{totalKcl} kcal</span>
                        </li>
                        <li className="d-flex width-100-per">
                          <span>Fat</span>
                          <span className="ml-auto">{totalfat} g</span>
                        </li>
                        <li className="d-flex width-100-per">
                          <span>Sugar</span>
                          <span className="ml-auto">{totalSugar} g</span>
                        </li>
                        <li className="d-flex width-100-per">
                          <span>Carbohydrates</span>
                          <span className="ml-auto">{totalCarbs} g</span>
                        </li>
                        <li className="d-flex width-100-per">
                          <span>Protein</span>
                          <span className="ml-auto">{totalProtein} g</span>
                        </li>
                        <li className="d-flex width-100-per">
                          <span>Water</span>
                          <span className="ml-auto">{totalWater} g</span>
                        </li>
                        <li className="d-flex width-100-per">
                          <span>Starch</span>
                          <span className="ml-auto">{totalStarch} g</span>
                        </li>
                        <li className="d-flex width-100-per">
                          <span>Nitrogen</span>
                          <span className="ml-auto">{totalNitrogen} g</span>
                        </li>
                      </ul>
                    </Scrollbars>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NutritionMealIngredientItems;
