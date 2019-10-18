import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Collapse from "react-bootstrap/lib/Collapse";

class SingleExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenSingleExercise: true
    };
  }
  render() {
    const { isOpenSingleExercise } = this.state;
    const {
      workout,
      handleChangeOnbtn,
      handleChangeInput,
      workoutIndex
    } = this.props;
    const {
      exerciseObj,
      sets,
      restTime,
      restTimeUnit,
      field1
    } = workout.exercises[0];
    console.log("===========workout===========");
    console.log(workout);
    console.log("==========================");
    return (
      <React.Fragment>
        <li>
          <h3
            onClick={() =>
              this.setState({
                isOpenSingleExercise: !isOpenSingleExercise
              })
            }
          >
            {exerciseObj.label}
          </h3>
          {/* <div
            className="add_drag"
            onClick={() =>
              this.setState({
                isOpenSingleExercise: !isOpenSingleExercise
              })
            }
            aria-controls="exerciseDetail-collapse"
            aria-expanded={isOpenSingleExercise}
          >
            <FontAwesomeIcon
              icon={isOpenSingleExercise ? "chevron-down" : "chevron-right"}
            />
          </div>
          <div className="delete-icon">
            <FontAwesomeIcon icon="trash-alt" />
          </div> */}
        </li>
        {/* <Collapse in={isOpenSingleExercise}>
          <div id="exerciseDetail-collapse">
            <li style={{ background: "#267D79", margin: "0px 0" }}>
              <div className="superset-section">
                <div className="superset-boxs">
                  <h4>Sets</h4>
                  <div className="superset-input">
                    <div className="serving-boxs">
                      <button
                        className="btn btn-minus"
                        onClick={() =>
                          handleChangeOnbtn(workoutIndex, 0, "sub")
                        }
                      >
                        <FontAwesomeIcon icon="minus" />
                      </button>
                      <input
                        type="number"
                        className="form-control"
                        value={sets}
                        onChange={e =>
                          handleChangeInput(
                            workoutIndex,
                            0,
                            "sets",
                            e.target.value
                          )
                        }
                      />
                      <button
                        className="btn btn-plus"
                        onClick={() =>
                          handleChangeOnbtn(workoutIndex, 0, "add")
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
                    <div className="serving-select">
                      <select className="form-control">
                        <option value="second">Seconds</option>
                        <option value="minute">Minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="superset-boxs">
                  <h4>Time</h4>
                  <div className="superset-input">
                    <div className="serving-boxs">
                      <button className="btn btn-minus">
                        <FontAwesomeIcon icon="minus" />
                      </button>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue="86"
                      />
                      <button className="btn btn-plus">
                        <FontAwesomeIcon icon="plus" />
                      </button>
                    </div>
                    <div className="serving-select">
                      <select className="form-control">
                        {field1.map((item, i) => (
                          <option value={item.value}>{item.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="superset-boxs">
                  <h4>Speed</h4>
                  <div className="superset-input">
                    <div className="serving-boxs">
                      <button className="btn btn-minus">
                        <FontAwesomeIcon icon="minus" />
                      </button>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue="86"
                      />
                      <button className="btn btn-plus">
                        <FontAwesomeIcon icon="plus" />
                      </button>
                    </div>
                    <div className="serving-select">
                      <select className="form-control">
                        <option>Seconds</option>
                        <option>Minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </Collapse> */}
      </React.Fragment>
    );
  }
}

export default SingleExerciseList;
