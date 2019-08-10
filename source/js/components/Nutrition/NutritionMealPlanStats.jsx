import React from 'react';

const NutritionMealPlanStats = props => {
  const { saveLoading } = props;
  const {
    total_enerc_kal,
    total_procnt,
    total_fat,
    total_cabs,
    today_meals,
  } = props.nutritation;
  return (
    <React.Fragment>
      <div className="recipe-nutrition white-box">
        <div className="whitebox-head meal-paln">
          <h3 className="title-h3 size-14">Meal Plan Stats</h3>
        </div>
        <div className="whitebox-body">
          <div className="dtl-div">
            <ul className="common-ul">
              <li>
                <div className="grey-white">
                  <h4>Total Calories</h4>
                  <h5>
                    {total_enerc_kal}
                    <sub>kcal</sub>
                  </h5>
                </div>
              </li>
              <li>
                <div className="grey-white">
                  <h4>Total Protein</h4>
                  <h5>
                    {total_procnt}
                    <sub>g</sub>
                  </h5>
                </div>
              </li>
              <li>
                <div className="grey-white">
                  <h4>Total Fat</h4>
                  <h5>
                    {total_fat}
                    <sub>g</sub>
                  </h5>
                </div>
              </li>
              <li>
                <div className="grey-white">
                  <h4>Total Carbs</h4>
                  <h5>
                    {total_cabs}
                    <sub>g</sub>
                  </h5>
                </div>
              </li>
              <li className="mt-5">
                <div className="add-log d-flex add-log_change">
                  <button
                    type="submit"
                    className="ml-auto"
                    style={{
                      cursor: saveLoading ? 'not-allowed' : 'pointer',
                    }}
                    onClick={props.handleSaveMeals}
                  >
                    {today_meals.length === 0 ? 'Save Log' : 'Update Log'}
                    <i className="icon-control_point" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div className="nutrition-chart">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NutritionMealPlanStats;
