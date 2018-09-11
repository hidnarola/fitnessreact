import React, { Component } from 'react';
import noImg from 'img/common/no-img.png'
import { SERVER_BASE_URL } from '../../constants/consts';

class WidgetProgressPhotoCard extends Component {
    render() {
        const { progressPhoto } = this.props;
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
                                        <a href="javascript:void(0)">
                                            <img
                                                src={SERVER_BASE_URL + progressPhoto.current}
                                                onError={(e) => {
                                                    e.target.src = noImg
                                                }}
                                            />
                                        </a>
                                    </span>
                                    <h4>
                                        <a href="javascript:void(0)">Current</a>
                                    </h4>
                                </div>
                            </li>
                            <li>
                                <div className="profile-list">
                                    <span>
                                        <a href="javascript:void(0)">
                                            <img
                                                src={SERVER_BASE_URL + progressPhoto.beginning}
                                                onError={(e) => {
                                                    e.target.src = noImg
                                                }}
                                            />
                                        </a>
                                    </span>
                                    <h4>
                                        <a href="javascript:void(0)">Beginning</a>
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