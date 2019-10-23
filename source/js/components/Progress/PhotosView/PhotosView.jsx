import React, { Component } from "react";
import PhotosViewSidebar from "./PhotosViewSidebar";
import PhotosViewContent from "./PhotosViewContent";
import { Scrollbars } from "react-custom-scrollbars";

class PhotosView extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="body-content exerciseview photosview h-100">
          <div className="whitebox-body exerciseview-body photos-body h-100" style={{borderRadius: "5px",overflow:"hidden"}}>
            <div className="row no-gutters h-100">
              <div className="col-xs-12 col-md-3">
                <PhotosViewSidebar />
              </div>
              <div className="col-xs-12 col-md-9">
                <Scrollbars autoHide>
                  <PhotosViewContent />
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PhotosView;
