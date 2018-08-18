import React, { Component } from 'react';
import { BADGE_TYPE_COMPLETE_STR } from '../../constants/consts';
import moment from "moment";
import { capitalizeFirstLetter } from '../../helpers/funs';

class BadgeCategoryIndividualCard extends Component {
    render() {
        const { badge } = this.props;
        return (
            <div className="badges-box-option">
                {typeof badge.isCompleted !== 'undefined' && badge.isCompleted > 0 &&
                    <div className="badges-check">
                        <a href="javascript:void(0)" className="icon-check"></a>
                    </div>
                }
                <h3>{(badge.name) ? capitalizeFirstLetter(badge.name) : 'Badge Name'}</h3>
                {(badge.descriptionInCompleted) ? <p>{capitalizeFirstLetter(badge.descriptionInCompleted)}</p> : <p>Badge Description.</p>}
                <div className="badgesbox-option-btm">
                    {typeof badge.isCompleted !== 'undefined' && badge.isCompleted > 0 &&
                        <h5>{BADGE_TYPE_COMPLETE_STR} <small>{(badge.completedDate) ? moment(badge.completedDate).format('MMMM D, YYYY') : ''}</small></h5>
                    }
                    <h6>{(typeof badge.point !== 'undefined' && badge.point > 0) ? `${badge.point}pts` : '0pts'}</h6>
                </div>
            </div>
        );
    }
}

export default BadgeCategoryIndividualCard;