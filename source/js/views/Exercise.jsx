import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import Dotdotdot from 'react-dotdotdot'
import { NavLink } from "react-router-dom";
import noImg from 'img/common/no-img.png';
import moment from "moment";
import { getUserWorkoutByDateRequest } from '../actions/userWorkouts';
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';

class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadWorkoutsInit: false,
        }
    }


    componentWillMount() {
        const { dispatch } = this.props;
        var requestData = {
            date: moment().startOf('day').utc(),
        };
        this.setState({ loadWorkoutsInit: true });
        dispatch(showPageLoader());
        dispatch(getUserWorkoutByDateRequest(requestData));
    }

    render() {
        const { workouts } = this.props;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />

                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Today's Workout <a href="" className="print-btn"><i className="icon-print"></i></a></h2>
                            <p>The workouts and meal plans created are tailored specifically to you; so to make your fitness assistant as effective as possible it’s important you let us know your current ability level. The more information you provide, the more accurate your fitness assistant will be.</p>
                        </div>
                        <div className="body-head-r">
                            <NavLink
                                activeClassName='pink-btn'
                                className='green-blue-btn'
                                to={routeCodes.EXERCISEFITNESS}>
                                Exercise Settings
                            </NavLink>
                            <div className="switch-wrap">
                                <small>Workout Completed</small>
                                <div className="material-switch">
                                    <input id="someSwitchOptionDefault" name="someSwitchOption001" type="checkbox" />
                                    <label htmlFor="someSwitchOptionDefault" className="label-default"></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {workouts && workouts.length > 0 &&
                        <div className="body-content d-flex row justify-content-start profilephoto-content">
                            {workouts.map((workout, index) => {
                                return (
                                    <div className="col-md-8" key={index}>
                                        <div className="white-box space-btm-20 padding-none workout-wrap">
                                            <div className="workout-head">
                                                <div className={"workout-1"}>
                                                    <h3>Exercise Type</h3>
                                                    <a href=""><i className="icon-more_horiz"></i></a>
                                                </div>
                                                <div className="workout-2">Weight</div>
                                                <div className="workout-3">Reps</div>
                                                <div className="workout-4">Sets</div>
                                                <div className="workout-5">Reset</div>
                                            </div>
                                            <div className="workout-body">
                                                <div className="workout-1">
                                                    <span>
                                                        <img
                                                            src={''}
                                                            alt="Exercise"
                                                            onError={(e) => {
                                                                e.target.src = noImg
                                                            }}
                                                        />
                                                    </span>
                                                    <div className="workout-1-info">
                                                        <h3 className="h3_left_content">
                                                            <a href="javascript:void(0)"><small>Exercise Name</small></a>
                                                        </h3>
                                                        <Dotdotdot clamp={'auto'}>
                                                            <div className="workout-body-description">
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description
                                                            </div>
                                                        </Dotdotdot>
                                                    </div>
                                                </div>
                                                <div className="workout-2">10Kg</div>
                                                <div className="workout-3">1 Rep</div>
                                                <div className="workout-4">1 Set</div>
                                                <div className="workout-5">10 sec</div>
                                            </div>
                                            <div className="workout-body">
                                                <div className="workout-1">
                                                    <span>
                                                        <img
                                                            src={''}
                                                            alt="Exercise"
                                                            onError={(e) => {
                                                                e.target.src = noImg
                                                            }}
                                                        />
                                                    </span>
                                                    <div className="workout-1-info">
                                                        <h3 className="h3_left_content">
                                                            <a href="javascript:void(0)"><small>Exercise Name</small></a>
                                                        </h3>
                                                        <Dotdotdot clamp={'auto'}>
                                                            <div className="workout-body-description">
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description
                                                            </div>
                                                        </Dotdotdot>
                                                    </div>
                                                </div>
                                                <div className="workout-2">10Kg</div>
                                                <div className="workout-3">1 Rep</div>
                                                <div className="workout-4">1 Set</div>
                                                <div className="workout-5">10 sec</div>
                                            </div>
                                            <div className="workout-body">
                                                <div className="workout-1">
                                                    <span>
                                                        <img
                                                            src={''}
                                                            alt="Exercise"
                                                            onError={(e) => {
                                                                e.target.src = noImg
                                                            }}
                                                        />
                                                    </span>
                                                    <div className="workout-1-info">
                                                        <h3 className="h3_left_content">
                                                            <a href="javascript:void(0)"><small>Exercise Name</small></a>
                                                        </h3>
                                                        <Dotdotdot clamp={'auto'}>
                                                            <div className="workout-body-description">
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description
                                                            </div>
                                                        </Dotdotdot>
                                                    </div>
                                                </div>
                                                <div className="workout-2">10Kg</div>
                                                <div className="workout-3">1 Rep</div>
                                                <div className="workout-4">1 Set</div>
                                                <div className="workout-5">10 sec</div>
                                            </div>
                                        </div>

                                        <div className="white-box space-btm-20 padding-none workout-wrap">
                                            <div className="workout-head">
                                                <div className={"workout-1 bg-pink"}>
                                                    <h3>Exercise Type</h3>
                                                    <a href=""><i className="icon-more_horiz"></i></a>
                                                </div>
                                                <div className="workout-2">Weight</div>
                                                <div className="workout-3">Reps</div>
                                                <div className="workout-4">Sets</div>
                                                <div className="workout-5">Reset</div>
                                            </div>
                                            <div className="workout-body">
                                                <div className="workout-1">
                                                    <span>
                                                        <img
                                                            src={''}
                                                            alt="Exercise"
                                                            onError={(e) => {
                                                                e.target.src = noImg
                                                            }}
                                                        />
                                                    </span>
                                                    <div className="workout-1-info">
                                                        <h3 className="h3_left_content">
                                                            <a href="javascript:void(0)"><small>Exercise Name</small></a>
                                                        </h3>
                                                        <Dotdotdot clamp={'auto'}>
                                                            <div className="workout-body-description">
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description
                                                            </div>
                                                        </Dotdotdot>
                                                    </div>
                                                </div>
                                                <div className="workout-2">10Kg</div>
                                                <div className="workout-3">1 Rep</div>
                                                <div className="workout-4">1 Set</div>
                                                <div className="workout-5">10 sec</div>
                                            </div>
                                            <div className="workout-body">
                                                <div className="workout-1">
                                                    <span>
                                                        <img
                                                            src={''}
                                                            alt="Exercise"
                                                            onError={(e) => {
                                                                e.target.src = noImg
                                                            }}
                                                        />
                                                    </span>
                                                    <div className="workout-1-info">
                                                        <h3 className="h3_left_content">
                                                            <a href="javascript:void(0)"><small>Exercise Name</small></a>
                                                        </h3>
                                                        <Dotdotdot clamp={'auto'}>
                                                            <div className="workout-body-description">
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description
                                                            </div>
                                                        </Dotdotdot>
                                                    </div>
                                                </div>
                                                <div className="workout-2">10Kg</div>
                                                <div className="workout-3">1 Rep</div>
                                                <div className="workout-4">1 Set</div>
                                                <div className="workout-5">10 sec</div>
                                            </div>
                                            <div className="workout-body">
                                                <div className="workout-1">
                                                    <span>
                                                        <img
                                                            src={''}
                                                            alt="Exercise"
                                                            onError={(e) => {
                                                                e.target.src = noImg
                                                            }}
                                                        />
                                                    </span>
                                                    <div className="workout-1-info">
                                                        <h3 className="h3_left_content">
                                                            <a href="javascript:void(0)"><small>Exercise Name</small></a>
                                                        </h3>
                                                        <Dotdotdot clamp={'auto'}>
                                                            <div className="workout-body-description">
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description Description
                                                                Description Description Description Description Description Description Description Description Description Description Description Description
                                                            </div>
                                                        </Dotdotdot>
                                                    </div>
                                                </div>
                                                <div className="workout-2">10Kg</div>
                                                <div className="workout-3">1 Rep</div>
                                                <div className="workout-4">1 Set</div>
                                                <div className="workout-5">10 sec</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="col-md-4">
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-head">
                                        <h3 className="title-h3 size-14 text-c">Workout Intensity</h3>
                                    </div>
                                    <div className="whitebox-body text-c">
                                        <img src="images/intensity.jpg" alt="" />
                                    </div>
                                </div>

                                <div className="white-box space-btm-20 padding-20">
                                    <div className="whitebox-head">
                                        <h3 className="title-h3 size-14 text-c">Workout Stats</h3>
                                    </div>
                                    <div className="whitebox-body">
                                        <div className="workout-status">
                                            <div className="workoutstatus-top">
                                                <h4>Total Exercises</h4>
                                                <h5>510</h5>
                                            </div>
                                        </div>
                                        <div className="workout-status">
                                            <div className="workoutstatus-top">
                                                <h4>Total Exercises</h4>
                                                <h5>510</h5>
                                            </div>
                                            <div className="workoutstatus-btm">
                                                <p>Biceps, Triceps, Lats, Deltoids, Hamstrings, Forearms, Calves, Quads,  Abdominals, Lower Back</p>
                                            </div>
                                        </div>
                                        <div className="workout-status">
                                            <div className="workoutstatus-top">
                                                <h4>Total Exercises</h4>
                                                <h5>510</h5>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </section>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loadWorkoutsInit } = this.state;
        const {
            loading,
            dispatch,
        } = this.props;
        if (loadWorkoutsInit && !loading) {
            dispatch(hidePageLoader());
        }
    }

}

const mapStateToProps = (state) => {
    const { userWorkouts } = state;
    return {
        loading: userWorkouts.get('loading'),
        workouts: userWorkouts.get('workouts'),
        error: userWorkouts.get('error'),
        date: userWorkouts.get('date'),
    };
}

export default connect(
    mapStateToProps,
)(Exercise);