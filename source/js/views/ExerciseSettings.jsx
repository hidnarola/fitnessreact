import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Setting from 'components/Exercise/Setting';
import Equipment from 'components/Exercise/Equipment';
import Fitness from 'components/Exercise/Fitness';

import { routeCodes } from 'constants/routes';

import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { submit } from 'redux-form';
import ResetConfirmation from '../components/Admin/Common/ResetConfirmation';
import { saveUserEquipmentsRequest } from '../actions/userEquipments';

class ExerciseSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
            showResetModal: false,
            resetActionFor: null,
            resetActionInit: false,
            forceResetEquipmentsForm: false,
        }
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
                                <i className="icon-print"></i>
                            </a>
                            <a className="green-blue-btn" href="javascript:void(0)" onClick={this.handleExerciseSettings}>Update
                                <i className="icon-control_point"></i>
                            </a>
                        </div>
                    </div>

                    <Switch>
                        <Route exact path={routeCodes.EXERCISEFITNESS} component={Fitness} />
                        <Route
                            exact
                            path={routeCodes.EXERCISEEQP}
                            render={
                                () => <Equipment
                                    {...this.state}
                                    setSaveAction={this.setSaveAction}
                                    setForceResetEquipmentsForm={this.setForceResetEquipmentsForm}
                                />
                            }
                        />
                        <Route exact path={routeCodes.EXERCISEPREFERENCE} component={Setting} />
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

    componentDidUpdate() {
        const { loading } = this.props;
        const { resetActionInit } = this.state;
        if (resetActionInit && !loading) {
            this.setState({ resetActionInit: false });
            this.setForceResetEquipmentsForm(true);
        }
    }


    handleExerciseSettings = () => {
        const { dispatch, match } = this.props;
        if (match.path === routeCodes.EXERCISEEQP) {
            dispatch(submit('userEquipmentsForm'));
        }
    }

    handleShowResetModal = () => {
        this.setState({
            resetActionFor: 'userEquipmentsForm',
            showResetModal: true
        });
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
        this.setState({ resetActionInit: true });
        if (resetActionFor === 'userEquipmentsForm') {
            let requestObj = {
                equipmentIds: []
            }
            dispatch(saveUserEquipmentsRequest(requestObj));
            this.setSaveAction(true);
        }
    }

    setSaveAction = (flag) => {
        this.setState({ saveActionInit: flag });
        if (!flag) {
            this.setState({ showResetModal: false });
        }
    }

    setForceResetEquipmentsForm = (flag) => {
        this.setState({ forceResetEquipmentsForm: flag });
    }
}

const mapStateToProps = (state) => {
    const { userEquipments } = state;
    return {
        loading: userEquipments.get('loading'),
    }
}

export default connect(mapStateToProps)(ExerciseSettings)