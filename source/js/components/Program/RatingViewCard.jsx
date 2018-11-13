import React, { Component } from 'react';
import { Link } from "react-router-dom";
import RatingStarsDisplay from '../Common/RatingStarsDisplay';
import noImg from 'img/common/no-img.png'
import { routeCodes } from '../../constants/routes';

class RatingViewCard extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="rating-card-wrap">
                <div className="rating-card-head">
                    <div className="rating-card-h-left">
                        <img
                            src={(data && data.userDetails && data.userDetails.avatar) ? data.userDetails.avatar : ''}
                            alt="Avatar"
                            className="avatar"
                            onError={(e) => {
                                e.target.src = noImg
                            }}
                        />
                    </div>
                    <div className="rating-card-h-right">
                        {data && data.userDetails &&
                            <h4>
                                <Link to={(data.userDetails.username) ? `${routeCodes.PROFILE}/${data.userDetails.username}` : 'javascript:void(0)'}>
                                    <span>
                                        {data.userDetails.firstName && data.userDetails.firstName}
                                        {data.userDetails.lastName && ` ${data.userDetails.lastName}`}
                                    </span>
                                </Link>
                            </h4>
                        }
                    </div>
                </div>
                <div className="rating-card-body">
                    <p>
                        {data.comment && data.comment}
                        {!data.comment && `${data.rating} star rating`}
                    </p>
                </div>
                <div className="rating-card-foot">
                    <RatingStarsDisplay rating={data.rating} />
                </div>
            </div>
        );
    }
}

export default RatingViewCard;