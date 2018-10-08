import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BADGE_TYPE_IN_COMPLETE } from '../../constants/consts';
import { getUserBadgesByTypeRequest } from '../../actions/userBadges';
import BadgeIndividualCard from './BadgeIndividualCard';
import ErrorCloud from "svg/error-cloud.svg";
import { FaCircleONotch } from "react-icons/lib/fa";
import NoRecordFound from '../Common/NoRecordFound';

class InComplete extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getUserBadgesByTypeRequest(BADGE_TYPE_IN_COMPLETE));
    }

    render() {
        const { loading, badges, error } = this.props;
        if (loading) {
            return (
                <div className="no-content-loader">
                    <FaCircleONotch className="loader-spinner fs-100" />
                </div>
            );
        }
        return (
            <div className="badge-card-wrapper">
                {!loading && typeof badges !== 'undefined' && badges && badges.length > 0 &&
                    <div className="body-content budges">
                        <div className="row d-flex">
                            {badges.map((badge, index) => {
                                return (
                                    <BadgeIndividualCard
                                        key={index}
                                        badge={badge}
                                        badgeType={BADGE_TYPE_IN_COMPLETE}
                                    />
                                );
                            })}
                        </div>
                    </div>
                }

                {!loading && typeof badges !== 'undefined' && badges && badges.length <= 0 && error && error.length <= 0 &&
                    <NoRecordFound title="No badges are in-complete!" />
                }

                {!loading && typeof error !== 'undefined' && error && error.length > 0 &&
                    <div className="server-error-wrapper">
                        <ErrorCloud />
                        <h4>Something went wrong! please try again.</h4>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userBadges } = state;
    return {
        loading: userBadges.get('loading'),
        selectedBadgeType: userBadges.get('selectedBadgeType'),
        badges: userBadges.get('badges'),
        error: userBadges.get('error'),
    };
}

export default connect(
    mapStateToProps,
)(InComplete);