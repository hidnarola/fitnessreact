import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileFithubMuscleCardGraph from './ProfileFithubMuscleCardGraph';

class ProfileFithubMuscleCard extends Component {
    render() {
        const { muscle } = this.props;
        return (
            <div className="">
                {muscle && Object.keys(muscle).length > 0 &&
                    Object.keys(muscle).map((k, i) => {
                        let o = muscle[k];
                        return (
                            <ProfileFithubMuscleCardGraph key={i} cardKey={k} data={o} />
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { timelineWidgets } = state;
    return {
        muscle: timelineWidgets.get('muscle'),
    };
}

export default connect(
    mapStateToProps,
)(ProfileFithubMuscleCard);