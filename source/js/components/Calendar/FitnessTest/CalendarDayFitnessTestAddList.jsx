import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Star from '../../../../assets/svg/star.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CalendarDayFitnessTestAddList extends Component {
  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="blue_right_sidebar addfitnesstest-sidebar">
            <h2 className="h2_head_one">Add Fitness Test</h2>

            <div className="tab-content">
              <div className="recent-ingredient">
                <Scrollbars autoHide>
                  <ul>
                    <li className="input-box-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search"
                      />
                      <span className="search-icon">
                        <FontAwesomeIcon icon="search" />
                      </span>
                    </li>
                    <li>
                      <span className={'star_one active'}>
                        <Star />
                      </span>
                      <h3>Rep Max</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                    <li>
                      <h3>Mobility</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                    <li>
                      <h3>Step Test</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                    <li>
                      <h3>Bleep Test</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                    <li>
                      <h3>Bodyweight Variation</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                    <li>
                      <h3>Flexibility</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                    <li>
                      <h3>Posture</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                    <li>
                      <h3>Rockport Walk Test</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>

                    <li>
                      <span className={'star_one active'}>
                        <Star />
                      </span>
                      <h3>Timed Run</h3>
                      <div className="add_drag">
                        <FontAwesomeIcon icon="plus-circle" />
                      </div>
                    </li>
                  </ul>
                </Scrollbars>
              </div>
            </div>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default CalendarDayFitnessTestAddList;
