import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarDayWorkoutView from '../Workouts/CalendarDayWorkoutView';
import CalendarDayFitnessItemsList from './CalendarDayFitnessItemsList';

class CalendarDayFitnessTestList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="excercise-boxs">
          <div className="excercise-number">
            <span>1.</span>
          </div>
          <div className="excercise-right">
            <div className="topbar-title">
              <h3>Timed Run</h3>
              <div role="toolbar" className="btn-toolbar ml-auto">
                <button type="button" className="timline-post-del-btn">
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              </div>
            </div>
            <CalendarDayFitnessItemsList />
          </div>
        </div>
        <div className="excercise-boxs">
          <div className="excercise-number">
            <span>2.</span>
          </div>
          <div className="excercise-right">
            <div className="topbar-title">
              <h3>Timed Run</h3>
              <div role="toolbar" className="btn-toolbar ml-auto">
                <button type="button" className="timline-post-del-btn">
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              </div>
            </div>
            <CalendarDayFitnessItemsList />
          </div>
        </div>
        <div className="excercise-boxs">
          <div className="excercise-number">
            <span>3.</span>
          </div>
          <div className="excercise-right">
            <div className="topbar-title">
              <h3>Timed Run</h3>
              <div role="toolbar" className="btn-toolbar ml-auto">
                <button type="button" className="timline-post-del-btn">
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              </div>
            </div>
            <CalendarDayFitnessItemsList />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayFitnessTestList;
