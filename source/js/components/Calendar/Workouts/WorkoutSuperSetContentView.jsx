import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { prepareExerciseOptions } from "../../../helpers/funs";

const WorkoutSuperSetContentView = props => {
  const { index, exercise } = props;
  const { exercises, setsDetails } = exercise;
  const optionsList = exercise ? prepareExerciseOptions(exercise) : [];
  console.log("==========exercise============");
  console.log(exercise);
  console.log(optionsList);
  console.log("==========================");
  return (
    <React.Fragment>
      <div className="col-xs-12 col-lg-12">
        <div className="excercise-boxs" style={{ margin: "5px" }}>
          <div className="excercise-number">
            <span>{String.fromCharCode(97 + parseInt(index))}.</span>
          </div>
          <div className="excercise-right p-0">
            <div className="topbar-title">
              <h3>{exercises.name}</h3>
              <div role="toolbar" className="btn-toolbar ml-auto">
                <ButtonToolbar className="boxing-icon border-right">
                  <Dropdown id={`workout-actions-1`} pullRight>
                    <Dropdown.Toggle noCaret>
                      <i className="icon-more_horiz" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <MenuItem
                        eventKey="1"
                        onClick={() => this.handelChange("advanceView")}
                      >
                        Advance Display
                      </MenuItem>
                      <MenuItem
                        eventKey="2"
                        onClick={() => this.handelChange("normalView")}
                      >
                        Move Exercise
                      </MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonToolbar>
                <button type="button" className="timline-post-del-btn">
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              </div>
            </div>
            <div
              className="excercise-content animated fadeIn"
              style={{ background: "#201f60" }}
            >
              {setsDetails.map((item, x) => (
                <React.Fragment>
                  <div className="row no-gutters" key={x}>
                    <div className="col-xs-12 col-lg-3">
                      <span className="warmup-title">Reps:</span>
                    </div>
                    <div className="col-xs-12 col-lg-4">
                      <div className="serving-boxs">
                        <button className="btn btn-minus">
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={item.field1.value}
                        />
                        <button className="btn btn-plus">
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-4">
                      <div className="serving-select">
                        <select
                          className="form-control"
                          defaultValue={item.field1.unit}
                        >
                          <option value="second">Seconds</option>
                          <option value="minute">Minutes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row no-gutters">
                    <div className="col-xs-12 col-lg-3">
                      <span className="warmup-title">Weight:</span>
                    </div>
                    <div className="col-xs-12 col-lg-4">
                      <div className="serving-boxs">
                        <button className="btn btn-minus">
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={item.field2.value}
                        />
                        <button className="btn btn-plus">
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-4">
                      <div className="serving-select">
                        <select
                          className="form-control"
                          defaultValue={item.field2.unit}
                        >
                          <option value="second">Seconds</option>
                          <option value="minute">Minutes</option>
                        </select>
                      </div>
                    </div>
                  </div>{" "}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkoutSuperSetContentView;
