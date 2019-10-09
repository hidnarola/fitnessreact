import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import exerciseImage from '../../../assets/img/exercise/fitness/exercise-2x.png';

class TodaysPhotosList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="photos-sidebar">
          <div className="photos-header">
            <h3>Today's Photos</h3>
            <button className="btn">
              <FontAwesomeIcon icon="plus" />
            </button>
          </div>
          <div className="photos-body">
            <ul>
              <li>
                <div className="image-box">
                  <div className="image">
                    <img src={exerciseImage} alt="image" />
                  </div>
                  <div className="img-title">
                    <h3>Progress</h3>
                  </div>
                  <div className="img-sub-title">
                    <h4>Fitter Gunshow Running</h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TodaysPhotosList;
