import React from 'react';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import { convertUnits } from '../../../helpers/funs';
import {
  MEASUREMENT_UNIT_GRAM,
  MEASUREMENT_UNIT_KILOGRAM,
  MEASUREMENT_UNIT_CENTIMETER,
  MEASUREMENT_UNIT_POUND,
} from '../../../constants/consts';

const CalendarDayOverViewLogsList = props => {
  const {
    weight,
    height,
    bodyFat,
    calf,
    chest,
    forearm,
    heartRate,
    hips,
    neck,
    shoulders,
    thigh,
    upperArm,
    waist,
  } = props.measurement;
  let bodyUnit = MEASUREMENT_UNIT_CENTIMETER;
  let weightUnit = MEASUREMENT_UNIT_KILOGRAM;
  let poundUnit = MEASUREMENT_UNIT_POUND;
  let kgweight = convertUnits(MEASUREMENT_UNIT_GRAM, weightUnit, weight);
  let poundweight = convertUnits(weightUnit, poundUnit, kgweight).toFixed(2);
  console.log(
    'DATA ============= > > ',
    convertUnits(MEASUREMENT_UNIT_GRAM, weightUnit, weight),
  );
  return (
    <React.Fragment>
      <div className="excercise-boxs">
        <div className="topbar-title">
          <h3>Body Measurement</h3>
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
              Weight{' '}
              <span className="ml-auto">
                {poundweight} {poundUnit}
              </span>
            </li>
            <li>
              Height <span className="ml-auto">{height}</span>
            </li>
            <li>
              Body Fat
              <span className="ml-auto">{bodyFat}</span>
            </li>
            <li>
              Neck <span className="ml-auto">{neck}</span>
            </li>
            <li>
              Shoulders <span className="ml-auto">{shoulders}</span>
            </li>
            <li>
              Chest <span className="ml-auto">{chest}</span>
            </li>
            <li>
              Upper Arm <span className="ml-auto">{upperArm}</span>
            </li>
            <li>
              Waist <span className="ml-auto">{waist}</span>
            </li>
            <li>
              Forearm <span className="ml-auto">{forearm}</span>
            </li>
            <li>
              Hips <span className="ml-auto">{hips}</span>
            </li>
            <li>
              Thigh <span className="ml-auto">{thigh}</span>
            </li>
            <li>
              Calf <span className="ml-auto">{calf}</span>
            </li>
            <li>
              Heart Rate <span className="ml-auto">{heartRate}</span>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarDayOverViewLogsList;
