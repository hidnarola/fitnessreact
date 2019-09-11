import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CalendarMeasurementList = props => {
  return (
    <React.Fragment>
      <li>
        <h3>Neck</h3>
        <div className="add_drag">
          <FontAwesomeIcon icon="plus-circle" />
        </div>
      </li>
      <li>
        <h3>Shoulders</h3>
        <div className="add_drag">
          <FontAwesomeIcon icon="plus-circle" />
        </div>
      </li>
      <li>
        <h3>Chest</h3>
        <div className="add_drag">
          <FontAwesomeIcon icon="plus-circle" />
        </div>
      </li>
      <li>
        <h3>Bicep</h3>
        <div className="add_drag">
          <FontAwesomeIcon icon="plus-circle" />
        </div>
      </li>
      <li>
        <h3>Forearm</h3>
        <div className="add_drag">
          <FontAwesomeIcon icon="plus-circle" />
        </div>
      </li>
      <li>
        <h3>Wrist</h3>
        <div className="add_drag">
          <FontAwesomeIcon icon="plus-circle" />
        </div>
      </li>
      <li>
        <h3>Waist</h3>
        <div className="add_drag">
          <FontAwesomeIcon icon="plus-circle" />
        </div>
      </li>
      <li>
        <h3>Hips</h3>
        <div className="add_drag">
          <FontAwesomeIcon icon="plus-circle" />
        </div>
      </li>
      <li>
        <h3>Thigh</h3>
        <div className="add_drag">
          <FontAwesomeIcon icon="plus-circle" />
        </div>
      </li>
    </React.Fragment>
  );
};

export default CalendarMeasurementList;
