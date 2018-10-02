import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActivityFeedListCard from './ActivityFeedListCard';
import NoRecordFound from '../Common/NoRecordFound';

class ActivityFeed extends Component {
    render() {
        const { activityFeed } = this.props;
        return (
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Activity Feed</h3>
                </div>
                {activityFeed && activityFeed.length > 0 &&
                    activityFeed.map((o, i) =>
                        <ActivityFeedListCard key={i} post={o} />
                    )
                }
                {(!activityFeed || activityFeed.length <= 0) &&
                    <NoRecordFound />
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