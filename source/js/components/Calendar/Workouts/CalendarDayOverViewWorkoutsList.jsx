import React, { Component } from 'react';
import { ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CaledarDayWorkoutAdvanceView from './CaledarDayWorkoutAdvanceView';
import CalendarDayWorkoutView from './CalendarDayWorkoutView';

class CalendarDayOverViewWorkoutsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdvanceView: false,
    };
  }
  handelChange = () => {
    this.setState({ isAdvanceView: !this.state.isAdvanceView });
  };
  render() {
    const { workout, index } = this.props;
    const { isAdvanceView } = this.state;
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
          <div className="excercise-number">
            <span>{index + 1}.</span>
          </div>
          <div className="excercise-right">
            <div className="topbar-title">
              <h3>{exercises.name}</h3>
              <div role="toolbar" className="btn-toolbar ml-auto">
                <div className="switch-wrap">
                  <small>Advanced View</small>
                  <div className="material-switch">
                    <input
                      id={'ex' + index}
                      type="checkbox"
                      checked={isAdvanceView}
                      onChange={this.handelChange}
                    />
                    <label
                      htmlFor={'ex' + index}
                      className="label-default"
                    ></label>
                  </div>
                </div>
                <button type="button" className="timline-post-del-btn">
                  <FontAwesomeIcon icon="trash-alt" />
                </button>

                {/* <ButtonToolbar className="boxing-icon">
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
              </ButtonToolbar> */}
              </div>
            </div>
            {isAdvanceView ? (
              <CaledarDayWorkoutAdvanceView />
            ) : (
              <CalendarDayWorkoutView />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayOverViewWorkoutsList;
