import React, { Component } from "react";
import Star from "../../../../../assets/svg/star.svg";
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cns from "classnames";

class NutritionActivityList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { index } = this.props;
    this.setState({ servingSize: 0 });
  }
  render() {
    const { meal, authuserId, recentMeals, addToFavourite, index } = this.props;
    const {
      _id,
      total_enerc_kal,
      total_procnt,
      total_fat,
      total_cabs,
      total_sugar,
      total_saturates,
      userId,
      ingredientsIncluded
    } = meal;
    const { open, servingSize = 0 } = this.state;
    console.log("===========meal===========");
    console.log(_.some(recentMeals, { _id: meal._id }));
    console.log("==========================");
    return (
      <React.Fragment>
        <div className="nutrition-box">
          <div className="nutrition-header align-items-center">
            <div
              className={cns("display-star", {
                active: _.some(recentMeals, { _id: meal._id })
              })}
              onClick={e =>
                addToFavourite(meal._id, _.some(recentMeals, { _id: meal._id }))
              }
            >
              <Star />
            </div>
            <div className="title">{meal.title}</div>
            <ButtonToolbar className="boxing-icon ml-auto">
              <Dropdown id={`workout-actions-1`} pullRight>
                <Dropdown.Toggle noCaret>
                  <i className="icon-more_horiz" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem
                    eventKey="1"
                    onClick={() => console.log("advanceView")}
                  >
                    Advance Display
                  </MenuItem>
                  <MenuItem
                    eventKey="2"
                    onClick={() => console.log("normalView")}
                  >
                    Move Exercise
                  </MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonToolbar>
            <button type="button" className="timline-post-del-btn">
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
                <div className="col-md-12">
                  <div className="serving-size mb-1">Serving Size</div>
                </div>
                <div className="col-md-6">
                  <div className="serving-boxs width-100-per m-0">
                    <button
                      className="btn btn-minus"
                      onClick={() =>
                        this.setState({
                          servingSize:
                            servingSize > 0 && servingSize < 999
                              ? servingSize - 1
                              : servingSize
                        })
                      }
                    >
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      name="servingSize"
                      className="form-control"
                      value={servingSize}
                      onChange={e =>
                        this.setState({
                          servingSize:
                            e.target.value >= 0 && e.target.value <= 999
                              ? e.target.value
                              : servingSize
                        })
                      }
                      max={999}
                      min={1}
                    />
                    <button
                      className="btn btn-plus"
                      onClick={() =>
                        this.setState({
                          servingSize:
                            servingSize >= 0 && servingSize < 999
                              ? servingSize + 1
                              : servingSize
                        })
                      }
                    >
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="serving-select pl-1 width-100-per m-0">
                    <select className="form-control">
                      <option>cm</option>
                    </select>
                  </div>
                </div>
                {/* <div className="col-md-12">
                  <div className="ingredient-boxs mt-2">
                    <div className="title">Ingredients</div>
                    <ul>
                      {ingredientsIncluded &&
                        ingredientsIncluded.map((item, ing_index) => (
                          <li key={ing_index} className="d-flex width-100-per">
                            <span>Plain Flour</span>
                            <span className="ml-auto">
                              {item.serving_input}
                              {item.ingredient_unit}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div> */}
                <div className="col-md-12">
                  <div className="ingredient-boxs mt-2 pl-1">
                    <div className="title d-flex width-100-per">
                      <div>Nutrition</div>
                      <div className="ml-auto">
                        <FontAwesomeIcon icon="search" />
                      </div>
                    </div>
                    <ul>
                      <li className="d-flex width-100-per">
                        <span>Calories</span>
                        <span className="ml-auto">{total_enerc_kal}kcal</span>
                      </li>
                      <li className="d-flex width-100-per">
                        <span>Fat</span>
                        <span className="ml-auto">{total_fat}g</span>
                      </li>
                      <li className="d-flex width-100-per">
                        <span>Sugar</span>
                        <span className="ml-auto">{total_sugar}g</span>
                      </li>
                      <li className="d-flex width-100-per">
                        <span>Carbohydrates</span>
                        <span className="ml-auto">{total_cabs}g</span>
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
  }
}

export default NutritionActivityList;
