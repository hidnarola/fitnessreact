import React, { Component } from 'react';
import { connect } from "react-redux";
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import AddPersonalGoal from './AddPersonalGoal';
import { addUserPersonalGoalRequest, getUserPersonalGoalRequest, deleteUserPersonalGoalRequest } from '../../actions/userPersonalGoals';
import { reset } from "redux-form";
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { ts, te } from '../../helpers/funs';
import { GOALS_DETAILS, MEASUREMENT_UNITS, SECONDARY_GOALS } from '../../constants/consts';
import { Pager } from "react-bootstrap";
import DeletePersonalGoalConfirmation from '../Admin/Common/DeleteConfirmation';
import DeleteSecondaryGoalConfirmation from '../Admin/Common/DeleteConfirmation';
import AddSecondaryGoal from './AddSecondaryGoal';
import { addUserSecondaryGoalRequest, getUserSecondaryGoalRequest, deleteUserSecondaryGoalRequest } from '../../actions/userSecondaryGoals';

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
            showDeletePersonalGoalModal: false,
            selectedPersonalGoalId: null,

            showAddSecondaryGoal: false,
            saveSecondaryGoalActionInit: false,
            saveSecondaryGoalError: [],
            selectSecondaryGoalActionInit: false,
            secondaryGoals: [],
            showDeleteSecondaryGoalModal: false,
            selectedSecondaryGoalId: null,
            deleteSecondaryGoalActionInit: false,
            remainingSecondaryGoals: SECONDARY_GOALS,
        }
    }

    componentWillMount() {
        const {
            personalGoalDisplayCompleted,
            personalGoalStart,
            personalGoalOffset,
        } = this.state;
        this.requestPersonalGoals(personalGoalDisplayCompleted, personalGoalStart, personalGoalOffset);
        this.requestSecondaryGoals();
    }

    render() {
        const {
            showAddPersonalGoal,
            savePersonalGoalError,
            personalGoals,
            personalGoalStart,
            personalGoalOffset,
            totalPersonalGoals,
            showDeletePersonalGoalModal,
            selectPersonalGoalActionInit,
            showAddSecondaryGoal,
            saveSecondaryGoalError,
            secondaryGoals,
            showDeleteSecondaryGoalModal,
            remainingSecondaryGoals,
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
                            {remainingSecondaryGoals && remainingSecondaryGoals.length > 0 &&
                                <a href="javascript:void(0)" onClick={this.handleShowAddSecondaryGoalModal} className="white-btn">Add Secondary Goal
                                    <i className="icon-control_point"></i>
                                </a>
                            }
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
                        {secondaryGoals && secondaryGoals.length > 0 &&
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">Your Secondary Goal</h3>
                                </div>
                                <div className="whitebox-body goal-content">
                                    {
                                        secondaryGoals.map((goalD, goalI) => {
                                            var goalObj = _.find(SECONDARY_GOALS, ['value', goalD.goal]);
                                            return (
                                                <div key={goalI} className="d-flex">
                                                    <div className="part-l">
                                                        <div className="goal-head d-flex">
                                                            <h3>{goalObj.label}</h3>
                                                            <a href="javascript:void(0)" onClick={() => this.showDeleteSecondaryGoalModal(goalD._id)} className="ml-auto">
                                                                <i className="icon-close"></i>
                                                            </a>
                                                        </div>
                                                        <div className="goal-body">
                                                            <ul className="d-flex goal-info">
                                                                <li>
                                                                    <h4>At start</h4>
                                                                    <p>{goalD.start}</p>
                                                                </li>
                                                                <li>
                                                                    <h4>Current</h4>
                                                                    <p>0</p>
                                                                </li>
                                                                <li>
                                                                    <h4>Progress</h4>
                                                                    <p>0%</p>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="part-r">
                                                        <div className="goal-head d-flex">
                                                            <h3>{goalObj.label} Score</h3>
                                                        </div>
                                                        <div className="goal-body">
                                                            <img src="images/bodyfat-graph.png" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }

                        {personalGoals && personalGoals.length > 0 &&
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3">Your Personal Goal</h3>
                                </div>
                                <div className="whitebox-body personal-goal d-flex margin_minus">
                                    {
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
                                                            <a href="javascript:void(0)" onClick={() => this.showDeletePersonalModal(goalD._id)}><i className="icon-close"></i></a>
                                                            <img src="images/goal-progress.png" alt="" />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })
                                    }
                                </div>
                                <Pager className="text-right">
                                    <Pager.Item href="javascript:void(0)" onClick={() => this.turnPage('prev')} disabled={(personalGoalStart <= 0) || selectPersonalGoalActionInit}>Previous</Pager.Item>
                                    {' '}
                                    <Pager.Item href="javascript:void(0)" onClick={() => this.turnPage('next')} disabled={((personalGoalStart + personalGoalOffset) >= totalPersonalGoals) || selectPersonalGoalActionInit}>Next</Pager.Item>
                                </Pager>
                            </div>
                        }
                    </div>
                </section>

                <AddPersonalGoal
                    show={showAddPersonalGoal}
                    handleClose={this.handleCloseAddPersonalGoalModal}
                    onSubmit={this.handleSavePersonalGoal}
                    errors={savePersonalGoalError}
                />

                <DeletePersonalGoalConfirmation
                    show={showDeletePersonalGoalModal}
                    handleClose={this.closeDeletePersonalModal}
                    handleYes={this.deletePersonalGoal}
                />

                <AddSecondaryGoal
                    show={showAddSecondaryGoal}
                    handleClose={this.handleCloseAddSecondaryGoalModal}
                    onSubmit={this.handleSaveSecondaryGoal}
                    errors={saveSecondaryGoalError}
                    goals={remainingSecondaryGoals}
                />

                <DeleteSecondaryGoalConfirmation
                    show={showDeleteSecondaryGoalModal}
                    handleClose={this.closeDeleteSecondaryModal}
                    handleYes={this.deleteSecondaryGoal}
                />
            </div>
        );
    }

    componentDidUpdate() {
        const {
            personalGoalLoading,
            dispatch,
            personalGoalError,
            personalGoals,
            totalPersonalGoals,
            secondaryGoalLoading,
            secondaryGoalError,
            secondaryGoals,
        } = this.props;
        const {
            savePersonalGoalActionInit,
            selectPersonalGoalActionInit,
            personalGoalOffset,
            deletePersonalGoalActionInit,
            personalGoalDisplayCompleted,
            selectSecondaryGoalActionInit,
            saveSecondaryGoalActionInit,
            personalGoalStart,
            deleteSecondaryGoalActionInit,
        } = this.state;
        if (selectPersonalGoalActionInit && !personalGoalLoading) {
            this.setState({
                selectPersonalGoalActionInit: false,
                personalGoals,
                totalPersonalGoals,
            });
        }
        if (selectSecondaryGoalActionInit && !secondaryGoalLoading) {
            var remainingSecondaryGoals = Object.assign([], SECONDARY_GOALS);
            _.forEach(secondaryGoals, (g, i) => {
                var goal = g.goal;
                var index = _.findIndex(remainingSecondaryGoals, ['value', goal]);
                if (index >= 0) {
                    remainingSecondaryGoals.splice(index, 1);
                }
            });
            this.setState({
                selectSecondaryGoalActionInit: false,
                secondaryGoals,
                remainingSecondaryGoals,
            });
        }
        if (savePersonalGoalActionInit && !personalGoalLoading) {
            if (personalGoalError && personalGoalError.length > 0) {
                this.setState({ savePersonalGoalError: personalGoalError });
            } else {
                this.handleCloseAddPersonalGoalModal();
                ts('Goal added successfully!');
                var newStart = 0;
                this.setState({ personalGoalStart: newStart });
                this.requestPersonalGoals(personalGoalDisplayCompleted, newStart, personalGoalOffset);
            }
            this.setState({ savePersonalGoalActionInit: false });
            dispatch(hidePageLoader());
        }
        if (saveSecondaryGoalActionInit && !secondaryGoalLoading) {
            if (secondaryGoalError && secondaryGoalError.length > 0) {
                this.setState({ saveSecondaryGoalError: secondaryGoalError });
            } else {
                this.handleCloseAddSecondaryGoalModal();
                ts('Goal added successfully!');
                this.requestSecondaryGoals();
            }
            this.setState({ saveSecondaryGoalActionInit: false });
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
                personalGoalStart: newStart,
            });
            this.closeDeletePersonalModal();
            this.requestPersonalGoals(personalGoalDisplayCompleted, newStart, personalGoalOffset);
        }
        if (deleteSecondaryGoalActionInit && !secondaryGoalLoading) {
            if (personalGoalError && personalGoalError.length > 0) {
                te(personalGoalError[0]);
            } else {
                ts('Goal deleted successfully!');
            }
            this.setState({ deleteSecondaryGoalActionInit: false });
            this.closeDeleteSecondaryModal();
            this.requestSecondaryGoals();
        }
    }

    requestPersonalGoals = (isCompleted, start, offset) => {
        const {
            dispatch,
        } = this.props;
        this.setState({ selectPersonalGoalActionInit: true });
        dispatch(getUserPersonalGoalRequest(isCompleted, start, offset));
    }

    requestSecondaryGoals = () => {
        const {
            dispatch,
        } = this.props;
        this.setState({ selectSecondaryGoalActionInit: true });
        dispatch(getUserSecondaryGoalRequest());
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

    showDeletePersonalModal = (_id) => {
        this.setState({
            showDeletePersonalGoalModal: true,
            selectedPersonalGoalId: _id
        });
    }

    closeDeletePersonalModal = () => {
        this.setState({
            showDeletePersonalGoalModal: false,
            selectedPersonalGoalId: null
        });
    }

    deletePersonalGoal = () => {
        const { selectedPersonalGoalId } = this.state;
        const { dispatch } = this.props;
        this.setState({ deletePersonalGoalActionInit: true });
        dispatch(deleteUserPersonalGoalRequest(selectedPersonalGoalId));
    }

    handleShowAddSecondaryGoalModal = () => {
        this.setState({ showAddSecondaryGoal: true });
    }

    handleCloseAddSecondaryGoalModal = () => {
        const { dispatch } = this.props;
        this.setState({
            showAddSecondaryGoal: false,
            saveSecondaryGoalError: [],
        });
        dispatch(reset('addSecondaryGoalForm'));
    }

    handleSaveSecondaryGoal = (data) => {
        const { dispatch } = this.props;
        var requestData = {
            task: data.task.value,
        }
        this.setState({ saveSecondaryGoalActionInit: true });
        dispatch(showPageLoader());
        dispatch(addUserSecondaryGoalRequest(requestData));
    }

    showDeleteSecondaryGoalModal = (_id) => {
        this.setState({
            showDeleteSecondaryGoalModal: true,
            selectedSecondaryGoalId: _id
        });
    }

    closeDeleteSecondaryModal = () => {
        this.setState({
            showDeleteSecondaryGoalModal: false,
            selectedSecondaryGoalId: null
        });
    }

    deleteSecondaryGoal = () => {
        const { selectedSecondaryGoalId } = this.state;
        const { dispatch } = this.props;
        this.setState({ deleteSecondaryGoalActionInit: true });
        dispatch(deleteUserSecondaryGoalRequest(selectedSecondaryGoalId));
    }
}

const mapStateToProps = (state) => {
    const { userPersonalGoals, userSecondaryGoals } = state;
    return {
        personalGoalLoading: userPersonalGoals.get('loading'),
        personalGoals: userPersonalGoals.get('goals'),
        totalPersonalGoals: userPersonalGoals.get('totalRecords'),
        personalGoalError: userPersonalGoals.get('error'),
        secondaryGoalLoading: userSecondaryGoals.get('loading'),
        secondaryGoals: userSecondaryGoals.get('goals'),
        secondaryGoalError: userSecondaryGoals.get('error'),
    }
}

export default connect(mapStateToProps)(Goals);