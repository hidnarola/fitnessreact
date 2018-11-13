import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { routeCodes } from '../../constants/routes';
import { getUserProgramRatingRequest } from '../../actions/userPrograms';
import ReactHtmlParser from "react-html-parser";
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import RatingViewCard from './RatingViewCard';
import NoRecordFound from '../Common/NoRecordFound';
import ProgramRatingModal from './ProgramRatingModal';
import { saveUserProgramsRatingRequest } from '../../actions/userProgramsRating';
import { te, ts } from '../../helpers/funs';
import { initialize, reset } from "redux-form";
import _ from "lodash";

class RatingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRating: false
        }
    }

    componentWillMount() {
        this.getProgramRatings();
    }

    render() {
        const { loadingRatings, ratings, errorRatings } = this.props;
        const { showRating } = this.state;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>{ratings && ratings.name ? ratings.name : ""}</h2>
                            {ratings && ratings.description &&
                                ReactHtmlParser(ratings.description)
                            }
                        </div>
                        <div className="body-head-r">
                            {!loadingRatings && ratings &&
                                <a href="javascript:void(0)" className="pink-btn" onClick={this.showRatingForm}>
                                    <span>Rate Us</span>
                                    <i className="icon-star"></i>
                                </a>
                            }
                            <Link className="white-btn" to={routeCodes.PROGRAMS_PUBLIC}>
                                <span>Back</span>
                                <i className="icon-arrow_back"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="body-content">
                        {loadingRatings &&
                            <div className="no-content-loader">
                                <FaCircleONotch className="loader-spinner fs-100" />
                            </div>
                        }

                        {!loadingRatings && ratings &&
                            <div className="white-box">
                                {ratings.ratings && ratings.ratings.length > 0 &&
                                    ratings.ratings.map((data) => (
                                        <RatingViewCard key={data._id} data={data} />
                                    ))
                                }
                                {ratings.ratings && ratings.ratings.length <= 0 &&
                                    <NoRecordFound title_class="fs-20" title="No ratings found!" />
                                }
                            </div>
                        }

                        {!loadingRatings && errorRatings && errorRatings.length > 0 &&
                            <div className="server-error-wrapper">
                                <ErrorCloud />
                                <h4>Something went wrong! please try again.</h4>
                            </div>
                        }
                    </div>
                </section>
                <ProgramRatingModal
                    show={showRating}
                    onSubmit={this.handleSaveRating}
                    handleClose={this.hideRatingForm}
                />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { saveRatingLoading, saveRatingError } = this.props;
        if (!saveRatingLoading && prevProps.saveRatingLoading !== saveRatingLoading) {
            if (saveRatingError && saveRatingError.length > 0) {
                te('Something went wrong! Please try again later.');
            } else {
                ts('Thank you for your feedback');
            }
            this.getProgramRatings();
        }
    }


    getProgramRatings = () => {
        const { match, dispatch } = this.props;
        let programId = match.params.id;
        dispatch(getUserProgramRatingRequest(programId));
    }

    showRatingForm = () => {
        const { dispatch, loggedUserData, ratings } = this.props;
        let programId = ratings._id;
        let allRatings = ratings.ratings;
        let prevLoggedUserRating = _.find(allRatings, ['userId', loggedUserData.authId]);
        let loggedUserRating = { userId: loggedUserData.authId, programId: programId };
        if (prevLoggedUserRating) {
            loggedUserRating.userId = prevLoggedUserRating.userId ? prevLoggedUserRating.userId : "";
            loggedUserRating.programId = prevLoggedUserRating.programId ? prevLoggedUserRating.programId : "";
            loggedUserRating.rating = prevLoggedUserRating.rating ? prevLoggedUserRating.rating : 0;
            loggedUserRating.comment = prevLoggedUserRating.comment ? prevLoggedUserRating.comment : "";
        }
        dispatch(initialize('program_rating_form', loggedUserRating));
        this.setState({ showRating: true });
    }

    hideRatingForm = () => {
        const { dispatch } = this.props;
        dispatch(reset('program_rating_form'));
        this.setState({ showRating: false });
    }

    handleSaveRating = (data) => {
        const { dispatch } = this.props;
        if (data && data.userId && data.programId) {
            dispatch(saveUserProgramsRatingRequest(data));
        } else {
            te("Something went wrong! Please try again later.");
        }
        this.hideRatingForm();
    }
}

const mapStateToProps = (state) => {
    const { userPrograms, user, userProgramsRating } = state;
    return {
        loadingRatings: userPrograms.get('loadingRatings'),
        ratings: userPrograms.get('ratings'),
        errorRatings: userPrograms.get('errorRatings'),
        loggedUserData: user.get('loggedUserData'),
        saveRatingLoading: userProgramsRating.get('saveLoading'),
        saveRatingError: userProgramsRating.get('saveError'),
    };
}

export default connect(
    mapStateToProps,
)(RatingView);