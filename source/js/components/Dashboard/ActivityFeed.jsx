import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoDataFoundImg from "img/common/no_datafound.png";
import ActivityFeedListCard from './ActivityFeedListCard';

class ActivityFeed extends Component {
    render() {
        const { activityFeed } = this.props;
        return (
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Activity Feed</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
                {activityFeed && activityFeed.length > 0 &&
                    activityFeed.map((o, i) =>
                        <ActivityFeedListCard key={i} post={o} />
                    )
                }
                {(!activityFeed || activityFeed.length <= 0) &&
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
        activityFeed: dashboard.get('activityFeed'),
    };
}

export default connect(
    mapStateToProps,
)(ActivityFeed);