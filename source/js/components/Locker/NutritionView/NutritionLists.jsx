import React, { Component } from "react";
import Star from "../../../../assets/svg/star.svg";
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cns from "classnames";

class NutritionLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servingSize: 0,
      servingDiff: "easy",
      activeTab: "nutrition"
    };
  }
  componentDidMount() {
    const { index, meal } = this.props;
    if (meal) {
      this.setState({
        servingSize: meal.serves,
        servingDiff: meal.serving_difficulty
      });
    }
  }
  render() {
    const {
      meal,
      authuserId,
      recentMeals = [],
      addToFavourite,
      index
    } = this.props;
    let _id = 0;
    let total_enerc_kal = 0;
    let total_procnt = 0;
    let total_fat = 0;
    let total_cabs = 0;
    let total_sugar = 0;
    let total_saturates = 0;
    let userId = 0;
    let ingredientsIncluded = [];
    let categories = { kesor: true };
    let serves = 0;
    let serving_difficulty = "easy";

    const { open, servingSize, servingDiff, activeTab } = this.state;
    console.log("===========mealDETAILS===========");
    console.log("mealDETAILS", meal);
    console.log("==========================");
    return (
      <React.Fragment>
        <div className="nutrition-box width-100-per">
          <div className="nutrition-header align-items-center">
            <div
              // className={cns("display-star", {
              //   active: _.some(recentMeals, { _id: meal._id })
              // })}
              // onClick={e =>
              //   addToFavourite(meal._id, _.some(recentMeals, { _id: meal._id }))
              // }
              className="display-star"
            >
              <Star />
            </div>
            <div className="title">Apple</div>
          </div>
          <div className="nutrition-body d-flex flex-wrap">
            <div className="nutrition-panel">
              <h3>M</h3>
              <ul>
                {categories &&
                  Object.keys(categories)
                    .filter((k, i) => {
                      console.log("categories", k.substr(0, 2), categories[k]);
                      return categories[k];
                    })
                    .map(k => (
                      <li key={k} className="text-capitalize">
                        {k.substr(0, 2)}
                      </li>
                    ))}
              </ul>
            </div>
            <div className="nutrition-serve-box ml-2 mr-2">
              <div className="row width-100-per no-gutters">
                <div className="col-md-4">
                  <div
                    className="serving-size border-right"
                    style={{ lineHeight: "1.8", fontSize: "18px" }}
                  >
                    Serving Size
                  </div>
                </div>
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <div className="serving-select border-left width-100-per m-0">
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
                      <li
                        className={cns({ active: activeTab === "ingredient" })}
                        onClick={() =>
                          this.setState({ activeTab: "ingredient" })
                        }
                      >
                        <a href="#">Ingredients</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* {activeTab === "ingredient" && (
                  <div className="col-md-12">
                    <div className="ingredient-boxs mt-1">
                      <div
                        className="title"
                        style={{ background: "#fff", color: "#8588AD" }}
                      >
                        Ingredients
                      </div>
                      <ul>
                        {ingredientsIncluded &&
                          ingredientsIncluded.map((item, ing_index) => (
                            <li
                              key={ing_index}
                              className="d-flex width-100-per"
                            >
                              <span className="ingredient-name">
                                {this.getIngredientNames(item.ingredient_id)}
                              </span>
                              <span className="ml-auto">
                                {item.serving_input}
                                {item.ingredient_unit}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )} */}
                {activeTab === "nutrition" && (
                  <div className="col-md-12">
                    <div className="ingredient-boxs mt-1">
                      <div
                        className="title d-flex width-100-per"
                        style={{ background: "#fff", color: "#8588AD",fontSize:"18px" }}
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
  getIngredientNames = ingredient_id => {
    const { meals_proximates } = this.props;
    if (meals_proximates && meals_proximates.length > 0) {
      let proxi = meals_proximates.filter(item => item._id === ingredient_id);
      return proxi[0].foodName;
    } else {
      return "";
    }
  };
}

export default NutritionLists;
