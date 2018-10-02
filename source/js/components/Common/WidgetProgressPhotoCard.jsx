import React, { Component } from 'react';
import noImg from 'img/common/no-img.png'
import { SERVER_BASE_URL } from '../../constants/consts';
import { routeCodes } from '../../constants/routes';
import { Link } from "react-router-dom";

class WidgetProgressPhotoCard extends Component {
    render() {
        const { progressPhoto, username } = this.props;
        if (progressPhoto) {
            return (
                <div className="white-box space-btm-30">
                    <div className="whitebox-head d-flex">
                        <h3 className="title-h3">Progress Photos</h3>
                    </div>
                    <div className="whitebox-body d-flex">
                        <ul className="d-flex profile-list-ul profilelist-2">
                            <li>
                                <div className="profile-list">
                                    <span>
                                        <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>
                                            <img
                                                src={SERVER_BASE_URL + progressPhoto.current}
                                                onError={(e) => {
                                                    e.target.src = noImg
                                                }}
                                            />
                                        </Link>
                                    </span>
                                    <h4>
                                        <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>Current</Link>
                                    </h4>
                                </div>
                            </li>
                            <li>
                                <div className="profile-list">
                                    <span>
                                        <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>
                                            <img
                                                src={SERVER_BASE_URL + progressPhoto.beginning}
                                                onError={(e) => {
                                                    e.target.src = noImg
                                                }}
                                            />
                                        </Link>
                                    </span>
                                    <h4>
                                        <Link to={`${routeCodes.PROGRESS_PHOTOS}/${username}`}>Beginning</Link>
                                    </h4>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default WidgetProgressPhotoCard;