import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import moment from "moment";
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import { getUserWorkoutByDateRequest } from '../actions/userWorkouts';
import { capitalizeFirstLetter } from '../helpers/funs';
import cns from "classnames";
import ReactHtmlParser from "react-html-parser";
import noImg from 'img/common/no-img.png'
import { SERVER_BASE_URL } from '../constants/consts';
import WorkoutDetailsModal from '../components/Workout/WorkoutDetailsModal';
import Dotdotdot from 'react-dotdotdot'
import { FaTrash } from 'react-icons/lib/fa';
import {
    DropdownButton,
    ButtonToolbar,
    MenuItem
} from "react-bootstrap";

class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
            workouts: [],
            selectedWorkout: null,
            showWorkoutDetailsModal: false,
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        var requestData = {
            date: moment().startOf('day'),
        };
        this.setState({ selectActionInit: true });
        dispatch(showPageLoader());
        dispatch(getUserWorkoutByDateRequest(requestData));
    }

    render() {
        const {
            workouts,
            showWorkoutDetailsModal,
            selectedWorkout,
        } = this.state;
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

                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-9">
                            {workouts && workouts.length > 0 &&
                                workouts.map((workout, index) => {
                                    var schedule = workout.schedule;
                                    return (
                                        <div className="white-box space-btm-20 padding-none workout-wrap" key={index}>
                                            <div className="workout-head">
                                                <div
                                                    className={cns("workout-1", { "bg-pink": (index % 2 == 0) })}
                                                >
                                                    <h3>{(workout.type) ? capitalizeFirstLetter(workout.type) : 'Workout'}</h3>
                                                    <a href=""><i className="icon-more_horiz"></i></a>
                                                </div>
                                                <div className="workout-2">Weight</div>
                                                <div className="workout-3">Reps</div>
                                                <div className="workout-4">Sets</div>
                                                <div className="workout-5">Reset</div>
                                            </div>
                                            {schedule && schedule.length > 0 &&
                                                schedule.map((sch, schIndex) => {
                                                    return (
                                                        <div className="workout-body" key={schIndex}>
                                                            <div className="workout-1">
                                                                <span>
                                                                    <img
                                                                        src={SERVER_BASE_URL + sch.exerciseId.images[0]}
                                                                        alt="Exercise"
                                                                        onError={(e) => {
                                                                            e.target.src = noImg
                                                                        }}
                                                                    />
                                                                </span>
                                                                <div className="workout-1-info">
                                                                    <h3 className="h3_left_content">
                                                                        <a href="javascript:void(0)" onClick={() => this.handleShowWorkoutDetailsModal(sch)}><small>{(sch.exerciseId.name) ? sch.exerciseId.name : '-'}</small></a>
                                                                        <ButtonToolbar bsClass="">
                                                                            <DropdownButton title="" className="icon-more_horiz no-border" id="dropdown-size-small" noCaret pullRight>
                                                                                <MenuItem eventKey="1" onClick={() => console.log('Open delete modal')}>
                                                                                    <FaTrash className="v-align-sub" /> Delete
                                                                                </MenuItem>
                                                                            </DropdownButton>
                                                                        </ButtonToolbar>
                                                                    </h3>
                                                                    <Dotdotdot clamp={'auto'}>
                                                                        <div className="workout-body-description">
                                                                            {(sch.exerciseId.description) ? ReactHtmlParser(sch.exerciseId.description) : '-'}
                                                                        </div>
                                                                    </Dotdotdot>
                                                                </div>
                                                            </div>
                                                            <div className="workout-2">{sch.weight}Kg</div>
                                                            <div className="workout-3">{sch.reps}</div>
                                                            <div className="workout-4">{sch.sets}</div>
                                                            <div className="workout-5">{sch.restTime}sec</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="col-md-3">
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
                </section>
                <WorkoutDetailsModal
                    show={showWorkoutDetailsModal}
                    workout={selectedWorkout}
                    handleClose={this.handleCloseWorkoutDetailsModal}
                />
            </div>
        );
    }

    componentDidUpdate() {
        const {
            selectActionInit,
        } = this.state;
        const {
            loading,
            workouts,
            dispatch,
        } = this.props;
        if (selectActionInit && !loading) {
            this.setState({
                selectActionInit: false,
                workouts,
            });
            dispatch(hidePageLoader());
        }
    }

    handleShowWorkoutDetailsModal = (workout) => {
        this.setState({
            showWorkoutDetailsModal: true,
            selectedWorkout: workout,
        });
    }

    handleCloseWorkoutDetailsModal = (workout) => {
        this.setState({
            showWorkoutDetailsModal: false,
            selectedWorkout: null,
        });
    }

}

const mapStateToProps = (state) => {
    const { userWorkouts } = state;
    return {
        loading: userWorkouts.get('loading'),
        workouts: userWorkouts.get('workouts'),
        error: userWorkouts.get('error'),
    };
}

export default connect(
    mapStateToProps
)(Exercise)