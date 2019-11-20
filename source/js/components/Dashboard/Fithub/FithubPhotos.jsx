import React, { Component } from "react";
import { WIDGET_PROGRESS_PHOTO } from "../../../constants/consts";
import WidgetProgressPhotoCard from "../../Common/WidgetProgressPhotoCard";
import { connect } from "react-redux";
import { getUserProgressPhotoRequest } from "../../../actions/userProgressPhotos";
import WidgetPhotoCardNew from "../../Common/WidgetPhotoCardNew";

class FithubPhotos extends Component {
  render() {
    const {
      userWidgets,
      widgetProgressPhotos,
      loggedUserData,
      progressPhotos,
      progressPhotoLoading
    } = this.props;
    console.log("===========widgetProgressPhotos===========");
    console.log("widgetProgressPhotos", widgetProgressPhotos);
    console.log("==========================");
    return (
      <React.Fragment>
        {/* {userWidgets &&
          typeof userWidgets[WIDGET_PROGRESS_PHOTO] !== "undefined" &&
          userWidgets[WIDGET_PROGRESS_PHOTO] === 1 && (
            <div className="col-md-12">
              <WidgetProgressPhotoCard
                progressPhoto={widgetProgressPhotos}
                username={
                  loggedUserData && loggedUserData.username
                    ? loggedUserData.username
                    : ""
                }
              />
            </div>
          )} */}
        <div className="col-md-12 mt-1">
          <WidgetPhotoCardNew
            title="Progress - Photos - All time"
            progressPhotoLoading={progressPhotoLoading}
            progressPhotos={progressPhotos}
          />
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    const { dispatch, loggedUserData } = this.props;
    dispatch(getUserProgressPhotoRequest(loggedUserData.username));
  }
}
const mapStateToProps = state => {
  const { userProgressPhotos, user } = state;
  return {
    loggedUserData: user.get("loggedUserData"),
    progressPhotoLoading: userProgressPhotos.get("loading"),
    progressPhotos: userProgressPhotos.get("progressPhotos")
  };
};

export default connect(mapStateToProps)(FithubPhotos);
