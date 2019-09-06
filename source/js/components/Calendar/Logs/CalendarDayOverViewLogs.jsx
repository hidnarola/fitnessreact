import React, { Component } from 'react';
import CalendarDayOverViewLogsList from './CalendarDayOverViewLogsList';

class CalendarDayOverViewLogs extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="body-content workouts-bg">
          <div className="row justify-content-start no-gutters">
            <div className="col-xs-12 col-md-3 d-flex border-right">
              <div className="overview whitebox-body">
                <div className="overview-header">
                  <h3 className="title-h3 size-14">Previous Measuremenst</h3>
                </div>
                <div className="overview-body"></div>
              </div>
            </div>

            <div className="col-xs-12 col-md-6 d-flex border-right">
              <div className="overview whitebox-body">
                <div className="overview-header">
                  <h3 className="title-h3 size-14">Measuremenst</h3>
                </div>
                <div className="overview-body"></div>
              </div>
            </div>

            <div className="col-xs-12 col-md-3 d-flex">
              <div className="blue_right_sidebar">
                <h2 className="h2_head_one">Add Measurement</h2>
                <div className="recent-ingredient">
                  <ul>
                    <li>
                      Neck
                      <div className="add_drag">
                        <i className="icon-control_point" /> Click to Add
                      </div>
                    </li>
                    <li>
                      Shoulders
                      <div className="add_drag">
                        <i className="icon-control_point" /> Click to Add
                      </div>
                    </li>
                    <li>
                      Chest
                      <div className="add_drag">
                        <i className="icon-control_point" /> Click to Add
                      </div>
                    </li>
                    <li>
                      Hips
                      <div className="add_drag">
                        <i className="icon-control_point" /> Click to Add
                      </div>
                    </li>
                  </ul>
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
