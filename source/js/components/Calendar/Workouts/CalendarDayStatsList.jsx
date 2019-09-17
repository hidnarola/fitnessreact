import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class CalendarDayStatsList extends Component {
  render() {
    const { handleChangeTab, index } = this.props;
    return (
      <React.Fragment>
        <div className="d-flex flex-wrap align-items-center">
          <h3 className="mr-auto mt-5">Stats</h3>
          <Link
            to="#"
            onClick={() => handleChangeTab(`#warmup${index}`)}
            className={'btn btn-danger plus-btn ml-auto'}
          >
            <FontAwesomeIcon icon={'times'} />
          </Link>
        </div>
        <div className="stats-items-list">
          <div className="row">
            <div className="col-md-6 stats">
              <div className="stats-header">Total Weight lifted</div>
              <div className="stats-body align-items-center">
                <div className="weight-text mr-auto">59.6</div>
                <div className="weight-label ml-auto">tonnes</div>
              </div>
            </div>
            <div className="col-md-6 stats">
              <div className="stats-header">Total Weight lifted</div>
              <div className="stats-body align-items-center">
                <div className="weight-text mr-auto">59.6</div>
                <div className="weight-label ml-auto">tonnes</div>
              </div>
            </div>
            <div className="col-md-6 stats">
              <div className="stats-header">Total Weight lifted</div>
              <div className="stats-body align-items-center">
                <div className="weight-text mr-auto">59.6</div>
                <div className="weight-label ml-auto">tonnes</div>
              </div>
            </div>
            <div className="col-md-6 stats">
              <div className="stats-header">Total Weight lifted</div>
              <div className="stats-body align-items-center">
                <div className="weight-text mr-auto">59.6</div>
                <div className="weight-label ml-auto">tonnes</div>
              </div>
            </div>
            <div className="col-md-6 stats">
              <div className="stats-header">Total Weight lifted</div>
              <div className="stats-body align-items-center">
                <div className="weight-text mr-auto">59.6</div>
                <div className="weight-label ml-auto">tonnes</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayStatsList;
