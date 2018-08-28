import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { adminRouteCodes } from '../../../constants/adminRoutes';

export default class AdminNav extends Component {
    render() {
        return (
            <div className='Menu'>
                <nav className="navigation" id="navigation">
                    <ul>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.DASHBOARD}
                            >
                                <i className="icon-dashboard"></i>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.USERS}
                            >
                                <i className="icon-supervisor_account"></i>
                                <span>Users</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.EXERCISE}
                            >
                                <i className="icon-directions_run"></i>
                                <span>Exercise</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.EQUIPMENTS}
                            >
                                <i className="icon-fitness_center"></i>
                                <span>Equipments</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.FITNESS_TESTS}
                            >
                                <i className="icon-golf_course"></i>
                                <span>Fitness Test</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.BADGES}
                            >
                                <i className="icon-turned_in"></i>
                                <span>Budges</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
