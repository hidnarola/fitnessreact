import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CalendarDayFitnessItemsList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="excercise-content  animated fadeIn">
          <div className="row no-gutters">
            <div className="col-xs-12 col-lg-2">
              <span className="warmup-title">Distance:</span>
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
                  <option>Effort</option>
                  <option>KMPH</option>
                  <option>MPH</option>
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
                  <option>Seconds</option>
                  <option>Minutes</option>
                  <option>Hours</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayFitnessItemsList;
