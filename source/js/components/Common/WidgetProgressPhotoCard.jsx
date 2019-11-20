import React, { Component } from "react";
import noImg from "img/common/no-img.png";
import { SERVER_BASE_URL } from "../../constants/consts";
import { routeCodes } from "../../constants/routes";
import { Link } from "react-router-dom";
import NoRecordFound from "./NoRecordFound";

class WidgetProgressPhotoCard extends Component {
  render() {
    const { progressPhoto, username } = this.props;
    console.log("===========progressPhoto Fithub===========");
    console.log("progressPhoto Fithub", progressPhoto);
    console.log("==========================");
    return (
      <div className="white-box space-btm-30 min-height-373">
        <div className="whitebox-head d-flex">
          <h3 className="title-h3">Progress Photos</h3>
        </div>
        <div className="whitebox-body d-flex">
          {!progressPhoto && (
            <div className="col-md-12">
              <NoRecordFound title="Please add some progress photos" />
            </div>
          )}

          {progressPhoto && (
            <ul className="d-flex profile-list-ul profilelist-2">
              {typeof progressPhoto.current !== "object" ? (
                <li>
                  <div className="profile-list">
                    <span>
                      <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>
                        <img
                          src={SERVER_BASE_URL + progressPhoto.current}
                          onError={e => {
                            e.target.src = noImg;
                          }}
                        />
                      </Link>
                    </span>
                    <h4>
                      <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>
                        Current
                      </Link>
                    </h4>
                  </div>
                </li>
              ) : (
                <li>
                  <div className="profile-list">
                    <span>
                      <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>
                        <img
                          src={SERVER_BASE_URL + progressPhoto.current[0].image}
                          onError={e => {
                            e.target.src = noImg;
                          }}
                        />
                      </Link>
                    </span>
                    <h4>
                      <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>
                        Current
                      </Link>
                    </h4>
                  </div>
                </li>
              )}
              {typeof progressPhoto.current !== "object" ? (
                <li>
                  <div className="profile-list">
                    <span>
                      <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>
                        <img
                          src={SERVER_BASE_URL + progressPhoto.beginning}
                          onError={e => {
                            e.target.src = noImg;
                          }}
                        />
                      </Link>
                    </span>
                    <h4>
                      <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>
                        Beginning
                      </Link>
                    </h4>
                  </div>
                </li>
              ) : (
                <li>
                  <div className="profile-list">
                    <span>
                      <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>
                        <img
                          src={
                            SERVER_BASE_URL + progressPhoto.beginning[0].image
                          }
                          onError={e => {
                            e.target.src = noImg;
                          }}
                        />
                      </Link>
                    </span>
                    <h4>
                      <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>
                        Beginning
                      </Link>
                    </h4>
                  </div>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default WidgetProgressPhotoCard;
