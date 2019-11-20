import React, { Component } from "react";
import noImg from "img/common/no-img.png";
import { SERVER_BASE_URL } from "../../constants/consts";
import cns from "classnames";

class TodaysPhotosListItems extends Component {
  render() {
    const {
      progress,
      activeProgressTab,
      progressId,
      handleChangeProgressTab,
      photosIndex
    } = this.props;
    console.log("===========progress ITEMS LIST===========");
    console.log("progress ITEMS LIST", progress);
    console.log("==========================");
    const { image } = progress.user_progress_photos[0];
    return (
      <React.Fragment>
        {progress.user_progress_photos.map((item, i) => {
          let { image } = item;
          return (
            <li
              onClick={() => handleChangeProgressTab(progressId, photosIndex)}
              className="cursor-pointer"
            >
              <div className="image-box">
                {image &&
                  image.length > 1 && (
                    <div className="img-list">
                      {image.map((item, i) => (
                        <img
                          src={`${SERVER_BASE_URL}${item.image}`}
                          alt="image"
                          className="img-rounded"
                          onError={e => {
                            e.target.src = noImg;
                          }}
                          key={i}
                        />
                      ))}
                    </div>
                  )}
                <div
                  className={cns("image", {
                    active: activeProgressTab === progressId
                  })}
                >
                  <img
                    src={`${SERVER_BASE_URL}${image[0].image}`}
                    alt="image"
                    className="img-responsive"
                    onError={e => {
                      e.target.src = noImg;
                    }}
                  />
                  <h3 className="img-title">Progress</h3>
                  <div className="img-subtitle">
                    <h4>Fitter Gunshow Running</h4>
                    <i className="fad fa-user-shield ml-auto" />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </React.Fragment>
    );
  }
}

export default TodaysPhotosListItems;
