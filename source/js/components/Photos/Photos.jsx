import React, { Component } from 'react';
import TodaysPhotosList from './TodaysPhotosList';

class Photos extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="body-content workouts-bg">
          <div className="row justify-content-start no-gutters">
            <div className="col-xs-12 col-md-3 d-flex">
              <div className="whitebox-body meals-bg border-left border-right">
                <TodaysPhotosList />
              </div>
            </div>
            <div className="col-xs-12 col-md-9 d-flex">
              <div className="whitebox-body meals-bg border-left">
                <h3>Body</h3>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Photos;
