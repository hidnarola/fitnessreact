import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import exerciseImage from "../../../assets/img/exercise/fitness/exercise-2x.png";
import exerciseImage2 from "../../../assets/img/exercise/fitness/img-13.jpg";
import TodaysPhotosListItems from "./TodaysPhotosListItems";
import moment from "moment";
import NoRecordFound from "../Common/NoRecordFound";

class TodaysPhotosList extends Component {
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
            <h3>
              {new Date(logDate).getDate() === new Date().getDate()
                ? "Today's Photos"
                : "Photos of " +
                  (logDate
                    ? moment(logDate)
                        .local()
                        .format("DD/MM/YYYY")
                    : "")}{" "}
            </h3>
            <button
              className="btn ml-auto"
              onClick={() => handleChangeCreatePhotos()}
            >
              <FontAwesomeIcon icon="plus" />
            </button>
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
                {todayProgressPhotos.length === 0 && (
                  <li>
                    {<NoRecordFound title="No photos found for today." />}
                  </li>
                )}
              </ul>
            </Scrollbars>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TodaysPhotosList;
