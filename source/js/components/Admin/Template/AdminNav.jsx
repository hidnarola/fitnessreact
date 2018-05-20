import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import {
    FaDashboard,
    FaGroup,
    FaGavel,
    FaBolt,
    FaTasks,
    FaDotCircleO,
} from 'react-icons/lib/fa'
import cns from "classnames";

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
                                <FaDashboard className={cns('fs-28')} />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.USERS}
                            >
                                <FaGroup className={cns('fs-28')} />
                                <span>Users</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.EXERCISE_TYPE}
                            >
                                <span>Exercise Type</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.EXERCISE}
                            >
                                <FaGavel className={cns('fs-28')} />
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
                                <FaBolt className={cns('fs-28')} />
                                <span>Fitness Test</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.BADGE_CATEGORIES}
                            >
                                <FaDotCircleO className={cns('fs-28')} />
                                <span>Budge Categories</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to={adminRouteCodes.BADGE_TASKS}
                            >
                                <FaTasks className={cns('fs-28')} />
                                <span>Budge Tasks</span>
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
