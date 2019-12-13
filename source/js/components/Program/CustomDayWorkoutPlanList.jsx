import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap";
import _ from "lodash";
import { prepareFieldsOptions } from "../../helpers/funs";
import { EXE_CAT_STRENGTH } from "../../constants/consts";

class CustomDayWorkoutPlanList extends Component {
  render() {
    const { index, workout, exerciseMeasurements } = this.props;
    console.log("===========workout Display===========");
    console.log("workout Display", workout);
    console.log("==========================");
    let { exercises } = workout;
    return (
      <React.Fragment>
        {exercises &&
          exercises.length > 0 &&
          exercises.map((exercise, exIndex) => {
            let { sets, restTimeUnit, restTime, setsDetails } = exercise;
            let { name, subCategory, category } = exercise.exercises;
            let measObj = _.find(exerciseMeasurements, {
              category: category,
              subCategory: subCategory
            });
            let field1OptionsList =
              measObj && measObj.field1
                ? prepareFieldsOptions(measObj.field1)
                : [];
            let field2OptionsList =
              measObj && measObj.field2
                ? prepareFieldsOptions(measObj.field2)
                : [];
            console.log("===========meansObj===========");
            console.log("meansObj", measObj, field1OptionsList);
            console.log("==========================");
            return (
              setsDetails &&
              setsDetails.length === 1 && (
                <div className="wp-exercise-box">
                  <div className="wp-exercise-box-header">
                    <i className="fa fa-star star" />
                    <h3>{name}</h3>
                    <ButtonToolbar className="workoutplan-toolbar ml-auto mr-3">
                      <DropdownButton
                        className="workoutplan-btn d-flex align-items-center"
                        title={<i className="fad fa-ellipsis-h" />}
                        id="dropdown-size-medium"
                        pullRight
                      >
                        <MenuItem eventKey="1"> Edit </MenuItem>
                        <MenuItem eventKey="2"> Copy </MenuItem>
                        <MenuItem eventKey="3"> Cut </MenuItem>
                      </DropdownButton>
                    </ButtonToolbar>
                    <button className="btn btn-delete">
                      <i className="fad fa-trash" />
                    </button>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-md-1 col-sm-12 wp-exercise-leftsidebar">
                      <h3>{index + 1}.</h3>
                    </div>
                    <div className="col-md-11 col-sm-12 wp-exercise-rightsidebar">
                      <div className="row no-gutters border-down">
                        <div className="col-md-4 border-right">
                          <span className="wp-title">Sets :</span>
                        </div>
                        <div className="col-md-8 col-sm-12">
                          <div className="row no-gutters">
                            <div className="col-md-6 border-right">
                              <div className="serving-boxs width-100-per m-0">
                                <button className="btn btn-minus">
                                  <FontAwesomeIcon icon="minus" />
                                </button>
                                <input
                                  type="number"
                                  className="form-control"
                                  defaultValue={sets}
                                />
                                <button className="btn btn-plus">
                                  <FontAwesomeIcon icon="plus" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row no-gutters border-down">
                        <div className="col-md-4 border-right">
                          <span className="wp-title">Rest :</span>
                        </div>
                        <div className="col-md-8 col-sm-12">
                          <div className="row no-gutters">
                            <div className="col-md-6 border-right">
                              <div className="serving-boxs width-100-per m-0">
                                <button className="btn btn-minus">
                                  <FontAwesomeIcon icon="minus" />
                                </button>
                                <input
                                  type="number"
                                  className="form-control"
                                  defaultValue={restTime}
                                />
                                <button className="btn btn-plus">
                                  <FontAwesomeIcon icon="plus" />
                                </button>
                              </div>
                            </div>
                            <div className="col-md-6 border-right">
                              <div className="serving-select width-100-per">
                                <select
                                  className="form-control"
                                  defaultValue={restTimeUnit}
                                >
                                  <option value="second">Seconds</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row no-gutters border-down">
                        <div className="col-md-4 border-right">
                          <span className="wp-title">Time :</span>
                        </div>
                        <div className="col-md-8 col-sm-12">
                          <div className="row no-gutters">
                            <div className="col-md-6 border-right">
                              <div className="serving-boxs width-100-per m-0">
                                <button className="btn btn-minus">
                                  <FontAwesomeIcon icon="minus" />
                                </button>
                                <input
                                  type="number"
                                  className="form-control"
                                  defaultValue={setsDetails[0].field1.value}
                                />
                                <button className="btn btn-plus">
                                  <FontAwesomeIcon icon="plus" />
                                </button>
                              </div>
                            </div>
                            <div className="col-md-6 border-right">
                              <div className="serving-select width-100-per">
                                <select
                                  className="form-control"
                                  defaultValue={setsDetails[0].field1.unit}
                                >
                                  {field1OptionsList.map((item, i) => (
                                    <option key={i} value={item.value}>
                                      {item.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row no-gutters">
                        <div className="col-md-4 border-right">
                          <span className="wp-title">
                            {category === EXE_CAT_STRENGTH
                              ? "Weight :"
                              : "Speed :"}
                          </span>
                        </div>
                        <div className="col-md-8 col-sm-12">
                          <div className="row no-gutters">
                            <div className="col-md-6 border-right">
                              <div className="serving-boxs width-100-per m-0">
                                <button className="btn btn-minus">
                                  <FontAwesomeIcon icon="minus" />
                                </button>
                                <input
                                  type="number"
                                  className="form-control"
                                  defaultValue={setsDetails[0].field2.value}
                                />
                                <button className="btn btn-plus">
                                  <FontAwesomeIcon icon="plus" />
                                </button>
                              </div>
                            </div>
                            <div className="col-md-6 border-right">
                              <div className="serving-select width-100-per">
                                <select
                                  className="form-control"
                                  defaultValue={setsDetails[0].field2.unit}
                                >
                                  {field2OptionsList.map((item, i) => (
                                    <option key={i} value={item.value}>
                                      {item.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
      </React.Fragment>
    );
  }
}

export default CustomDayWorkoutPlanList;
