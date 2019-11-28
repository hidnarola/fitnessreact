import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { FaCircleONotch } from "react-icons/lib/fa";
import PhotosActivityList from "./PhotosActivityList";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noPhotosFoundImg from "../../../../../assets/img/no-photos-found.png";
import { routeCodes } from "../../../../constants/routes";

class TodayPhotos extends Component {
  render() {
    const { loading, history, todayProgressPhotos } = this.props;
    console.log("===========today Progress Phtot Dashboard===========");
    console.log("today Progress Phtot Dashboard", todayProgressPhotos);
    console.log("==========================");
    return (
      <React.Fragment>
        <div className="activity-body fithub-body">
          {loading && (
            <div className="loader" key={0}>
              <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
              Loading ...
            </div>
          )}
          <Scrollbars autoHide>
            {!loading &&
              (todayProgressPhotos.length > 0 ? (
                <ul className="workout-list">
                  {todayProgressPhotos.map((item, i) => (
                    <PhotosActivityList todayPhoto={item} key={i} />
                  ))}
                </ul>
              ) : (
                <div className="d-flex flex-wrap justify-content-center dashboard-record-not-found">
                  <img
                    src={noPhotosFoundImg}
                    alt="NoWorkoutFound"
                    height="200px"
                  />
                  <h3 className="mt-5">You've not added any</h3>
                  <h3> photos for today</h3>
                </div>
              ))}
          </Scrollbars>
          {!loading && (
            <ul className="workout-list display-workout-btn">
              <li
                className="workout-list-items-btn"
                onClick={() => history.push(routeCodes.CALENDAR_OVERVIEW)}
              >
                <a href="#" className="btn width-100-per">
                  <FontAwesomeIcon icon="plus" /> Add Photo
                </a>
              </li>
            </ul>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TodayPhotos);
