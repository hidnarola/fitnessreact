import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Setting from 'components/Exercise/Setting';
import Equipment from 'components/Exercise/Equipment';
import Fitness from 'components/Exercise/Fitness';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { submit } from 'redux-form';
import ResetConfirmation from '../components/Admin/Common/ResetConfirmation';
import { saveUserEquipmentsRequest } from '../actions/userEquipments';
import { resetUserExercisePreferencesRequest } from '../actions/userExercisePreferences';
import { routeCodes } from '../constants/routes';
import { resetUserFitnessTestsRequest } from '../actions/userFitnessTests';
import { showPageLoader } from '../actions/pageLoader';

class ExerciseSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
            showResetModal: false,
            resetActionFor: null,
            resetActionInit: false,
        }
        this.fitnessChildRef = React.createRef();
    }

    render() {
        const { showResetModal } = this.state;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />

                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Exercise Settings</h2>
                            <div className="body-head-l-btm space-btm-20">


                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.EXERCISEFITNESS}
                                >
                                    Fitness test
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.EXERCISEEQP}
                                >
                                    Equipment
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.EXERCISEPREFERENCE}
                                >
                                    Preferences
                                </NavLink>

                            </div>
                            <p>Each fitness test feeds directly into our algorithm - every test is used to identify the most efficient and
                                effective structure of your training plan. Each test is designed to identify imbalances and weaknesses
                                that may lead to increased risk of injury or decreased performance - now and in the future. This may
                                also allow us to identify opportunities for rapid improvement.</p>
                        </div>
                        <div className="body-head-r">
                            <a className="white-btn" href="javascript:void(0)" onClick={this.handleShowResetModal}>Reset
                                <i className="icon-settings_backup_restore"></i>
                            </a>
                            <a className="green-blue-btn" href="javascript:void(0)" onClick={this.handleExerciseSettings}>Update Changes
                                <i className="icon-update"></i>
                            </a>
                        </div>
                    </div>

                    <Switch>
                        <Route
                            exact
                            path={routeCodes.EXERCISEFITNESS}
                            render={
                                () => <Fitness
                                    {...this.state}
                                    setSaveAction={this.setSaveAction}
                                    setResetAction={this.setResetAction}
                                    ref={(ref) => this.fitnessChildRef = ref}
                                />
                            }
                        />
                        <Route
                            exact
                            path={routeCodes.EXERCISEEQP}
                            render={
                                () => <Equipment
                                    {...this.state}
                                    setSaveAction={this.setSaveAction}
                                    setResetAction={this.setResetAction}
                                />
                            }
                        />
                        <Route
                            exact
                            path={routeCodes.EXERCISEPREFERENCE}
                            render={
                                () => <Setting
                                    {...this.state}
                                    setSaveAction={this.setSaveAction}
                                    setResetAction={this.setResetAction}
                                />
                            }
                        />
                    </Switch>
                </section>

                <ResetConfirmation
                    show={showResetModal}
                    handleClose={this.closeResetModal}
                    handleYes={this.handleReset}
                />

            </div>
        );
    }

    handleExerciseSettings = () => {
        const { dispatch, match } = this.props;
        if (match.path === routeCodes.EXERCISEEQP) {
            dispatch(submit('userEquipmentsForm'));
        } else if (match.path === routeCodes.EXERCISEPREFERENCE) {
            dispatch(submit('userExercisePreferencesForm'));
        } else if (match.path === routeCodes.EXERCISEFITNESS) {
            this.fitnessChildRef.getWrappedInstance().handleSave();
        }
        dispatch(showPageLoader());
    }

    handleShowResetModal = () => {
        const { match } = this.props;
        let newModalState = {
            showResetModal: true,
        }
        if (match.path === routeCodes.EXERCISEEQP) {
            newModalState.resetActionFor = 'userEquipmentsForm';
        } else if (match.path === routeCodes.EXERCISEPREFERENCE) {
            newModalState.resetActionFor = 'userExercisePreferencesForm';
        } else if (match.path === routeCodes.EXERCISEFITNESS) {
            newModalState.resetActionFor = 'userFitnessTests';
        }
        this.setState(newModalState);
    }

    closeResetModal = () => {
        this.setState({
            resetActionFor: null,
            showResetModal: false
        });
    }

    handleReset = () => {
        const { resetActionFor } = this.state;
        const { dispatch } = this.props;
        if (resetActionFor === 'userEquipmentsForm') {
            let requestObj = {
                equipmentIds: []
            }
            dispatch(saveUserEquipmentsRequest(requestObj));
            this.setResetAction(true);
        } else if (resetActionFor === 'userExercisePreferencesForm') {
            dispatch(resetUserExercisePreferencesRequest());
            this.setResetAction(true);
        } else if (resetActionFor === 'userFitnessTests') {
            dispatch(resetUserFitnessTestsRequest());
            this.setResetAction(true);
        }
        dispatch(showPageLoader());
    }

    setSaveAction = (flag) => {
        this.setState({ saveActionInit: flag });
        if (!flag) {
            this.closeResetModal();
        }
    }

    setResetAction = (flag) => {
        this.setState({ resetActionInit: flag });
        if (!flag) {
            this.closeResetModal();
        }
    }
}

export default connect()(ExerciseSettings)