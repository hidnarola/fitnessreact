import React from "react";
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WorkoutSuperSetContentView from "./WorkoutSuperSetContentView";

const WorkoutSuperSetViewList = props => {
  const { exercises = [] } = props.workout;
  console.log("===========superSet Workout List===========");
  console.log(props.workout);
  console.log("==========================");
  let sets = exercises[0].sets;
  let restTime = exercises[0].restTime;
  let restTimeUnit = exercises[0].restTimeUnit;
  return (
    <React.Fragment>
      <div className="excercise-boxs">
        <div className="excercise-number">
          <span>{props.index + 1}.</span>
        </div>
        <div className="excercise-right">
          <div className="topbar-title">
            <h3>Superset</h3>
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
          <div className="excercise-content animated fadeIn">
            <div className="row no-gutters">
              <div className="col-xs-12 col-lg-3">
                <span className="warmup-title">Sets:</span>
              </div>
              <div className="col-xs-12 col-lg-4">
                <div className="serving-boxs">
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
            <div className="row no-gutters">
              <div className="col-xs-12 col-lg-3">
                <span className="warmup-title">Rest:</span>
              </div>
              <div className="col-xs-12 col-lg-4">
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
              </div>
              <div className="col-xs-12 col-lg-4">
                <div className="serving-select">
                  <select className="form-control" defaultValue={restTimeUnit}>
                    <option value="second">Seconds</option>
                    <option value="minute">Minutes</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              {exercises.map((item, index) => (
                <WorkoutSuperSetContentView
                  exercise={item}
                  key={index}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkoutSuperSetViewList;
