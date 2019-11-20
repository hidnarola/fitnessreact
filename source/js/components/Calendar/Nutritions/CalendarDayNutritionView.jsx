import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import SweetAlert from "react-bootstrap-sweetalert";
import CalendarDayOverViewNutritionList from "./CalendarDayOverViewNutritionList";
import NutritionNav from "./Header/NutritionNav";
import NutritionQuickAdd from "./sidebar/NutritionQuickAdd";
import NoRecordFound from "../../Common/NoRecordFound";

const CalendarDayNutritionView = props => {
  const {
    setNutritionTab,
    handleRemoveMealsSubmit,
    showDeleteAlert,
    meal_list,
    recentMeals,
    addToFavourite,
    handleRemoveMeals,
    authuserId,
    logDate
  } = props;
  return (
    <React.Fragment>
      <div className="whitebox-body meals-bg border-left border-right">
        <NutritionNav
          nutritionTab={props.nutritionTab}
          handleChangeTab={props.handleChangeTab}
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
                  {meal_list &&
                    meal_list.length > 0 &&
                    meal_list.map((meal, index) => (
                      <CalendarDayOverViewNutritionList
                        key={index}
                        index={index}
                        meal={meal}
                        recentMeals={recentMeals}
                        addToFavourite={addToFavourite}
                        handleRemoveMeals={handleRemoveMeals}
                        authuserId={authuserId}
                      />
                    ))}
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
              quickTab={props.quickTab}
              recentMeals={props.recentMeals}
              addTodayMeals={props.addTodayMeals}
              handleChangeQuickTab={props.handleChangeQuickTab}
              addToFavourite={props.addToFavourite}
              logDate={logDate}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarDayNutritionView;
