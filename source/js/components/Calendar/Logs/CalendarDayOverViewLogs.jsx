import React, { Component } from 'react';
import CalendarDayOverViewLogsList from './CalendarDayOverViewLogsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import CalendarMeasurementList from './CalendarMeasurementList';

class CalendarDayOverViewLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  render() {
    const { open } = this.state;
    const { measurement } = this.props;
    console.log('THIS>PROPS ===== > ', measurement);
    return (
      <React.Fragment>
        <div className="body-content workouts-bg">
          <div className="row justify-content-start no-gutters">
            <div className="col-xs-12 col-md-3 d-flex border-right">
              <div className="overview whitebox-body">
                <div className="overview-header">
                  <h3 className="title-h3 size-14">Previous Measurement</h3>
                </div>
                <div className="overview-body">
                  <Scrollbars autoHide>
                    <ul className="previous-measurement">
                      <li className="measurement-items">
                        <span className="body-name">Weight</span>
                        <span className="body-text">86 kg</span>
                        <span className="date-text">05/03/2019</span>
                        <span className="day-text">6 day ago</span>
                      </li>
                      <li className="measurement-items">
                        <span className="body-name">Body Fat</span>
                        <span className="body-text">13 %</span>
                        <span className="date-text">05/03/2019</span>
                        <span className="day-text">6 day ago</span>
                      </li>
                      <li className="measurement-items">
                        <span className="body-name">Calf</span>
                        <span className="body-text">24 cm</span>
                        <span className="date-text">05/03/2019</span>
                        <span className="day-text">6 day ago</span>
                      </li>
                    </ul>
                  </Scrollbars>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-6 d-flex border-right">
              <div className="overview whitebox-body">
                <div className="overview-header">
                  <h3 className="title-h3 size-14">Measurement</h3>
                </div>
                <div className="overview-body">
                  <Scrollbars autoHide>
                    <ul className="list-measurement">
                      <li className="list-measurement-items">
                        <div className="display-serve">
                          <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                            <div className="col-xs-12 col-lg-2">
                              <h3>Weight</h3>
                            </div>
                            <div className="col-xs-12 col-lg-5">
                              <div className="serving-boxs width-100-per m-0">
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
                            <div className="col-xs-12 col-lg-5 d-flex flex-wrep align-items-center">
                              <div className="serving-select pl-3 width-100-per">
                                <select className="form-control">
                                  <option>KG</option>
                                </select>
                              </div>
                              <span className="btn-trash">
                                <FontAwesomeIcon icon="trash-alt" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-measurement-items">
                        <Collapse in={open}>
                          <div
                            id="example-collapse-text"
                            className="collapse-list-section"
                          >
                            <h2>Body fat calculator</h2>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Orci ac auctor augue
                              mauris augue neque.
                            </p>
                            <ul className="body-list">
                              <li className="body-list-items">
                                <div className="display-serve">
                                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                                    <div className="col-xs-12 col-lg-2">
                                      <h3>Weight</h3>
                                    </div>
                                    <div className="col-xs-12 col-lg-5">
                                      <div className="serving-boxs width-100-per m-0">
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
                                    <div className="col-xs-12 col-lg-5 d-flex flex-wrep align-items-center">
                                      <h3 className="pl-3">CM</h3>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="body-list-items">
                                <div className="display-serve">
                                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                                    <div className="col-xs-12 col-lg-2">
                                      <h3>Weight</h3>
                                    </div>
                                    <div className="col-xs-12 col-lg-5">
                                      <div className="serving-boxs width-100-per m-0">
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
                                    <div className="col-xs-12 col-lg-5 d-flex flex-wrep align-items-center">
                                      <h3 className="pl-3">CM</h3>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="body-list-items">
                                <div className="display-serve">
                                  <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                                    <div className="col-xs-12 col-lg-2">
                                      <h3>Weight</h3>
                                    </div>
                                    <div className="col-xs-12 col-lg-5">
                                      <div className="serving-boxs width-100-per m-0">
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
                                    <div className="col-xs-12 col-lg-5 d-flex flex-wrep align-items-center">
                                      <h3 className="pl-3">CM</h3>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </Collapse>
                        <div className="display-serve">
                          <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                            <div className="col-xs-12 col-lg-2">
                              <h3>Body Fat</h3>
                            </div>
                            <div className="col-xs-12 col-lg-5">
                              <div className="serving-boxs width-100-per m-0">
                                <button className="btn btn-minus">
                                  <FontAwesomeIcon icon="minus" />
                                </button>
                                <input
                                  type="number"
                                  className="form-control"
                                  defaultValue="12"
                                />
                                <button className="btn btn-plus">
                                  <FontAwesomeIcon icon="plus" />
                                </button>
                              </div>
                            </div>
                            <div className="col-xs-12 col-lg-5 d-flex flex-wrap align-items-center">
                              <h3 className="pl-3">Percent</h3>
                              <div className="serving-percentage">
                                <Button
                                  className="btn btn-default"
                                  onClick={() =>
                                    this.setState({ open: !this.state.open })
                                  }
                                  aria-controls="example-collapse-text"
                                  aria-expanded={open}
                                >
                                  <FontAwesomeIcon icon="calculator" />
                                </Button>
                              </div>
                              <span className="btn-trash">
                                <FontAwesomeIcon icon="trash-alt" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-measurement-items">
                        <div className="display-serve">
                          <div className="row no-gutters width-100-per d-flex flex-wrap align-items-center">
                            <div className="col-xs-12 col-lg-2">
                              <h3>Ankle</h3>
                            </div>
                            <div className="col-xs-12 col-lg-5">
                              <div className="serving-boxs width-100-per">
                                <button className="btn btn-minus">
                                  <FontAwesomeIcon icon="minus" />
                                </button>
                                <input
                                  type="number"
                                  className="form-control"
                                  defaultValue="15"
                                />
                                <button className="btn btn-plus">
                                  <FontAwesomeIcon icon="plus" />
                                </button>
                              </div>
                            </div>
                            <div className="col-xs-12 col-lg-5 d-flex flex-wrep align-items-center">
                              <div className="serving-select pl-3 width-100-per">
                                <select className="form-control">
                                  <option>cm</option>
                                </select>
                              </div>
                              <span className="btn-trash">
                                <FontAwesomeIcon icon="trash-alt" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Scrollbars>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-3 d-flex">
              <div className="blue_right_sidebar">
                <h2 className="h2_head_one">Add Measurement</h2>
                <div className={'tab-content'}>
                  <div className="recent-ingredient">
                    <Scrollbars autoHide>
                      <ul>
                        <CalendarMeasurementList />
                      </ul>
                    </Scrollbars>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayOverViewLogs;
