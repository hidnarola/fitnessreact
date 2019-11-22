import React, { Component } from "react";
import TodaysPhotosList from "./TodaysPhotosList";
import PhotosDetails from "./PhotosDetails";
import CreatePhotos from "./CreatePhotos";
import { getProgressPhotosByDateRequest } from "../../actions/userBodyMeasurement";
import { connect } from "react-redux";
import { hidePageLoader, showPageLoader } from "../../actions/pageLoader";
import { te } from "../../helpers/funs";
import noPhotosFound from "../../../assets/img/no-photos-found.png";

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCreatePhotos: false,
      activeProgressTab: "progressPhoto1",
      activeProgressIndex: 0
    };
  }
  render() {
    const {
      isOpenCreatePhotos,
      activeProgressTab,
      activeProgressIndex
    } = this.state;
    const { logDate, todayProgressPhotos = [] } = this.props;
    return (
      <React.Fragment>
        <div className="body-content create-photos">
          <div className="row justify-content-start no-gutters">
            {!isOpenCreatePhotos && (
              <React.Fragment>
                <div className="col-xs-12 col-md-3 d-flex">
                  <div className="whitebox-body meals-bg photos-body border-left border-right">
                    <TodaysPhotosList
                      logDate={logDate}
                      isOpenCreatePhotos={isOpenCreatePhotos}
                      handleChangeCreatePhotos={this.handleChangeCreatePhotos}
                      todayProgressPhotos={todayProgressPhotos}
                      activeProgressTab={activeProgressTab}
                      handleChangeProgressTab={this.handleChangeProgressTab}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-md-9 d-flex">
                  <div className="whitebox-body meals-bg photos-body border-left">
                    {todayProgressPhotos.length > 0 && (
                      <PhotosDetails
                        activeProgressTab={activeProgressTab}
                        todayProgressPhotoDetail={
                          todayProgressPhotos[activeProgressIndex]
                        }
                        todayProgressPhotos={todayProgressPhotos}
                      />
                    )}
                    {todayProgressPhotos.length === 0 && (
                      <div className="d-flex flex-wrap justify-content-center width-100-per align-items-center h-100">
                        <img
                          src={noPhotosFound}
                          alt="no photos found"
                          height="350px"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )}
            {isOpenCreatePhotos && (
              <div className="col-xs-12 col-md-12 d-flex">
                <div className="whitebox-body meals-bg photos-body border-left">
                  <CreatePhotos
                    logDate={logDate}
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
  handleChangeProgressTab = (tab, index) => {
    this.setState({ activeProgressTab: tab, activeProgressIndex: index });
  };
}

export default Photos;
