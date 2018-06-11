import React, { Component } from 'react';
import { connect } from "react-redux";
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import AddPersonalGoal from './AddPersonalGoal';
import { addUserPersonalGoalRequest, getUserPersonalGoalRequest, deleteUserPersonalGoalRequest } from '../../actions/userPersonalGoals';
import { reset } from "redux-form";
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { ts, te } from '../../helpers/funs';
import { GOALS_DETAILS, MEASUREMENT_UNITS } from '../../constants/consts';
import { Pager } from "react-bootstrap";

class Goals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddPersonalGoal: false,
            savePersonalGoalActionInit: false,
            savePersonalGoalError: [],
            personalGoalDisplayCompleted: 0,
            personalGoalStart: 0,
            personalGoalOffset: 2,
            selectPersonalGoalActionInit: false,
            personalGoals: [],
            totalPersonalGoals: 0,
            deletePersonalGoalActionInit: false,
        }
    }

    componentWillMount() {
        const {
            personalGoalDisplayCompleted,
            personalGoalStart,
            personalGoalOffset,
        } = this.state;
        this.requestPersonalGoals(personalGoalDisplayCompleted, personalGoalStart, personalGoalOffset);
    }

    render() {
        const {
            showAddPersonalGoal,
            savePersonalGoalError,
            personalGoals,
            personalGoalStart,
            personalGoalOffset,
            totalPersonalGoals,
        } = this.state;
        return (
            <div className="fitness-goals">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Your Goals</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                                you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                                on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r">
                            <a href="" className="white-btn">Add Secondary Goal
                                <i className="icon-control_point"></i>
                            </a>
                            <a href="javascript:void(0)" onClick={this.handleShowAddPersonalGoalModal} className="green-blue-btn">Add Personal Goal
                                <i className="icon-control_point"></i>
                            </a>
                        </div>
                    </div>
                    <div className="body-content">
                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Your Primary Goal</h3>
                            </div>
                            <div className="whitebox-body goal-content d-flex">
                                <div className="part-l">
                                    <div className="goal-head d-flex">
                                        <h3>Lose Fat</h3>
                                        <a href="" className="ml-auto">
                                            <span>Edit Goal</span>
                                            <i className="icon-settings"></i>
                                        </a>
                                    </div>
                                    <div className="goal-body">
                                        <ul className="d-flex goal-info">
                                            <li>
                                                <h4>At start</h4>
                                                <p>20%
                                                    <small>Body Fat</small>
                                                </p>
                                            </li>
                                            <li>
                                                <h4>Current</h4>
                                                <p>16%
                                                    <small>Body Fat</small>
                                                </p>
                                            </li>
                                            <li>
                                                <h4>Target</h4>
                                                <p>12%
                                                    <small>Body Fat</small>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="part-r">
                                    <div className="goal-head d-flex">
                                        <h3>Your Body Fat</h3>
                                    </div>
                                    <div className="goal-body">
                                        <img src="images/bodyfat-graph.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Your Secondary Goal</h3>
                            </div>
                            <div className="whitebox-body goal-content d-flex">
                                <div className="part-l">
                                    <div className="goal-head d-flex">
                                        <h3>Be Healthy</h3>
                                        <a href="" className="ml-auto">
                                            <span>Edit Goal</span>
                                            <i className="icon-settings"></i>
                                        </a>
                                    </div>
                                    <div className="goal-body">
                                        <ul className="d-flex goal-info">
                                            <li>
                                                <h4>At start</h4>
                                                <p>60</p>
                                            </li>
                                            <li>
                                                <h4>Current</h4>
                                                <p>65</p>
                                            </li>
                                            <li>
                                                <h4>Target</h4>
                                                <p>80</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="part-r">
                                    <div className="goal-head d-flex">
                                        <h3>Your Health Score</h3>
                                    </div>
                                    <div className="goal-body">
                                        <img src="images/bodyfat-graph.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="white-box space-btm-20">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Your Personal Goal</h3>
                            </div>
                            <div className="whitebox-body personal-goal">
                                {personalGoals && personalGoals.length > 0 &&
                                    personalGoals.map((goalD, goalI) => {
                                        var goalStr = 'I’m going to';
                                        var task = goalD.task;
                                        var taskObj = _.find(GOALS_DETAILS, ['value', task]);
                                        if (taskObj) {
                                            var unitLabel = '';
                                            var unitObj = _.find(MEASUREMENT_UNITS, ['key', taskObj.unitsKey]);
                                            if (unitObj) {
                                                var unitObjValue = _.find(unitObj.value, ['value', goalD.unit]);
                                                if (unitObjValue) {
                                                    unitLabel = unitObjValue.label;
                                                }
                                            }
                                            goalStr += ` ${taskObj.label} ${goalD.target} ${unitLabel}`;
                                            return (
                                                <div className="personal-goal-l d-flex" key={goalI}>
                                                    <div className="personal-goal-1">
                                                        <strong>{goalStr}</strong>
                                                        <small>500 Kilometers Run</small>
                                                    </div>
                                                    <div className="personal-goal-2">
                                                        <a href="javascript:void(0)" onClick={() => this.deletePersonalGoal(goalD._id)}><i className="icon-close"></i></a>
                                                        <img src="images/goal-progress.png" alt="" />
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null;
                                    })
                                }
                                <Pager>
                                    {personalGoalStart > 0 &&
                                        <Pager.Item href="javascript:void(0)" onClick={() => this.turnPage('prev')}>Previous</Pager.Item>
                                    }
                                    {' '}
                                    {((personalGoalStart + personalGoalOffset) < totalPersonalGoals) &&
                                        <Pager.Item href="javascript:void(0)" onClick={() => this.turnPage('next')}>Next</Pager.Item>
                                    }
                                </Pager>
                            </div>
                        </div>
                    </div>
                </section>
                <AddPersonalGoal
                    show={showAddPersonalGoal}
                    handleClose={this.handleCloseAddPersonalGoalModal}
                    onSubmit={this.handleSavePersonalGoal}
                    errors={savePersonalGoalError}
                />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            personalGoalLoading,
            dispatch,
            personalGoalError,
            personalGoals,
            totalPersonalGoals,
        } = this.props;
        const {
            savePersonalGoalActionInit,
            selectPersonalGoalActionInit,
            personalGoalStart,
            personalGoalOffset,
            deletePersonalGoalActionInit,
            personalGoalDisplayCompleted,
        } = this.state;
        if (selectPersonalGoalActionInit && !personalGoalLoading) {
            this.setState({
                selectPersonalGoalActionInit: false,
                personalGoals,
                totalPersonalGoals,
            });
        }
        if (savePersonalGoalActionInit && !personalGoalLoading) {
            var newStart = personalGoalStart;
            if (personalGoalError && personalGoalError.length > 0) {
                this.setState({ savePersonalGoalError: personalGoalError });
            } else {
                this.handleCloseAddPersonalGoalModal();
                ts('Goal added successfully!');
                newStart = 0;
            }
            this.setState({
                savePersonalGoalActionInit: false,
                personalGoalStart: newStart,
            });
            this.requestPersonalGoals(personalGoalDisplayCompleted, newStart, personalGoalOffset);
            dispatch(hidePageLoader());
        }
        if (deletePersonalGoalActionInit && !personalGoalLoading) {
            var newStart = personalGoalStart;
            if (personalGoalError && personalGoalError.length > 0) {
                te(personalGoalError[0]);
            } else {
                newStart = 0;
                ts('Goal deleted successfully!');
            }
            this.setState({
                deletePersonalGoalActionInit: false,
                personalGoalStart: newStart
            });
            this.requestPersonalGoals(personalGoalDisplayCompleted, newStart, personalGoalOffset);
        }
    }

    requestPersonalGoals = (isCompleted, start, offset) => {
        const {
            dispatch,
        } = this.props;
        this.setState({ selectPersonalGoalActionInit: true });
        dispatch(getUserPersonalGoalRequest(isCompleted, start, offset));
    }

    turnPage = (action) => {
        const {
            personalGoalDisplayCompleted,
            personalGoalStart,
            personalGoalOffset,
        } = this.state;
        if (action === 'next') {
            var newStart = personalGoalStart + personalGoalOffset;
        } else {
            var newStart = personalGoalStart - personalGoalOffset;
        }
        this.setState({ personalGoalStart: newStart });
        this.requestPersonalGoals(personalGoalDisplayCompleted, newStart, personalGoalOffset);
    }

    handleShowAddPersonalGoalModal = () => {
        this.setState({ showAddPersonalGoal: true });
    }

    handleCloseAddPersonalGoalModal = () => {
        const { dispatch } = this.props;
        this.setState({
            showAddPersonalGoal: false,
            savePersonalGoalError: [],
        });
        dispatch(reset('addPersonalGoalForm'));
    }

    handleSavePersonalGoal = (data) => {
        const { dispatch } = this.props;
        var requestData = {
            target: data.target,
            task: data.task.value,
            unit: data.unit.value,
        }
        this.setState({ savePersonalGoalActionInit: true });
        dispatch(showPageLoader());
        dispatch(addUserPersonalGoalRequest(requestData));
    }

    deletePersonalGoal = (_id) => {
        const { dispatch } = this.props;
        this.setState({ deletePersonalGoalActionInit: true });
        dispatch(deleteUserPersonalGoalRequest(_id));
    }
}

const mapStateToProps = (state) => {
    const { userPersonalGoals } = state;
    return {
        personalGoalLoading: userPersonalGoals.get('loading'),
        personalGoals: userPersonalGoals.get('goals'),
        totalPersonalGoals: userPersonalGoals.get('totalRecords'),
        personalGoalError: userPersonalGoals.get('error'),
    }
}

export default connect(mapStateToProps)(Goals);