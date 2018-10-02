import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserBadgesByTypeRequest } from '../../actions/userBadges';
import { BADGE_TYPE_TRACKING } from '../../constants/consts';
import ErrorCloud from "svg/error-cloud.svg";
import { FaCircleONotch } from "react-icons/lib/fa";
import BadgeCategoryCard from './BadgeCategoryCard';
import NoRecordFound from '../Common/NoRecordFound';

class Tracking extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getUserBadgesByTypeRequest(BADGE_TYPE_TRACKING));
    }

    render() {
        const { badges, loading, error } = this.props;
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
                            {
                                badges.map((badge, index) => {
                                    if (badge && typeof badge.badges !== 'undefined' && badge.badges && badge.badges.length > 0) {
                                        return (
                                            <BadgeCategoryCard
                                                key={index}
                                                badge={badge}
                                            />
                                        );
                                    }
                                    return null;
                                })
                            }
                        </div>
                    </div>
                }

                {!loading && typeof badges !== 'undefined' && badges && badges.length <= 0 && error && error.length <= 0 &&
                    <NoRecordFound />
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
)(Tracking);