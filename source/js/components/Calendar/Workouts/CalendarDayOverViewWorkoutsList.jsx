import React from 'react';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CalendarDayOverViewWorkoutsList = props => {
  const { workout, index } = props;
  const {
    exercises,
    sets,
    restTime,
    restTimeUnit,
    setsDetails,
  } = workout.exercises[0];
  const { field1, field2 } = setsDetails[0];
  console.log('======= warmup ===========');
  console.log(workout);
  console.log('DATA', workout.exercises[0]);
  console.log('======= warmup ===========');
  return (
    <React.Fragment>
      <div className="excercise-boxs">
        <div className="excercise-number">
          <span>{index + 1}.</span>
        </div>
        <div className="excercise-right">
          <div className="topbar-title">
            <h3>{exercises.name}</h3>
            <div role="toolbar" className="btn-toolbar ml-auto">
              <div className="switch-wrap">
                <small>Advanced View</small>
                <div className="material-switch">
                  <input
                    id={'workout' + index}
                    type="checkbox"
                    checked={false}
                  />
                  <label
                    htmlFor={'workout' + index}
                    className="label-default"
                  ></label>
                </div>
              </div>
              <button type="button" className="timline-post-del-btn">
                <FontAwesomeIcon icon="trash-alt" />
              </button>

              {/* <ButtonToolbar className="boxing-icon">
                <Dropdown id={`workout-actions-1`} pullRight>
                  <Dropdown.Toggle noCaret>
                    <i className="icon-more_horiz"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <MenuItem eventKey="1" onClick={() => console.log('')}>
                      <FaPencil /> Edit
                    </MenuItem>
                    <MenuItem eventKey="2" onClick={() => console.log('')}>
                      <FaTrash /> Delete
                    </MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonToolbar> */}
            </div>
          </div>
          <div className="excercise-content">
            <div className="row no-gutters">
              <div className="col-xs-12 col-lg-2">
                <span className="warmup-title">Sets:</span>
              </div>
              <div className="col-xs-12 col-lg-3">
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
              </div>
              <div className="col-xs-12 col-lg-3">
                <div className="serving-select">
                  <select className="form-control">
                    <option>Grams</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-xs-12 col-lg-2">
                <span className="warmup-title">Rest:</span>
              </div>
              <div className="col-xs-12 col-lg-3">
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
              </div>
              <div className="col-xs-12 col-lg-3">
                <div className="serving-select">
                  <select className="form-control">
                    <option>Grams</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-xs-12 col-lg-2">
                <span className="warmup-title">Time:</span>
              </div>
              <div className="col-xs-12 col-lg-3">
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
              </div>
              <div className="col-xs-12 col-lg-3">
                <div className="serving-select">
                  <select className="form-control">
                    <option>Grams</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-xs-12 col-lg-2">
                <span className="warmup-title">Speed:</span>
              </div>
              <div className="col-xs-12 col-lg-3">
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
              </div>
              <div className="col-xs-12 col-lg-3">
                <div className="serving-select">
                  <select className="form-control">
                    <option>Grams</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarDayOverViewWorkoutsList;
