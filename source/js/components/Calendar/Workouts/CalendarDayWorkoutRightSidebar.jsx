import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';
import Star from '../../../../assets/svg/star.svg';
import Search from '../../../../assets/svg/square.svg';
import Collapse from 'react-bootstrap/lib/Collapse';

class CalendarDayWorkoutRightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseTab: '#single',
      isOpenExerciseDetail: false,
    };
  }
  render() {
    const { isOpenExerciseDetail } = this.state;
    const { isActiveQuickTab } = this.props;
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
                this.state.exerciseTab === '#single' ? 'tab active' : 'tab'
              }
              id="single"
            >
              <a
                href="#single"
                onClick={() => {
                  this.setState({ exerciseTab: '#single' });
                }}
              >
                Single
              </a>
            </div>
            <div
              className={
                this.state.exerciseTab === '#superset' ? 'tab active' : 'tab'
              }
              id="superset"
            >
              <a
                href="#superset"
                onClick={() => {
                  this.setState({ exerciseTab: '#superset' });
                }}
              >
                Superset
              </a>
            </div>
            <div
              className={
                this.state.exerciseTab === '#circuit' ? 'tab active' : 'tab'
              }
              id="circuit"
            >
              <a
                href="#circuit"
                onClick={() => {
                  this.setState({ exerciseTab: '#circuit' });
                }}
              >
                Circuit
              </a>
            </div>
          </div>
          <div className={'tab-content'}>
            <div className="recent-ingredient h-100">
              <Scrollbars autoHide>
                {this.state.exerciseTab === '#single' && (
                  <React.Fragment>
                    <ul>
                      <li className="input-box-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Search"
                        />
                        <span className="search-icon">
                          <FontAwesomeIcon icon="search" />
                        </span>
                      </li>
                      <li>
                        {/* <span className={'star_one active'}>
                          <Star />
                        </span> */}
                        <h3>Bench Press</h3>
                        {/* <div className="add_drag">
                          <FontAwesomeIcon icon="plus-circle" />
                        </div> */}
                      </li>
                      <li>
                        <h3>Upright Row</h3>
                        {/* <div className="add_drag">
                          <FontAwesomeIcon icon="plus-circle" />
                        </div> */}
                      </li>
                      <li>
                        {/* <span className={'star_one active'}>
                          <Star />
                        </span> */}
                        <h3>Pull up</h3>
                        {/* <div className="add_drag">
                          <FontAwesomeIcon icon="plus-circle" />
                        </div> */}
                      </li>
                    </ul>
                  </React.Fragment>
                )}
                {this.state.exerciseTab === '#superset' && (
                  <React.Fragment>
                    <div className="superset-section mt-3">
                      <div className="superset-boxs">
                        <h4>Sets</h4>
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
                      <div className="superset-boxs">
                        <h4>Exercies</h4>
                      </div>
                      <ul>
                        <li>
                          <h3>Deadlift</h3>
                          <div
                            className="add_drag"
                            onClick={() =>
                              this.setState({
                                isOpenExerciseDetail: !isOpenExerciseDetail,
                              })
                            }
                            aria-controls="exerciseDetail-collapse"
                            aria-expanded={isOpenExerciseDetail}
                          >
                            <FontAwesomeIcon
                              icon={
                                isOpenExerciseDetail
                                  ? 'chevron-down'
                                  : 'chevron-right'
                              }
                            />
                          </div>
                          <div className="delete-icon">
                            <FontAwesomeIcon icon="trash-alt" />
                          </div>
                        </li>
                        <Collapse in={isOpenExerciseDetail}>
                          <div id="exerciseDetail-collapse">
                            <li
                              style={{ background: '#267D79', margin: '0px 0' }}
                            >
                              <div className="superset-section">
                                <div className="superset-boxs">
                                  <h4>Weight</h4>
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
                                <div className="superset-boxs">
                                  <h4>Reps</h4>
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
                                  </div>
                                </div>
                              </div>
                            </li>
                          </div>
                        </Collapse>

                        <li>
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
                        </li>

                        <li className="btn-add">
                          <button className="btn">
                            <i className="far fa-arrow-to-left" /> Add and save
                          </button>
                        </li>
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
}

export default CalendarDayWorkoutRightSidebar;
