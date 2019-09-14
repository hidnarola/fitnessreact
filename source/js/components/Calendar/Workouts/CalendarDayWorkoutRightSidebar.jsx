import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';
import Star from '../../../../assets/svg/star.svg';

class CalendarDayWorkoutRightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseTab: '#single',
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className="blue_right_sidebar">
          <h2 className="h2_head_one">Add Exercise</h2>
          <div className="tabs">
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
            <div className="recent-ingredient">
              <Scrollbars autoHide>
                {this.state.exerciseTab === '#single' && (
                  <ul>
                    <li>
                      <span className={'star_one active'}>
                        <Star />
                      </span>
                      <h3>Bench Press</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                    <li>
                      <h3>Upright Row</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                    <li>
                      <span className={'star_one active'}>
                        <Star />
                      </span>
                      <h3>Pull up</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                  </ul>
                )}
                {this.state.exerciseTab === '#superset' && (
                  <React.Fragment>
                    <div className="superset-section">
                      <div className="superset-boxs">
                        <h4>Sets</h4>
                        <div className="superset-input ml-auto">
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
                        <div className="superset-input ml-auto">
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
                      <div className="exercies-boxs">
                        <h4>Exercies</h4>
                        <ul>
                          <li>
                            <h3>Incline Bench Press</h3>
                            <div className="add_drag">
                              <FontAwesomeIcon icon="chevron-right" />
                            </div>
                            <div className="delete-icon">
                              <FontAwesomeIcon icon="trash-alt" />
                            </div>
                          </li>
                          <li>
                            <div class="input-group">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Add exercise"
                              />
                              <div class="input-group-prepend">
                                <FontAwesomeIcon icon="plus-circle" />
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
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
