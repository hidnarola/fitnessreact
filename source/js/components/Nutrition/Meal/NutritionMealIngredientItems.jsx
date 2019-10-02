import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';
import Star from '../../../../assets/svg/star.svg';

const NutritionMealIngredientItems = props => {
  const {
    ingredient,
    changeServing,
    id,
    meal_proximates,
    handleChangeDelete,
  } = props;
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
            <h3>M</h3>
            <ul>
              <li>Ve</li>
              <li>Ka</li>
            </ul>
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
                    onClick={e =>
                      props.changeServing(
                        id,
                        ingredient,
                        ingredient.serving_input === 0
                          ? parseInt(ingredient.serving_input)
                          : parseInt(ingredient.serving_input) - 1,
                        null,
                        null,
                      )
                    }
                  >
                    <FontAwesomeIcon icon="minus" />
                  </button>
                  <input
                    type="number"
                    className="form-control"
                    value={ingredient.serving_input}
                    onChange={e =>
                      props.changeServing(
                        id,
                        ingredient,
                        parseInt(e.target.value),
                        null,
                        null,
                      )
                    }
                  />
                  <button
                    className="btn btn-plus"
                    onClick={e =>
                      props.changeServing(
                        id,
                        ingredient,
                        parseInt(ingredient.serving_input) + 1,
                        null,
                        null,
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
                    className="form-control"
                    onChange={e =>
                      this.changeServing(id, v, null, e.target.value, null)
                    }
                  >
                    {props.ingredientUnit(ingredient).map(i => (
                      <option key={i} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
                <div className="ingredient-boxs mt-2">
                  <div className="title d-flex width-100-per">
                    <div>Nutrition</div>
                    <div className="ml-auto">
                      <FontAwesomeIcon icon="search" />
                    </div>
                  </div>
                  <ul>
                    <li className="d-flex width-100-per">
                      <span>Calories</span>
                      <span className="ml-auto">800 kcal</span>
                    </li>
                    <li className="d-flex width-100-per">
                      <span>Fat</span>
                      <span className="ml-auto">350g</span>
                    </li>
                    <li className="d-flex width-100-per">
                      <span>Sugar</span>
                      <span className="ml-auto">350g</span>
                    </li>
                    <li className="d-flex width-100-per">
                      <span>Carbohydrates</span>
                      <span className="ml-auto">350g</span>
                    </li>
                  </ul>
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
