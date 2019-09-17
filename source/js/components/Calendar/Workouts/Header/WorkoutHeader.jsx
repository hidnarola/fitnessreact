import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from '../../../../../assets/svg/star.svg';

const WorkoutHeader = props => {
  const { workout, completeWorkout, handleCompleteWorkout, index } = props;
  return (
    <React.Fragment>
      <div className="exercise-header">
        <ul className="tabs">
          <li className="tab active">
            <a href="#">Running 1</a>
          </li>
          <li className="tab">
            <a href="#">Chest 3</a>
            <span className="star-icon">
              <Star />
            </span>
          </li>
          <li className="tab">
            <a href="#">
              <FontAwesomeIcon icon="plus" />
            </a>
          </li>
        </ul>
        <div className="switch-wrap ml-auto">
          <small>Workout complete</small>
          <div className="material-switch">
            <input
              id={'workout' + index}
              type="checkbox"
              checked={completeWorkout}
              onChange={() => handleCompleteWorkout(workout)}
            />
            <label
              htmlFor={'workout' + index}
              className="label-default"
            ></label>
          </div>
        </div>
        <div className="star-icon">
          <Star style={{ width: '25px' }} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkoutHeader;
