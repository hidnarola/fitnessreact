import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Collapse from "react-bootstrap/lib/Collapse";

class CalendarSuperSetWorkoutList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenExerciseDetail: true
    };
  }
  render() {
    const { isOpenExerciseDetail } = this.state;
    const { workout, handleSetsDetails, workoutIndex } = this.props;
    const { exerciseObj, field1, field2, setsDetails } = workout;
    const field1value = setsDetails[0].field1.value;
    const field1unit = setsDetails[0].field1.unit;
    const field2value = setsDetails[0].field2.value;
    const field2unit = setsDetails[0].field2.unit;
    console.log("===========SuperSet Workout===========");
    console.log(workout);
    console.log();
    console.log("==========================");
    return (
      <React.Fragment>
        <li>
          <h3
            onClick={() =>
              this.setState({
                isOpenExerciseDetail: !isOpenExerciseDetail
              })
            }
          >
            {exerciseObj.label}
          </h3>
          <div
            className="add_drag"
            aria-controls="exerciseDetail-collapse"
            aria-expanded={isOpenExerciseDetail}
          >
            <FontAwesomeIcon
              icon={isOpenExerciseDetail ? "chevron-down" : "chevron-right"}
            />
          </div>
          <div className="delete-icon">
            <FontAwesomeIcon icon="trash-alt" />
          </div>
        </li>
        <Collapse in={isOpenExerciseDetail}>
          <div id="exerciseDetail-collapse">
            <li style={{ background: "#267D79", margin: "0px 0" }}>
              <div className="superset-section">
                <div className="superset-boxs">
                  <h4>Time</h4>
                  <div className="superset-input">
                    <div className="serving-boxs">
                      <button
                        className="btn btn-minus"
                        onClick={() =>
                          handleSetsDetails(workoutIndex, 0, "field1", {
                            value: parseInt(field1value) - 1,
                            unit: field1unit
                          })
                        }
                      >
                        <FontAwesomeIcon icon="minus" />
                      </button>
                      <input
                        type="number"
                        className="form-control"
                        value={field1value}
                        onChange={e =>
                          handleSetsDetails(workoutIndex, 0, "field1", {
                            value: e.target.value,
                            unit: field1unit
                          })
                        }
                      />
                      <button
                        className="btn btn-plus"
                        onClick={() =>
                          handleSetsDetails(workoutIndex, 0, "field1", {
                            value: parseInt(field1value) + 1,
                            unit: field1unit
                          })
                        }
                      >
                        <FontAwesomeIcon icon="plus" />
                      </button>
                    </div>

                    <div className="serving-select">
                      <select
                        className="form-control"
                        value={field1unit}
                        onChange={e =>
                          handleSetsDetails(workoutIndex, 0, "field1", {
                            value: parseInt(field1value),
                            unit: e.target.value
                          })
                        }
                      >
                        <option value="">Select</option>
                        {field1.map((item, i) => (
                          <option value={item.value} key={i}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="superset-boxs">
                  <h4>Speed</h4>
                  <div className="superset-input">
                    <div className="serving-boxs">
                      <button
                        className="btn btn-minus"
                        onClick={() =>
                          handleSetsDetails(workoutIndex, 0, "field2", {
                            value: parseInt(field2value) - 1,
                            unit: field2unit
                          })
                        }
                      >
                        <FontAwesomeIcon icon="minus" />
                      </button>
                      <input
                        type="number"
                        className="form-control"
                        value={field2value}
                        onChange={e =>
                          handleSetsDetails(workoutIndex, 0, "field2", {
                            value: e.target.value,
                            unit: field2unit
                          })
                        }
                      />
                      <button
                        className="btn btn-plus"
                        onClick={() =>
                          handleSetsDetails(workoutIndex, 0, "field2", {
                            value: parseInt(field2value) + 1,
                            unit: field2unit
                          })
                        }
                      >
                        <FontAwesomeIcon icon="plus" />
                      </button>
                    </div>
                    <div className="serving-select">
                      <select
                        className="form-control"
                        value={field2unit}
                        onChange={e =>
                          handleSetsDetails(workoutIndex, 0, "field2", {
                            value: parseInt(field2value),
                            unit: e.target.value
                          })
                        }
                      >
                        <option value="">Select</option>
                        {field2.map((item, i) => (
                          <option value={item.value} key={i}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default CalendarSuperSetWorkoutList;
