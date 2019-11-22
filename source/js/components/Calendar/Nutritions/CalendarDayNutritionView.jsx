import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import SweetAlert from "react-bootstrap-sweetalert";
import CalendarDayOverViewNutritionList from "./CalendarDayOverViewNutritionList";
import NutritionNav from "./Header/NutritionNav";
import NutritionQuickAdd from "./sidebar/NutritionQuickAdd";
import NoRecordFound from "../../Common/NoRecordFound";

class CalendarDayNutritionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakfastList: [],
      lunchList: [],
      dinnerList: [],
      snacksList: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { meal_list } = this.props;
    if (prevProps.meal_list !== meal_list) {
      let breakfastList = [];
      let lunchList = [];
      let dinnerList = [];
      let snacksList = [];

      meal_list.forEach(item => {
        if (item.meals_type === "breakfast") {
          breakfastList.push(item);
        } else if (item.meals_type === "lunch") {
          lunchList.push(item);
        } else if (item.meals_type === "dinner") {
          dinnerList.push(item);
        } else {
          snacksList.push(item);
        }
      });
      this.setState({ breakfastList, lunchList, dinnerList, snacksList });
    }
  }

  render() {
    const {
      setNutritionTab,
      handleRemoveMealsSubmit,
      showDeleteAlert,
      meal_list,
      recentMeals,
      addToFavourite,
      handleRemoveMeals,
      authuserId,
      logDate,
      nutritionTab
    } = this.props;
    const { breakfastList, lunchList, dinnerList, snacksList } = this.state;
    console.log("===========meal_list===========");
    console.log("meal_list breakfastList", breakfastList);
    console.log("meal_list lunchList", lunchList);
    console.log("meal_list dinnerList", dinnerList);
    console.log("meal_list snacksList", snacksList);
    console.log("==========================");
    return (
      <React.Fragment>
        <div className="whitebox-body meals-bg border-left border-right">
          <NutritionNav
            nutritionTab={this.props.nutritionTab}
            handleChangeTab={this.props.handleChangeTab}
          />
          <div className="row no-gutters">
            <div className="col-md-8">
              <div className="meals-top d-flex">
                {/* <NutritionMealAddSearchForm
                    onSubmit={this.handleSearch}
                    addTodayMeals={this.addTodayMeals}
                  /> */}
                {/* <h3 className="title-h3 size-14">Meals</h3> */}
                {/* <Link
            to="#"
            className="btn btn-success ml-auto plus-btn"
            onClick={setNutritionTab}
          >
            <FontAwesomeIcon icon="plus" />
          </Link> */}
              </div>
              <div className="nutrition-list">
                <Scrollbars autoHide>
                  <div className="nutrition-boxs">
                    <SweetAlert
                      customClass="sweetalert-responsive"
                      type="default"
                      title={`Are sure want to delete it ?`}
                      onCancel={() => {
                        this.setState({
                          storeMealIndex: null,
                          showDeleteAlert: false
                        });
                      }}
                      onConfirm={handleRemoveMealsSubmit}
                      btnSize="sm"
                      cancelBtnBsStyle="danger"
                      show={showDeleteAlert}
                      showConfirm={true}
                      showCancel={true}
                      closeOnClickOutside={false}
                    />
                    {/* {meal_list &&
                      meal_list.length > 0 &&
                      meal_list.map((meal, index) => {
                        return (
                          <CalendarDayOverViewNutritionList
                            key={index}
                            index={index}
                            meal={meal}
                            recentMeals={recentMeals}
                            addToFavourite={addToFavourite}
                            handleRemoveMeals={handleRemoveMeals}
                            authuserId={authuserId}
                          />
                        );
                      })} */}
                    {nutritionTab === "#breakfast" &&
                      breakfastList.map((meal, index) => (
                        <CalendarDayOverViewNutritionList
                          key={index}
                          index={index}
                          meal={meal}
                          recentMeals={recentMeals}
                          addToFavourite={addToFavourite}
                          handleRemoveMeals={handleRemoveMeals}
                          authuserId={authuserId}
                          meals_proximates={this.props.meals_proximates}
                        />
                      ))}
                    {nutritionTab === "#lunch" &&
                      lunchList.map((meal, index) => (
                        <CalendarDayOverViewNutritionList
                          key={index}
                          index={index}
                          meal={meal}
                          recentMeals={recentMeals}
                          addToFavourite={addToFavourite}
                          handleRemoveMeals={handleRemoveMeals}
                          authuserId={authuserId}
                          meals_proximates={this.props.meals_proximates}
                        />
                      ))}
                    {nutritionTab === "#dinner" &&
                      dinnerList.map((meal, index) => (
                        <CalendarDayOverViewNutritionList
                          key={index}
                          index={index}
                          meal={meal}
                          recentMeals={recentMeals}
                          addToFavourite={addToFavourite}
                          handleRemoveMeals={handleRemoveMeals}
                          authuserId={authuserId}
                          meals_proximates={this.props.meals_proximates}
                        />
                      ))}
                    {nutritionTab === "#snacks" &&
                      snacksList.map((meal, index) => (
                        <CalendarDayOverViewNutritionList
                          key={index}
                          index={index}
                          meal={meal}
                          recentMeals={recentMeals}
                          addToFavourite={addToFavourite}
                          handleRemoveMeals={handleRemoveMeals}
                          authuserId={authuserId}
                          meals_proximates={this.props.meals_proximates}
                        />
                      ))}
                    {nutritionTab === "#breakfast" &&
                      breakfastList.length === 0 && (
                        <div className="meal-not-found-wrapper">
                          <h3>
                            You've not added any foods for breakfast today
                          </h3>
                        </div>
                      )}
                    {nutritionTab === "#lunch" &&
                      lunchList.length === 0 && (
                        <div className="meal-not-found-wrapper">
                          <h3>You've not added any foods for lunch today</h3>
                        </div>
                      )}
                    {nutritionTab === "#dinner" &&
                      dinnerList.length === 0 && (
                        <div className="meal-not-found-wrapper">
                          <h3>You've not added any foods for dinner today</h3>
                        </div>
                      )}
                    {nutritionTab === "#snacks" &&
                      snacksList.length === 0 && (
                        <div className="meal-not-found-wrapper">
                          <h3>You've not added any foods for snacks today</h3>
                        </div>
                      )}
                    {meal_list &&
                      meal_list.length === 0 && (
                        <NoRecordFound title="No meals found for today." />
                      )}
                  </div>
                </Scrollbars>
              </div>
            </div>
            <div className="col-md-4">
              <NutritionQuickAdd
                quickTab={this.props.quickTab}
                recentMeals={this.props.recentMeals}
                addTodayMeals={this.props.addTodayMeals}
                handleChangeQuickTab={this.props.handleChangeQuickTab}
                addToFavourite={this.props.addToFavourite}
                logDate={logDate}
                nutritionTab={nutritionTab}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  noMealsFound = () => {
    return <React.Fragment />;
  };
}

export default CalendarDayNutritionView;
