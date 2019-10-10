import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';
import exerciseImage from '../../../assets/img/exercise/fitness/exercise-2x.png';
import exerciseImage2 from '../../../assets/img/exercise/fitness/img-13.jpg';

class TodaysPhotosList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="photos-sidebar">
          <div className="photos-header">
            <h3>Today's Photos</h3>
            <button className="btn ml-auto">
              <FontAwesomeIcon icon="plus" />
            </button>
          </div>
          <div className="photos-sidebar-body">
            <Scrollbars autoHide>
              <ul>
                <li>
                  <div className="image-box">
                    <div className="image">
                      <img
                        src={exerciseImage2}
                        alt="image"
                        className="img-responsive"
                      />
                      <h3 className="img-title">Progress</h3>
                      <div className="img-subtitle">
                        <h4>Fitter Gunshow Running</h4>
                        <i className="fad fa-user-shield ml-auto" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="image-box">
                    <div className="image active">
                      <img
                        src={exerciseImage2}
                        alt="image"
                        className="img-responsive"
                      />
                      <h3 className="img-title">Progress</h3>
                      <div className="img-subtitle">
                        <h4>Fitter Gunshow Running</h4>
                        <i className="fad fa-user-shield ml-auto" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="image-box">
                    <div className="img-list">
                      <img
                        src={exerciseImage}
                        alt="image"
                        className="img-rounded"
                      />
                      <img
                        src={exerciseImage}
                        alt="image"
                        className="img-rounded"
                      />
                      <img
                        src={exerciseImage2}
                        alt="image"
                        className="img-rounded"
                      />
                    </div>
                    <div className="image">
                      <img
                        src={exerciseImage2}
                        alt="image"
                        className="img-responsive"
                      />
                      <h3 className="img-title">Progress</h3>
                      <div className="img-subtitle">
                        <h4>Fitter Gunshow Running</h4>
                        <i className="fad fa-globe-europe ml-auto" />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Scrollbars>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TodaysPhotosList;
