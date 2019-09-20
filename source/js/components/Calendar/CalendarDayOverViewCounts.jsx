import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CalendarDayOverViewCounts = props => {
  // const { mealsList, logsList, workoutsList, measurement } = props;
  // let logCount =
  //   typeof measurement !== 'undefined' &&
  //   measurement !== null &&
  //   Object.keys(measurement).length > 0
  //     ? 1
  //     : 0;
  const { handleChangeNutritionTarget, isNutritionTargetTab } = props;
  return (
    <React.Fragment>
      <div className="overview whitebox-body">
        <div className="overview-header d-flex align-items-center">
          <h3 className="title-h3 size-14">Stats</h3>
          {!isNutritionTargetTab && (
            <a
              href="#"
              className="ml-auto slider-img"
              onClick={() => handleChangeNutritionTarget()}
            >
              <FontAwesomeIcon icon="sliders-h" />
            </a>
          )}
        </div>
        <div className="overview-body">
          <Scrollbars autoHide>
            <div className="progress-wrap">
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Calories</label>
                  <span className="progress-text ml-auto">60/2000 Kcal</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `60%` }}
                    aria-valuenow={60}
                    aria-valuemin="0"
                    aria-valuemax={2000}
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Fat</label>
                  <span className="progress-text ml-auto">18/18g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `18%` }}
                    aria-valuenow="18"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Cabs</label>
                  <span className="progress-text ml-auto">4/8g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `50%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="nutrition-progress">
                <div className="nutrition-title">
                  <label>Protein</label>
                  <span className="progress-text ml-auto">40/50g</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: `80%` }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarDayOverViewCounts;
