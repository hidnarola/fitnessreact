import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CalendarDayWorkoutView = props => {
  const { setsDetails, restTimeUnit, restTime, sets, handelChange } = props;
  console.log('===========VIEW===========');
  console.log(setsDetails);
  console.log('==========================');
  const { field1, field2 } = setsDetails[0];
  const time = field1.value;
  const timeUnit = field1.unit;
  const speed = field2.value;
  const speedUnit = field2.unit;
  return (
    <React.Fragment>
      <div className="excercise-content  animated fadeIn">
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
                defaultValue={sets}
              />
              <button className="btn btn-plus">
                <FontAwesomeIcon icon="plus" />
              </button>
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
                defaultValue={restTime}
              />
              <button className="btn btn-plus">
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
          </div>
          <div className="col-xs-12 col-lg-3">
            <div className="serving-select">
              <select className="form-control" defaultValue={restTimeUnit}>
                <option value="second">Seconds</option>
                <option value="minute">Minutes</option>
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
                defaultValue={time}
              />
              <button className="btn btn-plus">
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
          </div>
          <div className="col-xs-12 col-lg-3">
            <div className="serving-select">
              <select className="form-control" defaultValue={timeUnit}>
                <option value="second">Seconds</option>
                <option value="minute">Minutes</option>
                <option value="hour">Hours</option>
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
                defaultValue={speed}
              />
              <button className="btn btn-plus">
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
          </div>
          <div className="col-xs-12 col-lg-3">
            <div className="serving-select">
              <select className="form-control" defaultValue={speedUnit}>
                <option value="effort">Effort</option>
                <option value="kmph">KMPH</option>
                <option value="mph">MPH</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarDayWorkoutView;
