import React, { Component } from 'react';
import { Link, NavLink, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import PrivatePrograms from '../components/Program/PrivatePrograms';
import PublicPrograms from '../components/Program/PublicPrograms';

class Programs extends Component {
    render() {
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Programs</h2>
                            <div className="body-head-l-btm">
                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRAMS}
                                >
                                    My Programs
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRAMS_PUBLIC}
                                >
                                    Public
                                </NavLink>
                            </div>
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

                    <Switch>
                        <Route exact path={routeCodes.PROGRAMS} component={PrivatePrograms} />
                        <Route exact path={routeCodes.PROGRAMS_PUBLIC} component={PublicPrograms} />
                    </Switch>
                </section>
            </div>
        );
    }
}


export default connect()(Programs);