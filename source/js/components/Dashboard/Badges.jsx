import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrophyIcon from "svg/tropy-icon.svg";
import NoDataFoundImg from "img/common/no_datafound.png";
import moment from "moment";

class Badges extends Component {
    render() {
        const { badges } = this.props;
        return (
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Badges</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
                {badges && badges.length > 0 &&
                    badges.map((o, i) =>
                        <BadgesListCard key={i} badge={o} />
                    )
                }

                {(!badges || badges.length <= 0) &&
                    <div className="no-record-found-wrapper">
                        <img src={NoDataFoundImg} />
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { dashboard } = state;
    return {
        badges: dashboard.get('badges'),
    };
}

export default connect(
    mapStateToProps,
)(Badges);

class BadgesListCard extends Component {
    render() {
        const { badge } = this.props;
        return (
            <div className="whitebox-body today-badges">
                <div className="customiser-box">
                    <h3><strong>Achievement</strong> {(badge.point) ? ` - ${badge.point}pts` : ''}</h3>
                    <h5>{(badge.name) ? badge.name : ''}</h5>
                    <p>{(badge.descriptionCompleted) ? badge.descriptionCompleted : ''}</p>
                    <h4>
                        <span>
                            <i className="icon-check"></i>
                        </span>
                        <strong>Completed</strong>
                        <small>{(badge.createdAt) ? moment(badge.createdAt).format('MMMM Do, YYYY') : ''}</small>
                    </h4>
                    <div className="tropy-icon-box">
                        <TrophyIcon />
                    </div>
                </div>
            </div>
        );
    }
}