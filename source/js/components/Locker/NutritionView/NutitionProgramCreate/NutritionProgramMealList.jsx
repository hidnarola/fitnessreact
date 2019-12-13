import React, { Component } from "react";
import Star from "../../../../../assets/svg/star.svg";
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cns from "classnames";
import NutritionMealCard from "./NutritionMealCard";
import { Scrollbars } from "react-custom-scrollbars";

class NutritionProgramMealList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="nutrition-progress-meal-list">
          <NutritionMealCard />

          {/* <NutritionFoodCard /> */}
        </div>
      </React.Fragment>
    );
  }
}

export default NutritionProgramMealList;

class NutritionFoodCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servingSize: 0,
      servingDiff: "easy",
      activeTab: "nutrition"
    };
  }
  render() {
    const { meal, authuserId, recentMeals, addToFavourite, index } = this.props;
    let serving_difficulty = "easy";
    let total_enerc_kal = 10;
    let total_procnt = 2;
    let total_fat = 4;
    let total_cabs = 5;
    let total_sugar = 6;
    let total_saturates = 5;
    let userId = "dsfdsf";
    let ingredientsIncluded = [];
    const { servingSize, servingDiff, activeTab } = this.state;
    return (
      <React.Fragment>
        <div className="nutrition-box width-100-per">
          <div className="nutrition-header align-items-center">
            <div className="display-star">
              <Star />
            </div>
            <div className="title">Banana</div>
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
              <i className="fad fa-trash" />
            </button>
          </div>
          <div className="nutrition-body d-flex flex-wrap">
            <div className="nutrition-panel">
              <h3>M</h3>
              <ul>
                {/* {categories &&
                  Object.keys(categories)
                    .filter((k, i) => {
                      console.log("categories", k.substr(0, 2), categories[k]);
                      return categories[k];
                    })
                    .map(k => (
                      <li key={k} className="text-capitalize">
                        {k.substr(0, 2)}
                      </li>
                    ))} */}
                <li className="text-capitalize">ve</li>
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
                    <select
                      className="form-control"
                      defaultValue={serving_difficulty}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="dashboard-nutrition-nav">
                    <ul>
                      <li
                        className={cns({ active: activeTab === "nutrition" })}
                        onClick={() =>
                          this.setState({ activeTab: "nutrition" })
                        }
                      >
                        <a href="#">Nutrition</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {activeTab === "nutrition" && (
                  <div className="col-md-12">
                    <div className="ingredient-boxs mt-1">
                      <div
                        className="title d-flex width-100-per"
                        style={{ background: "#fff", color: "#8588AD" }}
                      >
                        <div>Search Nutrition</div>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
