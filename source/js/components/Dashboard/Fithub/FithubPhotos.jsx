import React, { Component } from "react";
import { WIDGET_PROGRESS_PHOTO } from "../../../constants/consts";
import WidgetProgressPhotoCard from "../../Common/WidgetProgressPhotoCard";

export class FithubPhotos extends Component {
  render() {
    const { userWidgets, widgetProgressPhotos, loggedUserData } = this.props;
    return (
      <React.Fragment>
        {userWidgets &&
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
          )}
      </React.Fragment>
    );
  }
}

export default FithubPhotos;
