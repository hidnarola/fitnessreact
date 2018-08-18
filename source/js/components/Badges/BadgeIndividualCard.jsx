import React, { Component } from 'react';
import { BADGE_TYPE_COMPLETE, BADGE_TYPE_COMPLETE_STR, BADGE_TYPE_IN_COMPLETE } from '../../constants/consts';
import moment from "moment";
import { capitalizeFirstLetter } from '../../helpers/funs';

class BadgeIndividualCard extends Component {
    render() {
        const { badge, badgeType } = this.props;
        if (badge) {
            return (
                <div className="col-md-3">
                    <div className="badges-box">
                        {typeof badgeType !== 'undefined' && badgeType && badgeType === BADGE_TYPE_COMPLETE &&
                            <div className="badges-check">
                                <i className="icon-check"></i>
                            </div>
                        }
                        <h3>{(badge.name) ? capitalizeFirstLetter(badge.name) : 'Badge Name'}</h3>

                        {typeof badgeType !== 'undefined' && badgeType && badgeType === BADGE_TYPE_COMPLETE &&
                            <p>
                                {(badge.descriptionCompleted) ? capitalizeFirstLetter(badge.descriptionCompleted) : 'Badge Description.'}
                            </p>
                        }
                        {typeof badgeType !== 'undefined' && badgeType && badgeType === BADGE_TYPE_COMPLETE &&
                            <h5>{BADGE_TYPE_COMPLETE_STR} <small>{(badge.createdAt) ? moment(badge.createdAt).format('MMMM D, YYYY') : ''}</small></h5>
                        }

                        {typeof badgeType !== 'undefined' && badgeType && badgeType === BADGE_TYPE_IN_COMPLETE &&
                            <p>
                                {(badge.descriptionInCompleted) ? capitalizeFirstLetter(badge.descriptionInCompleted) : 'Badge Description.'}
                            </p>
                        }
                        <h6>{(typeof badge.point !== 'undefined' && badge.point > 0) ? `${badge.point}pts` : '0pts'}</h6>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default BadgeIndividualCard;