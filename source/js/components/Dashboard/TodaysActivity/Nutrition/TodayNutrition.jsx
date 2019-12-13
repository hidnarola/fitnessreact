import React, { Component } from "react";
import { FaCircleONotch } from "react-icons/lib/fa";
import { Scrollbars } from "react-custom-scrollbars";
import NutritionActivityList from "./NutritionActivityList";
import { routeCodes } from "../../../../constants/routes";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cns from "classnames";
import NutritionStatsRightSidebar from "../../../Calendar/Nutritions/sidebar/NutritionStatsRightSidebar";
import { addMealToFavouriteRequest } from "../../../../actions/meal";
import { connect } from "react-redux";
import noNutritionFound from "../../../../../assets/img/no-nutrition-found.png";

class TodayNutrition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "breakfast",
      meal_list: [],
      breakfastList: [],
      lunchList: [],
      dinnerList: [],
      snacksList: [],
      total_enerc_kal: 0,
      total_procnt: 0,
      total_fat: 0,
      total_chocdf: 0,
      total_sugar: 0,
      total_saturates: 0,
      total_cabs: 0
    };
  }
  render() {
    const {
      loading,
      history,
      user_meals,
      recentMeals,
      authuserId
    } = this.props;
    const {
      activeTab,
      breakfastList,
      lunchList,
      dinnerList,
      snacksList
    } = this.state;
    return (
      <React.Fragment>
        <div className="activity-body fithub-body dashboard-nutrition-body">
          {!loading && (
            <div className="exercise-navbar border-bottom">
              <div className="tabs sub-tab">
                <div
                  className={cns("tab", { active: activeTab === "breakfast" })}
                >
                  <a
                    href="#"
                    onClick={() => this.setState({ activeTab: "breakfast" })}
                  >
                    Breakfast
                  </a>
                </div>
                <div className={cns("tab", { active: activeTab === "lunch" })}>
                  <a
                    href="#"
                    onClick={() => this.setState({ activeTab: "lunch" })}
                  >
                    Lunch
                  </a>
                </div>
                <div className={cns("tab", { active: activeTab === "dinner" })}>
                  <a
                    href="#"
                    onClick={() => this.setState({ activeTab: "dinner" })}
                  >
                    Dinner
                  </a>
                </div>
                <div className={cns("tab", { active: activeTab === "snacks" })}>
                  <a
                    href="#"
                    onClick={() => this.setState({ activeTab: "snacks" })}
                  >
                    Snacks
                  </a>
                </div>
                <div className={"tab ml-auto bg-stats"}>
                  <a
                    href="#"
                    onClick={() => this.setState({ activeTab: "stats" })}
                  >
                    <i className="fad fa-chart-area" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* <Scrollbars autoHide>
            {activeTab !== "stats" ? (
              <div className="nutrition-list">
                <NutritionActivityList />
                <NutritionActivityList />
              </div>
            ) : (
              <NutritionStatsRightSidebar />
            )}
          </Scrollbars> */}
          {loading && (
            <div className="loader" key={0}>
              <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
              Loading ...
            </div>
          )}
          {!loading &&
            activeTab === "breakfast" && (
              <Scrollbars autoHide>
                {breakfastList.length === 0 && (
                  <div className="d-flex flex-wrap justify-content-center dashboard-record-not-found">
                    <img
                      src={noNutritionFound}
                      alt="NoWorkoutFound"
                      height="200px"
                    />
                    <h3 className="mt-5">You've not added any</h3>
                    <h3>food for breakfast today</h3>
                  </div>
                )}
                {breakfastList.length > 0 && (
                  <div className="nutrition-list">
                    {breakfastList.map((meal, index) => (
                      <NutritionActivityList
                        key={index}
                        index={index}
                        meal={meal}
                        recentMeals={recentMeals}
                        addToFavourite={this.addToFavourite}
                        authuserId={authuserId}
                        meals_proximates={this.props.meals_proximates}
                      />
                    ))}
                  </div>
                )}
              </Scrollbars>
            )}
          {!loading &&
            activeTab === "lunch" && (
              <Scrollbars autoHide>
                {lunchList.length === 0 && (
                  <div className="d-flex flex-wrap justify-content-center dashboard-record-not-found">
                    <img
                      src={noNutritionFound}
                      alt="NoWorkoutFound"
                      height="200px"
                    />
                    <h3 className="mt-5">You've not added any</h3>
                    <h3>food for lunch today</h3>
                  </div>
                )}
                {lunchList.length > 0 && (
                  <div className="nutrition-list">
                    {lunchList.map((meal, index) => (
                      <NutritionActivityList
                        key={index}
                        index={index}
                        meal={meal}
                        recentMeals={recentMeals}
                        addToFavourite={this.addToFavourite}
                        authuserId={authuserId}
                        meals_proximates={this.props.meals_proximates}
                      />
                    ))}
                  </div>
                )}
              </Scrollbars>
            )}
          {!loading &&
            activeTab === "dinner" && (
              <Scrollbars autoHide>
                {dinnerList.length === 0 && (
                  <div className="d-flex flex-wrap justify-content-center dashboard-record-not-found">
                    <img
                      src={noNutritionFound}
                      alt="NoWorkoutFound"
                      height="200px"
                    />
                    <h3 className="mt-5">You've not added any</h3>
                    <h3>food for dinner today</h3>
                  </div>
                )}
                {dinnerList.length > 0 && (
                  <div className="nutrition-list">
                    {dinnerList.map((meal, index) => (
                      <NutritionActivityList
                        key={index}
                        index={index}
                        meal={meal}
                        recentMeals={recentMeals}
                        addToFavourite={this.addToFavourite}
                        authuserId={authuserId}
                        meals_proximates={this.props.meals_proximates}
                      />
                    ))}
                  </div>
                )}
              </Scrollbars>
            )}
          {!loading &&
            activeTab === "snacks" && (
              <Scrollbars autoHide>
                {snacksList.length === 0 && (
                  <div className="d-flex flex-wrap justify-content-center dashboard-record-not-found">
                    <img
                      src={noNutritionFound}
                      alt="NoWorkoutFound"
                      height="200px"
                    />
                    <h3 className="mt-5">You've not added any</h3>
                    <h3>food for snacks today</h3>
                  </div>
                )}
                {snacksList.length > 0 && (
                  <div className="nutrition-list mb-5">
                    {snacksList.map((meal, index) => (
                      <NutritionActivityList
                        key={index}
                        index={index}
                        meal={meal}
                        recentMeals={recentMeals}
                        addToFavourite={this.addToFavourite}
                        authuserId={authuserId}
                        meals_proximates={this.props.meals_proximates}
                      />
                    ))}
                  </div>
                )}
              </Scrollbars>
            )}
          {!loading &&
            activeTab === "stats" && (
              <Scrollbars autoHide>
                <NutritionStatsRightSidebar />
              </Scrollbars>
            )}
          {!loading && (
            <ul className="workout-list display-workout-btn">
              <li
                className="workout-list-items-btn"
                onClick={() => history.push(routeCodes.CALENDAR_OVERVIEW)}
              >
                <a href="#" className="btn width-100-per">
                  <FontAwesomeIcon icon="plus" /> Add Nutrition
                </a>
              </li>
            </ul>
          )}
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    let newMealList = this.props.user_meals;
    newMealList.forEach(meal => {
      meal.total_enerc_kal = 0;
      meal.total_procnt = 0;
      meal.total_fat = 0;
      meal.total_chocdf = 0;
      meal.total_sugar = 0;
      meal.total_saturates = 0;
      meal.total_cabs = 0;
      meal = this.countIngredientValue(meal);
    });
    this.countIngredient(newMealList);
    this.setState({ meal_list: newMealList }, () => {
      let {
        meal_list,
        breakfastList,
        lunchList,
        dinnerList,
        snacksList
      } = this.state;
      meal_list.forEach(item => {
        item.meals_type === "breakfast" && breakfastList.push(item);
        item.meals_type === "lunch" && lunchList.push(item);
        item.meals_type === "dinner" && dinnerList.push(item);
        item.meals_type === "snacks" && snacksList.push(item);
      });
      this.setState({ breakfastList, lunchList, dinnerList, snacksList });
      console.log("===========user_meals Today Nutrition===========");
      console.log("user_meals breakfast", breakfastList);
      console.log("user_meals lunchList", lunchList);
      console.log("user_meals dinnerList", dinnerList);
      console.log("user_meals snacksList", snacksList);
      console.log("==========================");
    });
  }

  countIngredientValue = obj => {
    return (
      obj.ingredientsIncluded &&
      obj.ingredientsIncluded.forEach(ingredient => {
        const {
          totalKcl,
          totalProtein,
          totalfat,
          totalCholesterol,
          totalSugar,
          totalStarch,
          totalCarbs
        } = ingredient;
        obj.total_enerc_kal =
          totalKcl === "NaN" || totalKcl === NaN
            ? 0
            : parseInt(totalKcl) + obj.total_enerc_kal;
        obj.total_procnt =
          totalProtein === "NaN" || totalProtein === NaN
            ? 0
            : parseInt(totalProtein) + obj.total_procnt;
        obj.total_fat =
          totalfat === "NaN" || totalfat === NaN
            ? 0
            : parseInt(totalfat) + obj.total_fat;
        obj.total_chocdf =
          totalCholesterol === "NaN" || totalCholesterol === NaN
            ? 0
            : parseInt(totalCholesterol) + obj.total_chocdf;
        obj.total_sugar =
          totalSugar === "NaN" || totalSugar === NaN
            ? 0
            : parseInt(totalSugar) + obj.total_sugar;
        obj.total_saturates =
          totalStarch === "NaN" || totalStarch === NaN
            ? 0
            : parseInt(totalStarch) + obj.total_saturates;
        obj.total_cabs =
          totalCarbs === "NaN" || totalCarbs === NaN
            ? 0
            : parseInt(totalCarbs) + obj.total_cabs;
      })
    );
  };
  countIngredient = today_meals => {
    let {
      total_enerc_kal,
      total_procnt,
      total_fat,
      total_chocdf,
      total_sugar,
      total_saturates,
      total_cabs
    } = this.state;
    total_enerc_kal = _.sumBy(today_meals, "total_enerc_kal");
    total_procnt = _.sumBy(today_meals, "total_procnt");
    total_fat = _.sumBy(today_meals, "total_fat");
    total_chocdf = _.sumBy(today_meals, "total_chocdf");
    total_sugar = _.sumBy(today_meals, "total_sugar");
    total_saturates = _.sumBy(today_meals, "total_saturates");
    total_cabs = _.sumBy(today_meals, "total_cabs");
    this.setState({
      total_enerc_kal,
      total_procnt,
      total_fat,
      total_chocdf,
      total_sugar,
      total_saturates,
      total_cabs
    });
  };
  addToFavourite = (meal_id, add) => {
    const { dispatch } = this.props;
    console.log("addToFavourite if not", meal_id);
    dispatch(
      addMealToFavouriteRequest({
        meal_id: meal_id
      })
    );
  };
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(withRouter(TodayNutrition));
