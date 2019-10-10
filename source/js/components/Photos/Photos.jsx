import React, { Component } from 'react';
import TodaysPhotosList from './TodaysPhotosList';
import PhotosDetails from './PhotosDetails';

class Photos extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="body-content create-photos">
          <div className="row justify-content-start no-gutters">
            <div className="col-xs-12 col-md-3 d-flex">
              <div className="whitebox-body meals-bg photos-body border-left border-right">
                <TodaysPhotosList />
              </div>
            </div>
            <div className="col-xs-12 col-md-9 d-flex">
              <div className="whitebox-body meals-bg photos-body border-left">
                <PhotosDetails />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Photos;
