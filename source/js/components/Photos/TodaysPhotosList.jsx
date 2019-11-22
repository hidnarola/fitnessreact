import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import exerciseImage from "../../../assets/img/exercise/fitness/exercise-2x.png";
import exerciseImage2 from "../../../assets/img/exercise/fitness/img-13.jpg";
import TodaysPhotosListItems from "./TodaysPhotosListItems";
import moment from "moment";
import NoRecordFound from "../Common/NoRecordFound";
import { getProgressPhotosByDateRequest } from "../../actions/userBodyMeasurement";
import { connect } from "react-redux";
import { hidePageLoader } from "../../actions/pageLoader";
import { te } from "../../helpers/funs";

class TodaysPhotosList extends Component {
  componentDidMount() {
    const { dispatch, logDate } = this.props;
    const requestObj = { logDate: logDate };
    dispatch(getProgressPhotosByDateRequest(requestObj));
  }
  render() {
    const {
      handleChangeCreatePhotos,
      todayProgressPhotos,
      activeProgressTab,
      handleChangeProgressTab,
      logDate
    } = this.props;
    return (
      <React.Fragment>
        <div className="photos-sidebar">
          <div className="photos-header">
            <h3 className="title-h3">
              {new Date(logDate).getDate() === new Date().getDate()
                ? "Today's Photos"
                : "Photos of " +
                  (logDate
                    ? moment(logDate)
                        .local()
                        .format("DD/MM/YYYY")
                    : "")}{" "}
            </h3>
            {/* <button
              className="btn ml-auto"
              onClick={() => handleChangeCreatePhotos()}
            >
              <FontAwesomeIcon icon="plus" />
            </button> */}
            <ul className="workout-list">
              <li
                className="workout-list-items-btn ml-0 mr-0"
                onClick={() => handleChangeCreatePhotos()}
              >
                <a href="#" className="btn width-100-per">
                  <FontAwesomeIcon icon="plus" /> Add Photo
                </a>
              </li>
            </ul>
          </div>
          <div className="photos-sidebar-body">
            <Scrollbars autoHide>
              <ul>
                {todayProgressPhotos &&
                  todayProgressPhotos.length > 0 &&
                  todayProgressPhotos.map((progress, index) => (
                    <TodaysPhotosListItems
                      progress={progress}
                      key={index}
                      photosIndex={index}
                      progressId={`progressPhoto${index + 1}`}
                      activeProgressTab={activeProgressTab}
                      handleChangeProgressTab={handleChangeProgressTab}
                    />
                  ))}
                {/* {todayProgressPhotos.length === 0 && (
                  <li>
                    {<NoRecordFound title="No photos found for today." />}
                  </li>
                )} */}
              </ul>
            </Scrollbars>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      dispatch,
      loadingProgressPhotos,
      todayProgressPhotos,
      progressPhotosError
    } = this.props;
    if (
      !loadingProgressPhotos &&
      prevProps.todayProgressPhotos !== todayProgressPhotos
    ) {
      dispatch(hidePageLoader());
    }
    if (
      !loadingProgressPhotos &&
      prevProps.progressPhotosError !== progressPhotosError &&
      progressPhotosError.length > 0
    ) {
      dispatch(hidePageLoader());
    }
  }
}
const mapStateToProps = state => {
  const { userBodyMeasurement } = state;
  return {
    loadingProgressPhotos: userBodyMeasurement.get("loadingProgressPhotos"),
    todayProgressPhotos: userBodyMeasurement.get("userProgressPhotos"),
    progressPhotosError: userBodyMeasurement.get("error")
  };
};

export default connect(mapStateToProps)(TodaysPhotosList);
