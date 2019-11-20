import React, { Component } from "react";
import noImg from "img/common/no-img.png";
import { SERVER_BASE_URL } from "../../constants/consts";
import { FaCircleONotch } from "react-icons/lib/fa";

class WidgetPhotoCardNew extends Component {
  render() {
    const { progressPhotos, progressPhotoLoading,title } = this.props;
    return (
      <React.Fragment>
        <div className="white-box space-btm-30 dashboard-bodyfat-card ">
          <div className="graybox-body bodyfat-graph p-0 progress-photos-list">
            <div className="graph-header d-flex flex-wrap align-items-center width-100-per">
              <i className="fad fa-cog" />
              <p className="display-title">{title ? title : "Photos - All time"}</p>
            </div>
            <div className="display-progress-photos">
              {progressPhotoLoading && (
                <div className="loader" key={0}>
                  <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
                  Loading ...
                </div>
              )}
              <div className="row no-gutters">
                {!progressPhotoLoading &&
                  progressPhotos &&
                  progressPhotos.length > 0 &&
                  progressPhotos.map((item, index) => (
                    <div className="col-md-6" key={index}>
                      <img
                        className=""
                        src={`${SERVER_BASE_URL}${item.image}`}
                        alt="progress pic"
                        onError={e => {
                          e.target.src = noImg;
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WidgetPhotoCardNew;
