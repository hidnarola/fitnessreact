import React from 'react';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';

const CalendarDayOverViewWorkoutsList = props => {
  const { workout } = props;
  const {
    exercises,
    sets,
    restTime,
    restTimeUnit,
    setsDetails,
  } = workout.exercises[0];
  const { field1, field2 } = setsDetails[0];
  console.log('======= warmup ===========');
  console.log(workout);
  console.log('DATA', workout.exercises[0]);
  console.log('======= warmup ===========');
  return (
    <React.Fragment>
      <div className="excercise-boxs">
        <div className="topbar-title">
          <h3>{exercises.name}</h3>
          <div role="toolbar" className="btn-toolbar ml-auto">
            <ButtonToolbar>
              <Dropdown id={`workout-actions-1`} pullRight>
                <Dropdown.Toggle noCaret>
                  <i className="icon-more_horiz"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem eventKey="1" onClick={() => console.log('')}>
                    <FaPencil /> Edit
                  </MenuItem>
                  <MenuItem eventKey="2" onClick={() => console.log('')}>
                    <FaTrash /> Delete
                  </MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonToolbar>
          </div>
        </div>
        <div className="list-boxs">
          <ul>
            <li>
              Sets <span className="ml-auto">{sets}</span>
            </li>
            <li>
              Rest
              <span className="ml-auto">
                {restTime} {restTimeUnit}
              </span>
            </li>
            <li>
              Time{' '}
              <span className="ml-auto">
                {field1.value} {field1.unit}
              </span>
            </li>
            <li>
              Speed{' '}
              <span className="ml-auto">
                {field2.value} {field2.unit}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarDayOverViewWorkoutsList;
