import React, { Component } from 'react';
import CalendarDayOverViewLogsList from './CalendarDayOverViewLogsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';

class CalendarDayOverViewLogs extends Component {
  render() {
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
                      <span className="day-text">4 day ago</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-6 d-flex border-right">
              <div className="overview whitebox-body">
                <div className="overview-header">
                  <h3 className="title-h3 size-14">Measurement</h3>
                </div>
                <div className="overview-body">
                  <ul className="list-measurement">
                    <li className="list-measurement-items">
                      <div className="display-serve">
                        <h3>Weight</h3>
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
                            <option>KG</option>
                          </select>
                        </div>
                        <span className="btn-trash">
                          <FontAwesomeIcon icon="trash-alt" />
                        </span>
                      </div>
                    </li>
                    <li className="list-measurement-items">
                      <div className="display-serve">
                        <h3>Body Fat</h3>
                        <div className="serving-boxs">
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
                        <h3>Percent</h3>
                        <div className="serving-percentage">
                          <button className="btn btn-default">
                            <FontAwesomeIcon icon="calculator" />
                          </button>
                        </div>
                        <span className="btn-trash">
                          <FontAwesomeIcon icon="trash-alt" />
                        </span>
                      </div>
                    </li>
                    <li className="list-measurement-items">
                      <div className="display-serve">
                        <h3>Ankle</h3>
                        <div className="serving-boxs">
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
                        <div className="serving-select">
                          <select className="form-control">
                            <option>cm</option>
                          </select>
                        </div>
                        <span className="btn-trash">
                          <FontAwesomeIcon icon="trash-alt" />
                        </span>
                      </div>
                    </li>
                  </ul>
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
                        <li>
                          <h3>Weight</h3>
                          <div className="add_drag">
                            <FontAwesomeIcon icon="plus-circle" />
                          </div>
                        </li>
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
