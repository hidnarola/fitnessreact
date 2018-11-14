import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import ReactTooltip from "react-tooltip";

export default class AdminNav extends Component {
    render() {
        return (
            <div className='Menu'>
                <nav className="navigation" id="navigation">
                    <Scrollbars autoHide>
                        <ul>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={adminRouteCodes.DASHBOARD}
                                    data-tip="Dashboard"
                                    data-for="menu-title-tooltip"
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
                                    data-tip="Users"
                                    data-for="menu-title-tooltip"
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
                                    data-tip="Exercise"
                                    data-for="menu-title-tooltip"
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
                                    data-tip="Equipments"
                                    data-for="menu-title-tooltip"
                                >
                                    <i className="icon-fitness_center"></i>
                                    <span>Equipments</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={adminRouteCodes.EQUIPMENT_CATEGORIES}
                                    data-tip="Equipment Categories"
                                    data-for="menu-title-tooltip"
                                >
                                    <i className="icon-view_list"></i>
                                    <span>Equipment Categories</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={adminRouteCodes.FITNESS_TESTS}
                                    data-tip="Fitness Test"
                                    data-for="menu-title-tooltip"
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
                                    data-tip="Badges"
                                    data-for="menu-title-tooltip"
                                >
                                    <i className="icon-turned_in"></i>
                                    <span>Badges</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName='active'
                                    className='Menu-link'
                                    to={adminRouteCodes.BODY_PARTS}
                                    data-tip="Body Parts"
                                    data-for="menu-title-tooltip"
                                >
                                    <i className="icon-accessibility"></i>
                                    <span>Body Parts</span>
                                </NavLink>
                            </li>
                        </ul>
                    </Scrollbars>
                </nav>
                <ReactTooltip id="menu-title-tooltip" place="right" type="light" effect="solid" />
            </div>
        );
    }
}
