import React, { Component } from 'react';
import ReactHtmlParser from "react-html-parser";

class BadgeCategoryIndividualCard extends Component {
    render() {
        const { badge } = this.props;
        return (
            <div className="badges-box-option">
                <div className="badges-check">
                    <a href="" className="icon-check"></a>
                </div>
                <h3>{(badge.name) ? badge.name : 'Badge Name'}</h3>
                {(badge.descriptionInCompleted) ? ReactHtmlParser(badge.descriptionInCompleted) : <p>Badge Description.</p>}
                <div className="badgesbox-option-btm">
                    <h5>Completed <small>June 8, 2017</small></h5>
                    <h6>{(typeof badge.point !== 'undefined' && badge.point > 0) ? `${badge.point}pts` : '0pts'}</h6>
                </div>
            </div>
        );
    }
}

export default BadgeCategoryIndividualCard;