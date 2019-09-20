import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';
import SweetAlert from 'react-bootstrap-sweetalert';
import CalendarDayOverViewNutritionList from './CalendarDayOverViewNutritionList';

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
  } = props;
  return (
    <React.Fragment>
      <div className="whitebox-body meals-bg border-left border-right">
        <div className="meals-top d-flex">
          {/* <NutritionMealAddSearchForm
                    onSubmit={this.handleSearch}
                    addTodayMeals={this.addTodayMeals}
                  /> */}
          <h3 className="title-h3 size-14">Meals</h3>
          <Link
            to="#"
            className="btn btn-success ml-auto plus-btn"
            onClick={setNutritionTab}
          >
            <FontAwesomeIcon icon="plus" />
          </Link>
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
                    showDeleteAlert: false,
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
              {meal_list.map((meal, index) => (
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
            </div>
          </Scrollbars>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarDayNutritionView;
