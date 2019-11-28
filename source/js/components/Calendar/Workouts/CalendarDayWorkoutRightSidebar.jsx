import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import Star from "../../../../assets/svg/star.svg";
import Search from "../../../../assets/svg/square.svg";
import Collapse from "react-bootstrap/lib/Collapse";
import Select from "react-select";
import {
  prepareExerciseOptions,
  prepareFieldsOptions,
  ts
} from "../../../helpers/funs";
import SingleExerciseList from "./SingleExerciseList";
import Fuse from "fuse.js";
import CalendarSuperSetWorkoutList from "./CalendarSuperSetWorkoutList";
import { connect } from "react-redux";
import { addUsersWorkoutScheduleRequest } from "../../../actions/userScheduleWorkouts";

class CalendarDayWorkoutRightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseTab: "#single",
      isOpenExerciseDetail: false,
      superSetWorkoutsLists: [],
      circuitWorkoutsLists: [],
      sets: 1,
      restTime: 1,
      restTimeUnit: "minute",
      searchResult: []
    };
  }

  render() {
    const {
      isOpenExerciseDetail,
      superSetWorkoutsLists,
      circuitWorkoutsLists,
      searchResult,
      sets,
      restTime,
      restTimeUnit
    } = this.state;
    const { isActiveQuickTab, exercises, handleAddSingleWorkout } = this.props;
    const optionsList = exercises ? prepareExerciseOptions(exercises) : [];
    console.log("===========superSetWorkoutsList===========");
    console.log(superSetWorkoutsLists);
    console.log("==========================");
    return (
      <React.Fragment>
        <div className="blue_right_sidebar h-100">
          <div className="d-flex width-100-per sidebar-header">
            <h2 className="h2_head_one pt-3 pb-3">Add Exercise</h2>
            <button
              className="btn bg-red btn-plus-right text-white ml-auto"
              onClick={() =>
                this.props.handleSetActiveQuickTab(!isActiveQuickTab)
              }
            >
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
          <div className="quick-tabs">
            <div
              className={
                this.state.exerciseTab === "#single" ? "tab active" : "tab"
              }
            >
              <a
                href="#single"
                onClick={() => {
                  this.setState({ exerciseTab: "#single" });
                }}
              >
                Single
              </a>
            </div>
            <div
              className={
                this.state.exerciseTab === "#superset" ? "tab active" : "tab"
              }
            >
              <a
                href="#superset"
                onClick={() => {
                  this.setState({ exerciseTab: "#superset" });
                }}
              >
                Superset
              </a>
            </div>
            <div
              className={
                this.state.exerciseTab === "#circuit" ? "tab active" : "tab"
              }
            >
              <a
                href="#circuit"
                onClick={() => {
                  this.setState({ exerciseTab: "#circuit" });
                }}
              >
                Circuit
              </a>
            </div>
          </div>
          <div className={"tab-content"}>
            <div
              className="recent-ingredient"
              style={
                this.state.exerciseTab === "#single"
                  ? { height: "57vh" }
                  : { height: "63vh" }
              }
            >
              {this.state.exerciseTab === "#single" && (
                <ul>
                  <li className="input-box-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search"
                      onChange={e =>
                        this.handleSearchExercise(e.target.value, optionsList)
                      }
                    />
                    <span className="search-icon">
                      <FontAwesomeIcon icon="search" />
                    </span>
                  </li>
                </ul>
              )}
              <Scrollbars autoHide>
                {this.state.exerciseTab === "#single" && (
                  <React.Fragment>
                    <ul>
                      {/* <li className="input-box-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Search"
                        />
                        <span className="search-icon">
                          <FontAwesomeIcon icon="search" />
                        </span>
                      </li> */}

                      {searchResult.length === 0 &&
                        optionsList.map((item, index) => (
                          <li onClick={() => handleAddSingleWorkout(item)}>
                            <h3>{item.label}</h3>
                          </li>
                        ))}
                      {searchResult.length > 0 &&
                        searchResult.map((item, index) => (
                          <li onClick={() => handleAddSingleWorkout(item)}>
                            <h3>{item.label}</h3>
                          </li>
                        ))}
                    </ul>
                  </React.Fragment>
                )}
                {this.state.exerciseTab === "#superset" && (
                  <React.Fragment>
                    <div className="superset-section mt-3">
                      <div className="superset-boxs">
                        <h4>Sets</h4>
                        <div className="superset-input">
                          <div className="serving-boxs">
                            <button
                              className="btn btn-minus"
                              onClick={() =>
                                this.handleChangeInput(
                                  "sets",
                                  parseInt(sets) - 1
                                )
                              }
                            >
                              <FontAwesomeIcon icon="minus" />
                            </button>
                            <input
                              type="number"
                              className="form-control"
                              value={sets}
                              onChange={e =>
                                this.handleChangeInput(
                                  "sets",
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <button
                              className="btn btn-plus"
                              onClick={() =>
                                this.handleChangeInput(
                                  "sets",
                                  parseInt(sets) + 1
                                )
                              }
                            >
                              <FontAwesomeIcon icon="plus" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="superset-boxs">
                        <h4>Rest</h4>
                        <div className="superset-input">
                          <div className="serving-boxs">
                            <button
                              className="btn btn-minus"
                              onClick={() =>
                                this.handleChangeInput(
                                  "restTime",
                                  parseInt(restTime) - 1
                                )
                              }
                            >
                              <FontAwesomeIcon icon="minus" />
                            </button>
                            <input
                              type="number"
                              className="form-control"
                              value={restTime}
                              onChange={e =>
                                this.handleChangeInput(
                                  "restTime",
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <button
                              className="btn btn-plus"
                              onClick={() =>
                                this.handleChangeInput(
                                  "restTime",
                                  parseInt(restTime) + 1
                                )
                              }
                            >
                              <FontAwesomeIcon icon="plus" />
                            </button>
                          </div>
                          <div className="serving-select">
                            <select
                              className="form-control"
                              value={restTimeUnit}
                              onChange={e =>
                                this.handleChangeInput(
                                  "restTimeUnit",
                                  parseInt(e.target.value)
                                )
                              }
                            >
                              <option value="second">Seconds</option>
                              <option value="minute">Minutes</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="superset-boxs">
                        <h4>Exercies</h4>
                      </div>
                      <ul>
                        <li className="single-search-exercise p-0 m-0">
                          <Select
                            placeholder="Add exercise"
                            className="width-100-per"
                            options={optionsList}
                            onChange={value =>
                              this.handleAddWorkoutLists(value)
                            }
                          />
                        </li>
                        {superSetWorkoutsLists.map((workout, index) => (
                          <CalendarSuperSetWorkoutList
                            workout={workout}
                            workoutIndex={index}
                            handleSetsDetails={this.handleSetsDetails}
                            type={this.state.exerciseTab}
                          />
                        ))}

                        {/* <li>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Add exercise"
                            />
                            <div className="input-group-prepend">
                              <FontAwesomeIcon icon="plus-circle" />
                            </div>
                          </div>
                        </li> */}

                        {superSetWorkoutsLists.length >= 2 && (
                          <li
                            className="btn-add"
                            onClick={() => this.handleSubmitSupersetWorkout()}
                          >
                            <button className="btn">
                              <i className="far fa-arrow-to-left" /> Add and
                              save
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </React.Fragment>
                )}
                {this.state.exerciseTab === "#circuit" && (
                  <React.Fragment>
                    <div className="superset-section mt-3">
                      <div className="superset-boxs">
                        <h4>Sets</h4>
                        <div className="superset-input">
                          <div className="serving-boxs">
                            <button
                              className="btn btn-minus"
                              onClick={() =>
                                this.handleChangeInput(
                                  "sets",
                                  parseInt(sets) - 1
                                )
                              }
                            >
                              <FontAwesomeIcon icon="minus" />
                            </button>
                            <input
                              type="number"
                              className="form-control"
                              value={sets}
                              onChange={e =>
                                this.handleChangeInput(
                                  "sets",
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <button
                              className="btn btn-plus"
                              onClick={() =>
                                this.handleChangeInput(
                                  "sets",
                                  parseInt(sets) + 1
                                )
                              }
                            >
                              <FontAwesomeIcon icon="plus" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="superset-boxs">
                        <h4>Rest</h4>
                        <div className="superset-input">
                          <div className="serving-boxs">
                            <button
                              className="btn btn-minus"
                              onClick={() =>
                                this.handleChangeInput(
                                  "restTime",
                                  parseInt(restTime) - 1
                                )
                              }
                            >
                              <FontAwesomeIcon icon="minus" />
                            </button>
                            <input
                              type="number"
                              className="form-control"
                              value={restTime}
                              onChange={e =>
                                this.handleChangeInput(
                                  "restTime",
                                  parseInt(e.target.value)
                                )
                              }
                            />
                            <button
                              className="btn btn-plus"
                              onClick={() =>
                                this.handleChangeInput(
                                  "restTime",
                                  parseInt(restTime) + 1
                                )
                              }
                            >
                              <FontAwesomeIcon icon="plus" />
                            </button>
                          </div>
                          <div className="serving-select">
                            <select
                              className="form-control"
                              value={restTimeUnit}
                              onChange={e =>
                                this.handleChangeInput(
                                  "restTimeUnit",
                                  parseInt(e.target.value)
                                )
                              }
                            >
                              <option value="second">Seconds</option>
                              <option value="minute">Minutes</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="superset-boxs">
                        <h4>Exercies</h4>
                      </div>
                      <ul>
                        <li className="single-search-exercise p-0 m-0">
                          <Select
                            placeholder="Add exercise"
                            className="width-100-per"
                            options={optionsList}
                            onChange={value =>
                              this.handleAddWorkoutLists(value)
                            }
                          />
                        </li>
                        {circuitWorkoutsLists.map((workout, index) => (
                          <CalendarSuperSetWorkoutList
                            workout={workout}
                            workoutIndex={index}
                            handleSetsDetails={this.handleSetsDetails}
                            type={this.state.exerciseTab}
                          />
                        ))}

                        {/* <li>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Add exercise"
                            />
                            <div className="input-group-prepend">
                              <FontAwesomeIcon icon="plus-circle" />
                            </div>
                          </div>
                        </li> */}

                        {circuitWorkoutsLists.length >= 1 && (
                          <li
                            className="btn-add"
                            onClick={() => this.handleSubmitSupersetWorkout()}
                          >
                            <button className="btn">
                              <i className="far fa-arrow-to-left" /> Add and
                              save
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </React.Fragment>
                )}
              </Scrollbars>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleSearchExercise = (search, array) => {
    var options = {
      keys: ["label"],
      threshold: 0.1,
      tokenize: true
    };
    var fuse = new Fuse(array, options);
    const result = fuse.search(search);
    this.setState({ searchResult: result });
  };

  handleAddWorkoutLists = obj => {
    let {
      superSetWorkoutsLists,
      circuitWorkoutsLists,
      exerciseTab
    } = this.state;
    const { exerciseMeasurements = [] } = this.props;
    let exercises = [];
    let exerciseDetail;
    let newWorkout;

    let cat = obj.cat ? obj.cat : "";
    let subCat = obj.subCat ? obj.subCat : "";
    console.log("cat => ", cat);
    console.log("subCat => ", subCat);
    let measObj = _.find(exerciseMeasurements, {
      category: cat,
      subCategory: subCat
    });
    console.log("measObj => ", measObj);

    exerciseDetail = {
      differentSets: 0,
      exerciseId: obj.value,
      exerciseObj: obj,
      restTime: 2,
      restTimeUnit: "second",
      sets: 1,
      setsDetails: [
        {
          field1: { value: 1, unit: "" },
          field2: { value: 1, unit: "" },
          field3: null,
          restTime: 0,
          restTimeUnit: "second"
        }
      ],
      field1:
        measObj && measObj.field1 ? prepareFieldsOptions(measObj.field1) : [],
      field2:
        measObj && measObj.field2 ? prepareFieldsOptions(measObj.field2) : [],
      field3:
        measObj && measObj.field3 ? prepareFieldsOptions(measObj.field3) : []
    };
    if (exerciseTab === "#superset") {
      superSetWorkoutsLists.push({ ...exerciseDetail });
      this.setState({ superSetWorkoutsLists });
    } else if (exerciseTab === "#circuit") {
      circuitWorkoutsLists.push({ ...exerciseDetail });
      this.setState({ circuitWorkoutsLists });
    }
  };
  handleChangeInput = (fieldName, value) => {
    this.setState({ [fieldName]: value });
  };

  handleSetsDetails = (
    workoutsListsIndex,
    setDetailIndex,
    fieldName,
    value,
    type
  ) => {
    let { superSetWorkoutsLists, circuitWorkoutsLists } = this.state;
    if (type === "#superset") {
      superSetWorkoutsLists[workoutsListsIndex].setsDetails[setDetailIndex][
        fieldName
      ] = value;
    } else if (type === "#circuit") {
      circuitWorkoutsLists[workoutsListsIndex].setsDetails[setDetailIndex][
        fieldName
      ] = value;
    }
    this.setState({ superSetWorkoutsLists, circuitWorkoutsLists });
  };

  handleSubmitSupersetWorkout = async () => {
    const { logDate, dispatch, workouts, cuurentTab } = this.props;
    let {
      superSetWorkoutsLists,
      circuitWorkoutsLists,
      sets,
      restTime,
      restTimeUnit,
      exerciseTab
    } = this.state;
    let exerciseType;
    let result;
    let subType;
    if (cuurentTab === "#warmup") {
      exerciseType = "warmup";
    } else if (cuurentTab === "#workout") {
      exerciseType = "exercise";
    } else if (cuurentTab === "#cooldown") {
      exerciseType = "cooldown";
    }
    if (exerciseTab === "#superset") {
      subType = "superset";
      superSetWorkoutsLists.forEach(item => {
        item.sets = sets;
        item.restTime = restTime;
        item.restTimeUnit = restTimeUnit;
      });
      this.setState({ superSetWorkoutsLists });
      result = superSetWorkoutsLists.map(
        ({ field1, field2, field3, ...rest }) => ({ ...rest })
      );
    } else if (exerciseTab === "#circuit") {
      console.log("===========circuitWorkoutsLists===========");
      console.log(circuitWorkoutsLists);
      console.log("==========================");
      subType = "circuit";
      circuitWorkoutsLists.forEach(item => {
        item.sets = sets;
        item.restTime = restTime;
        item.restTimeUnit = restTimeUnit;
      });
      this.setState({ circuitWorkoutsLists });
      result = circuitWorkoutsLists.map(
        ({ field1, field2, field3, ...rest }) => ({ ...rest })
      );
    }

    let requestData = {
      exercises: result,
      date: new Date(logDate).toISOString(),
      sequence: workouts.warmup.length + 1,
      subType: subType,
      type: exerciseType,
      userWorkoutsId: workouts._id
    };
    await dispatch(
      addUsersWorkoutScheduleRequest(requestData, res => {
        superSetWorkoutsLists = [];
        circuitWorkoutsLists = [];
        this.setState({
          superSetWorkoutsLists,
          circuitWorkoutsLists,
          sets: 1,
          restTime: 1
        });
        ts("Workout successfully added");
      })
    );
    console.log("===========handleSubmit Superset===========");
    console.log(result);
    console.log("==========================");
  };
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(CalendarDayWorkoutRightSidebar);
