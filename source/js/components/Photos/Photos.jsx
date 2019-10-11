import React, { Component } from 'react';
import TodaysPhotosList from './TodaysPhotosList';
import PhotosDetails from './PhotosDetails';
import CreatePhotos from './CreatePhotos';

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCreatePhotos: false,
    };
  }
  render() {
    const { isOpenCreatePhotos } = this.state;
    return (
      <React.Fragment>
        <div className="body-content create-photos">
          <div className="row justify-content-start no-gutters">
            {!isOpenCreatePhotos && (
              <React.Fragment>
                <div className="col-xs-12 col-md-3 d-flex">
                  <div className="whitebox-body meals-bg photos-body border-left border-right">
                    <TodaysPhotosList
                      isOpenCreatePhotos={isOpenCreatePhotos}
                      handleChangeCreatePhotos={this.handleChangeCreatePhotos}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-md-9 d-flex">
                  <div className="whitebox-body meals-bg photos-body border-left">
                    <PhotosDetails />
                  </div>
                </div>
              </React.Fragment>
            )}
            {isOpenCreatePhotos && (
              <div className="col-xs-12 col-md-12 d-flex">
                <div className="whitebox-body meals-bg photos-body border-left">
                  <CreatePhotos
                    handleChangeCreatePhotos={this.handleChangeCreatePhotos}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleChangeCreatePhotos = () => {
    this.setState({ isOpenCreatePhotos: !this.state.isOpenCreatePhotos });
  };
}

export default Photos;
