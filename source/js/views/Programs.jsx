import React, { Component } from 'react';
import { Link, NavLink, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import PrivatePrograms from '../components/Program/PrivatePrograms';
import PublicPrograms from '../components/Program/PublicPrograms';
import { IDB_TBL_USER_PROGRAM, IDB_READ_WRITE } from '../constants/idb';
import { isOnline, connectIDB, tw } from "../helpers/funs";

class Programs extends Component {
    constructor(props) {
        super(props);
        this.iDB;
    }

    componentDidMount() {
        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
    }

    userOfflineMessage = (e) => {
        e.preventDefault();
        tw("You are offline, please check your internet connection");
    }

    render() {
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start front-white-header with-tabs">
                        <div className="body-head-l">
                            <h2>Programs</h2>
                        </div>
                        <div className="body-head-r">
                            <Link className="pink-btn" to={routeCodes.PROGRAM_MASTER_SAVE}>
                                <span>Add Program</span>
                                <i className="icon-add_circle"></i>
                            </Link>
                            <Link className="white-btn" to={routeCodes.EXERCISE} >
                                <span>Back</span>
                                <i className="icon-arrow_back"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="body-head-l-btm profile-new-menu">
                        <NavLink activeClassName='pink-btn-new' className='white-btn' onClick={(e) => { !isOnline() && this.userOfflineMessage(e) }} exact to={routeCodes.PROGRAMS}>My Programs</NavLink>
                        <NavLink activeClassName='pink-btn-new' className='white-btn' onClick={(e) => { !isOnline() && this.userOfflineMessage(e) }} exact to={routeCodes.PROGRAMS_PUBLIC}>Public</NavLink>
                    </div>

                    <Switch>
                        <Route exact path={routeCodes.PROGRAMS} component={PrivatePrograms} />
                        <Route exact path={routeCodes.PROGRAMS_PUBLIC} component={PublicPrograms} />
                    </Switch>
                </section>
            </div>
        );
    }
    componentWillUnmount() {
        try {
            const idbs = [IDB_TBL_USER_PROGRAM];
            if (isOnline()) {
                const transaction = this.iDB.transaction(idbs, IDB_READ_WRITE);
                if (transaction) {
                    const osProgram = transaction.objectStore(IDB_TBL_USER_PROGRAM);
                    osProgram.clear();
                }
            }
            this.iDB.close();
        } catch (error) { }
    }

}


export default connect()(Programs);