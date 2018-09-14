import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { getUserSingleTimelineRequest } from '../actions/userTimeline';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";

class Post extends Component {
    componentWillMount() {
        const { dispatch, match } = this.props;
        let id = match.params.id;
        dispatch(getUserSingleTimelineRequest(id));
    }

    render() {
        const { loading, error, post } = this.props;
        return (
            <div className="post-details-wrapper">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Post</h2>
                            <p>Post description.</p>
                        </div>
                    </div>

                    {loading &&
                        <div className="no-content-loader">
                            <FaCircleONotch className="loader-spinner fs-100" />
                        </div>
                    }

                    {!loading &&
                        <div>{JSON.stringify(post)}</div>
                    }

                    {!loading && typeof error !== 'undefined' && error && error.length > 0 &&
                        <div className="server-error-wrapper">
                            <ErrorCloud />
                            <h4>Something went wrong! please try again.</h4>
                        </div>
                    }
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userTimeline } = state;
    return {
        loading: userTimeline.get('postLoading'),
        post: userTimeline.get('post'),
        postError: userTimeline.get('postError')
    };
}

export default connect(
    mapStateToProps,
)(Post);