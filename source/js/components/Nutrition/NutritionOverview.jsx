import React from 'react';

const NutritionOverview = props => {
  const {
    total_enerc_kal,
    total_procnt,
    total_fat,
    total_chocdf,
    total_sugar,
    total_saturates,
    total_cabs,
  } = props.meal;
  const calcKcl = (total_enerc_kal * 100) / 2000;
  const calcFat = (total_fat * 100) / 18;
  const calcCabs = (total_cabs * 100) / 8;
  const calcProtein = (total_procnt * 100) / 50;
  return (
    <React.Fragment>
      <div className="white-box" style={{ marginBottom: '2rem' }}>
        <div className="whitebox-head d-flex profile-head">
          <h3>Overview</h3>
        </div>
        <div className="whitebox-body">
          <div className="progress-wrap">
            <div className="nutrition-progress">
              <label>Calories</label>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: `${calcKcl}%` }}
                  aria-valuenow={total_enerc_kal}
                  aria-valuemin="0"
                  aria-valuemax={2000}
                ></div>
              </div>
              <span className="progress-text">{total_enerc_kal}/2000 Kcal</span>
            </div>
            <div className="nutrition-progress">
              <label>Fat</label>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: `${calcFat}%` }}
                  aria-valuenow="18"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="progress-text">{total_fat}/18g</span>
            </div>
            <div className="nutrition-progress">
              <label>Cabs</label>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: `${calcCabs}%` }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="progress-text">{total_cabs}/8g</span>
            </div>
            <div className="nutrition-progress">
              <label>Protein</label>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: `${calcProtein}%` }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="progress-text">{total_procnt}/50g</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NutritionOverview;
