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
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.USERS}
                            >
                                <span>Users</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.EXERCISE}
                            >
                                <span>Exercise</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.EQUIPMENTS}
                            >
                                <span>Equipments</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.FITNESS_TESTS}
                            >
                                <span>Fitness Test</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.BADGES}
                            >
                                <span>Budges</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
